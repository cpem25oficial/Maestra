import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { dataService } from './dataService';
import { 
  ensureGoogleDriveToken, 
  syncAllPendingToDrive, 
  isGoogleDriveConnected 
} from './googleDriveService';

export interface DriveSyncCronStatus {
  isActive: boolean;
  lastSyncTimestamp: number;
  lastSyncDate: string | null;
  nextSyncTimestamp: number;
  status: 'idle' | 'running' | 'success' | 'waiting_auth' | 'error';
  lastSignaturesUploaded: number;
  lastJustificationsUploaded: number;
  lastError: string | null;
}

const CRON_INTERVAL_MS = 60 * 60 * 1000; // 1 Hora exacta (3,600,000 ms)
const STORAGE_CRON_KEY = 'cpem25_drive_cron_last_run';

class DriveSyncCronService {
  private timerId: any = null;
  private isRunning: boolean = false;
  private subscribers: ((status: DriveSyncCronStatus) => void)[] = [];

  private currentStatus: DriveSyncCronStatus = {
    isActive: true,
    lastSyncTimestamp: 0,
    lastSyncDate: null,
    nextSyncTimestamp: 0,
    status: 'idle',
    lastSignaturesUploaded: 0,
    lastJustificationsUploaded: 0,
    lastError: null,
  };

  constructor() {
    this.loadInitialStatus();
  }

  private loadInitialStatus() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_CRON_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          this.currentStatus.lastSyncTimestamp = parsed.lastSyncTimestamp || 0;
          this.currentStatus.lastSyncDate = parsed.lastSyncDate || null;
          this.currentStatus.nextSyncTimestamp = this.currentStatus.lastSyncTimestamp + CRON_INTERVAL_MS;
          this.currentStatus.lastSignaturesUploaded = parsed.lastSignaturesUploaded || 0;
          this.currentStatus.lastJustificationsUploaded = parsed.lastJustificationsUploaded || 0;
        } catch (e) {}
      }
    }
  }

  /**
   * Inicializa el cron automático de 1 hora
   */
  public init() {
    if (this.timerId) return;

    // 1. Sincronizar estado inicial desde Firestore si existe
    this.syncStatusFromFirestore().then(() => {
      // 2. Verificar si ya transcurrió 1 hora o más desde la última ejecución
      const elapsed = Date.now() - this.currentStatus.lastSyncTimestamp;
      if (elapsed >= CRON_INTERVAL_MS) {
        // Ejecutar en segundo plano tras 3 segundos de carga inicial
        setTimeout(() => {
          this.runSyncTask('CRON_STARTUP');
        }, 3000);
      } else {
        const remainingUntilNext = CRON_INTERVAL_MS - elapsed;
        this.currentStatus.nextSyncTimestamp = Date.now() + remainingUntilNext;
        this.notify();
      }
    });

    // 3. Programar intervalo recurrente de 1 hora (3,600,000 ms)
    this.timerId = setInterval(() => {
      this.runSyncTask('CRON_HOURLY');
    }, CRON_INTERVAL_MS);

    console.log('[DriveSyncCron] Servicio de sincronización automática cada 1 hora iniciado.');
  }

  public stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.currentStatus.isActive = false;
    this.notify();
  }

  public getStatus(): DriveSyncCronStatus {
    return { ...this.currentStatus };
  }

  public subscribe(cb: (status: DriveSyncCronStatus) => void): () => void {
    this.subscribers.push(cb);
    cb(this.getStatus());
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== cb);
    };
  }

  /**
   * Ejecuta la tarea de sincronización en lote a Google Drive
   */
  public async runSyncTask(triggerSource: 'CRON_HOURLY' | 'CRON_STARTUP' | 'MANUAL' = 'CRON_HOURLY'): Promise<{
    success: boolean;
    signaturesUploaded: number;
    justificationsUploaded: number;
    error?: string;
  }> {
    if (this.isRunning) {
      return { success: false, signaturesUploaded: 0, justificationsUploaded: 0, error: 'Tarea en curso' };
    }

    // Verificar si existe token de Google Drive
    const token = await ensureGoogleDriveToken();
    if (!token) {
      this.currentStatus.status = 'waiting_auth';
      this.currentStatus.lastError = 'Google Drive no autorizado con cpem25oficial@gmail.com';
      this.notify();
      return { success: false, signaturesUploaded: 0, justificationsUploaded: 0, error: 'Google Drive no autorizado' };
    }

    this.isRunning = true;
    this.currentStatus.status = 'running';
    this.currentStatus.lastError = null;
    this.notify();

    try {
      const allRequests = dataService.getRequests();
      const res = await syncAllPendingToDrive(allRequests);

      const now = Date.now();
      this.currentStatus.status = 'success';
      this.currentStatus.lastSyncTimestamp = now;
      this.currentStatus.lastSyncDate = new Date(now).toISOString();
      this.currentStatus.nextSyncTimestamp = now + CRON_INTERVAL_MS;
      this.currentStatus.lastSignaturesUploaded = res.signaturesUploaded;
      this.currentStatus.lastJustificationsUploaded = res.justificationsUploaded;
      this.currentStatus.lastError = res.errors.length > 0 ? res.errors.join('; ') : null;

      // Persistir en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_CRON_KEY, JSON.stringify({
          lastSyncTimestamp: this.currentStatus.lastSyncTimestamp,
          lastSyncDate: this.currentStatus.lastSyncDate,
          lastSignaturesUploaded: this.currentStatus.lastSignaturesUploaded,
          lastJustificationsUploaded: this.currentStatus.lastJustificationsUploaded,
        }));
      }

      // Persistir en Firestore para monitoreo institucional
      this.persistStatusToFirestore();

      console.log(
        `[DriveSyncCron] Sincronización automática (${triggerSource}) completada: ${res.signaturesUploaded} firmas, ${res.justificationsUploaded} comprobantes.`
      );

      return {
        success: true,
        signaturesUploaded: res.signaturesUploaded,
        justificationsUploaded: res.justificationsUploaded,
      };
    } catch (err: any) {
      console.warn('[DriveSyncCron] Error en sincronización programada:', err);
      this.currentStatus.status = 'error';
      this.currentStatus.lastError = err.message || 'Error de sincronización con Google Drive';
      this.notify();
      return {
        success: false,
        signaturesUploaded: 0,
        justificationsUploaded: 0,
        error: this.currentStatus.lastError || undefined,
      };
    } finally {
      this.isRunning = false;
      this.notify();
    }
  }

  private async syncStatusFromFirestore() {
    try {
      const snap = await getDoc(doc(db, 'system_settings', 'google_drive_sync_cron'));
      if (snap.exists()) {
        const data = snap.data();
        if (data.lastSyncTimestamp && data.lastSyncTimestamp > this.currentStatus.lastSyncTimestamp) {
          this.currentStatus.lastSyncTimestamp = data.lastSyncTimestamp;
          this.currentStatus.lastSyncDate = data.lastSyncDate || null;
          this.currentStatus.nextSyncTimestamp = data.lastSyncTimestamp + CRON_INTERVAL_MS;
          this.currentStatus.lastSignaturesUploaded = data.lastSignaturesUploaded || 0;
          this.currentStatus.lastJustificationsUploaded = data.lastJustificationsUploaded || 0;
        }
      }
    } catch (e) {
      console.warn('Notice reading cron status from Firestore:', e);
    }
  }

  private async persistStatusToFirestore() {
    try {
      await setDoc(
        doc(db, 'system_settings', 'google_drive_sync_cron'),
        {
          intervalMinutes: 60,
          lastSyncTimestamp: this.currentStatus.lastSyncTimestamp,
          lastSyncDate: this.currentStatus.lastSyncDate,
          nextSyncTimestamp: this.currentStatus.nextSyncTimestamp,
          lastSignaturesUploaded: this.currentStatus.lastSignaturesUploaded,
          lastJustificationsUploaded: this.currentStatus.lastJustificationsUploaded,
          status: this.currentStatus.status,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (e) {
      console.warn('Notice persisting cron status to Firestore:', e);
    }
  }

  private notify() {
    const status = this.getStatus();
    this.subscribers.forEach((cb) => cb(status));
  }
}

export const driveSyncCronService = new DriveSyncCronService();
