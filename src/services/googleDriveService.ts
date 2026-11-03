import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase';
import { LicenseRequest } from '../types';
import { dataService } from './dataService';

export const FOLDER_FIRMAS_ID = '1fK_xLbkgN2fcANBmabajgZhA7Hhry1wY';
export const FOLDER_CONSTANCIAS_ID = '1WXKwjHBvDPosGtX9XLohkEq_tOk224Kv';
export const GOOGLE_DRIVE_ACCOUNT_EMAIL = 'cpem25oficial@gmail.com';

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType?: string;
  webViewLink?: string;
  createdTime?: string;
  size?: string;
}

// Persistent token cache keys for Google Drive access
const STORAGE_DRIVE_TOKEN_KEY = 'cpem25_drive_access_token';
const STORAGE_DRIVE_EMAIL_KEY = 'cpem25_drive_user_email';

let cachedDriveAccessToken: string | null = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_DRIVE_TOKEN_KEY) : null;
let cachedUserEmail: string | null = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_DRIVE_EMAIL_KEY) : null;
let cachedExpiresAt: number = 0;
let driveUser: User | null = null;
let authSubscribers: ((connected: boolean, userEmail: string | null) => void)[] = [];

const notifySubscribers = () => {
  const isConn = isGoogleDriveConnected();
  authSubscribers.forEach((cb) => cb(isConn, cachedUserEmail));
};

export const subscribeToDriveAuth = (cb: (connected: boolean, userEmail: string | null) => void) => {
  authSubscribers.push(cb);
  cb(isGoogleDriveConnected(), cachedUserEmail);
  return () => {
    authSubscribers = authSubscribers.filter((s) => s !== cb);
  };
};

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/drive');
provider.setCustomParameters({
  login_hint: GOOGLE_DRIVE_ACCOUNT_EMAIL,
  prompt: 'consent',
});

// Setup real-time listener to Firestore system_settings/google_drive
let isListeningToSettings = false;

export const initGoogleDriveAuth = (
  onSuccess?: (userEmail: string, token: string) => void,
  onSignedOut?: () => void
) => {
  // 1. Listen to Firebase auth changes
  onAuthStateChanged(auth, async (user) => {
    driveUser = user;
    if (user?.email) {
      cachedUserEmail = user.email;
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_DRIVE_EMAIL_KEY, cachedUserEmail);
      }
    }
    notifySubscribers();
  });

  // 2. Real-time Firestore sync of the institutional Google Drive authorization
  if (!isListeningToSettings) {
    isListeningToSettings = true;
    try {
      onSnapshot(doc(db, 'system_settings', 'google_drive'), (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data && data.accessToken) {
            cachedDriveAccessToken = data.accessToken;
            cachedUserEmail = data.userEmail || GOOGLE_DRIVE_ACCOUNT_EMAIL;
            cachedExpiresAt = data.expiresAt || 0;
            if (typeof window !== 'undefined') {
              localStorage.setItem(STORAGE_DRIVE_TOKEN_KEY, data.accessToken);
              localStorage.setItem(STORAGE_DRIVE_EMAIL_KEY, cachedUserEmail || GOOGLE_DRIVE_ACCOUNT_EMAIL);
            }
            notifySubscribers();
            if (onSuccess) onSuccess(cachedUserEmail || GOOGLE_DRIVE_ACCOUNT_EMAIL, data.accessToken);
          }
        } else {
          notifySubscribers();
          if (onSignedOut) onSignedOut();
        }
      });
    } catch (e) {
      console.warn('Notice listening to google_drive settings in Firestore:', e);
    }
  }

  // Pre-load once immediately
  ensureGoogleDriveToken().catch(() => {});
};

/**
 * Ensures the Google Drive token is available, fetching from Firestore if needed
 */
export async function ensureGoogleDriveToken(): Promise<string | null> {
  // 1. If we already have a token in memory
  if (cachedDriveAccessToken) {
    return cachedDriveAccessToken;
  }

  // 2. Check localStorage
  if (typeof window !== 'undefined') {
    const localToken = localStorage.getItem(STORAGE_DRIVE_TOKEN_KEY);
    if (localToken) {
      cachedDriveAccessToken = localToken;
      cachedUserEmail = localStorage.getItem(STORAGE_DRIVE_EMAIL_KEY) || GOOGLE_DRIVE_ACCOUNT_EMAIL;
      notifySubscribers();
      return cachedDriveAccessToken;
    }
  }

  // 3. Check Firestore
  try {
    const snap = await getDoc(doc(db, 'system_settings', 'google_drive'));
    if (snap.exists()) {
      const data = snap.data();
      if (data && data.accessToken) {
        cachedDriveAccessToken = data.accessToken;
        cachedUserEmail = data.userEmail || GOOGLE_DRIVE_ACCOUNT_EMAIL;
        cachedExpiresAt = data.expiresAt || 0;
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_DRIVE_TOKEN_KEY, data.accessToken);
          localStorage.setItem(STORAGE_DRIVE_EMAIL_KEY, cachedUserEmail || GOOGLE_DRIVE_ACCOUNT_EMAIL);
        }
        notifySubscribers();
        return data.accessToken;
      }
    }
  } catch (err) {
    console.warn('Notice reading google_drive token from Firestore:', err);
  }

  return null;
}

/**
 * Conexión del Administrador de CPEM 25 con su cuenta de Google institucional (cpem25oficial@gmail.com)
 * Guarda la autorización en Firestore y localStorage para que todos los agentes guarden sus archivos directamente en Drive.
 */
export const connectGoogleAdminDrive = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso de Google Drive.');
    }

    cachedDriveAccessToken = credential.accessToken;
    driveUser = result.user;
    cachedUserEmail = result.user.email || GOOGLE_DRIVE_ACCOUNT_EMAIL;
    cachedExpiresAt = Date.now() + 3500 * 1000;

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_DRIVE_TOKEN_KEY, cachedDriveAccessToken);
      localStorage.setItem(STORAGE_DRIVE_EMAIL_KEY, cachedUserEmail);
    }

    // Guardar en Firestore para que toda la escuela use esta autorización sin pedir login a cada agente
    try {
      await setDoc(
        doc(db, 'system_settings', 'google_drive'),
        {
          accessToken: cachedDriveAccessToken,
          userEmail: cachedUserEmail,
          updatedAt: new Date().toISOString(),
          expiresAt: cachedExpiresAt,
          folderFirmasId: FOLDER_FIRMAS_ID,
          folderConstanciasId: FOLDER_CONSTANCIAS_ID,
        },
        { merge: true }
      );
    } catch (dbErr) {
      console.warn('Could not persist drive token to Firestore:', dbErr);
    }

    notifySubscribers();
    return { user: result.user, accessToken: cachedDriveAccessToken };
  } catch (error: any) {
    console.error('Error al conectar Google Drive de Administrador:', error);
    throw error;
  }
};

export const disconnectGoogleAdminDrive = async (): Promise<void> => {
  cachedDriveAccessToken = null;
  cachedUserEmail = null;
  cachedExpiresAt = 0;
  driveUser = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_DRIVE_TOKEN_KEY);
    localStorage.removeItem(STORAGE_DRIVE_EMAIL_KEY);
  }
  await signOut(auth).catch(() => {});

  try {
    await setDoc(
      doc(db, 'system_settings', 'google_drive'),
      {
        accessToken: null,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (e) {}

  notifySubscribers();
};

export const getGoogleDriveAccessToken = (): string | null => {
  return cachedDriveAccessToken;
};

export const isGoogleDriveConnected = (): boolean => {
  return !!cachedDriveAccessToken;
};

export const getGoogleDriveUserEmail = (): string => {
  return cachedUserEmail || GOOGLE_DRIVE_ACCOUNT_EMAIL;
};

export const getGoogleDriveUser = (): User | null => {
  return driveUser;
};

/**
 * URLs auxiliares para visualizar archivos almacenados en Google Drive
 */
export function getDriveThumbnailUrl(fileId: string, size = 800): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}

export function getDrivePreviewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function getDriveDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

/**
 * Comprime una imagen usando Canvas:
 * - Redimensiona a máximo 1000px de ancho manteniendo proporción
 * - Calidad 0.98
 * - Si es PDF, se retorna idéntico sin alterarlo
 */
export async function processFileForUpload(
  fileOrDataUrl: File | { dataUrl: string; name: string; type?: string }
): Promise<{ dataUrl: string; name: string; mimeType: string; isCompressed: boolean }> {
  // If input is File object
  if (fileOrDataUrl instanceof File) {
    const isPdf = fileOrDataUrl.type === 'application/pdf' || fileOrDataUrl.name.toLowerCase().endsWith('.pdf');
    if (isPdf) {
      const dataUrl = await fileToDataUrl(fileOrDataUrl);
      return {
        dataUrl,
        name: fileOrDataUrl.name,
        mimeType: 'application/pdf',
        isCompressed: false,
      };
    }

    // Image compression
    const rawDataUrl = await fileToDataUrl(fileOrDataUrl);
    const compressed = await compressImageWithCanvas(rawDataUrl, 1000, 0.98);
    const baseName = fileOrDataUrl.name.replace(/\.[^/.]+$/, '');
    return {
      dataUrl: compressed,
      name: `${baseName}.jpg`,
      mimeType: 'image/jpeg',
      isCompressed: true,
    };
  }

  // If input is already an object with dataUrl
  const isPdf = fileOrDataUrl.type === 'application/pdf' || fileOrDataUrl.name.toLowerCase().endsWith('.pdf');
  if (isPdf) {
    return {
      dataUrl: fileOrDataUrl.dataUrl,
      name: fileOrDataUrl.name,
      mimeType: 'application/pdf',
      isCompressed: false,
    };
  }

  // Compress image
  const compressed = await compressImageWithCanvas(fileOrDataUrl.dataUrl, 1000, 0.98);
  const baseName = fileOrDataUrl.name.replace(/\.[^/.]+$/, '');
  return {
    dataUrl: compressed,
    name: `${baseName}.jpg`,
    mimeType: 'image/jpeg',
    isCompressed: true,
  };
}

/**
 * Redimensiona imagen a ancho máx 1000px con proporción y calidad 0.98
 */
export function compressImageWithCanvas(
  dataUrl: string,
  maxWidth = 1000,
  quality = 0.98
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      // Smooth rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };
    img.onerror = (err) => {
      console.warn('No se pudo comprimir la imagen en Canvas, usando original', err);
      resolve(dataUrl);
    };
    img.src = dataUrl;
  });
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Convierte un Data URL a Blob binario
 */
function dataUrlToBlob(dataUrl: string): { blob: Blob; mimeType: string } {
  const parts = dataUrl.split(',');
  const mime = parts[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return { blob: new Blob([u8arr], { type: mime }), mimeType: mime };
}

/**
 * Consulta la lista de archivos reales alojados en una carpeta de Google Drive
 */
export async function listFilesInDriveFolder(folderId: string): Promise<DriveFileItem[]> {
  const token = await ensureGoogleDriveToken();
  if (!token) return [];

  try {
    const query = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,mimeType,webViewLink,createdTime,size)&pageSize=100&orderBy=createdTime desc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      console.warn('Error al listar archivos de Google Drive:', res.status, res.statusText);
      return [];
    }

    const data = await res.json();
    return (data.files || []).map((f: any) => ({
      id: f.id,
      name: f.name,
      mimeType: f.mimeType,
      webViewLink: f.webViewLink || `https://drive.google.com/file/d/${f.id}/view`,
      createdTime: f.createdTime,
      size: f.size ? `${(parseInt(f.size, 10) / 1024).toFixed(1)} KB` : undefined,
    }));
  } catch (err) {
    console.error('Error listando archivos de Google Drive:', err);
    return [];
  }
}

/**
 * Sube un archivo DIRECTAMENTE a Google Drive en la carpeta especificada
 * Utiliza la cuenta de Google autorizada de las carpetas (cpem25oficial@gmail.com).
 */
export async function uploadFileToDrive(options: {
  name: string;
  dataUrl: string;
  folderId: string;
}): Promise<{ fileId: string; webViewLink: string; name: string } | null> {
  let token = await ensureGoogleDriveToken();

  if (!token) {
    console.warn(
      `Aviso: Google Drive no está conectado aún (${GOOGLE_DRIVE_ACCOUNT_EMAIL}). El archivo se resguarda en el registro hasta que Secretaría lo sincronice.`
    );
    return null;
  }

  const { blob, mimeType } = dataUrlToBlob(options.dataUrl);

  const metadata = {
    name: options.name,
    parents: [options.folderId],
    mimeType: mimeType,
  };

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  );
  form.append('file', blob);

  let res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,webContentLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    }
  );

  // Si da 401 (token expirado), invalidar y notificar
  if (res.status === 401) {
    cachedDriveAccessToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_DRIVE_TOKEN_KEY);
    }
    notifySubscribers();
    console.warn('Aviso: Token de Google Drive expirado. Se renovará desde el panel de Secretaría.');
    return null;
  }

  // Si da 404 o 403 por permisos en la carpeta compartida, reintentamos subir a la raíz del Drive
  if (!res.ok && (res.status === 404 || res.status === 403)) {
    console.warn(`No se pudo subir a la carpeta ${options.folderId}, subiendo a la raíz de Google Drive...`);
    const fallbackMetadata = {
      name: options.name,
      mimeType: mimeType,
    };
    const fallbackForm = new FormData();
    fallbackForm.append(
      'metadata',
      new Blob([JSON.stringify(fallbackMetadata)], { type: 'application/json' })
    );
    fallbackForm.append('file', blob);

    res = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,webContentLink',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fallbackForm,
      }
    );
  }

  if (!res.ok) {
    const errText = await res.text();
    console.error('Error subiendo a Google Drive:', errText);
    throw new Error(`Google Drive API error: ${res.statusText}`);
  }

  const data = await res.json();
  return {
    fileId: data.id,
    webViewLink: data.webViewLink || `https://drive.google.com/file/d/${data.id}/view`,
    name: data.name,
  };
}

/**
 * Elimina un archivo de Google Drive por su fileId (para Superadmin)
 */
export async function deleteFileFromDrive(fileId: string): Promise<boolean> {
  const token = await ensureGoogleDriveToken();
  if (!token) return false;

  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.ok;
}

/**
 * Sincroniza en lote todas las solicitudes con firmas o comprobantes pendientes a Google Drive
 * y purga los temporales base64 una vez alojados en Drive.
 */
export async function syncAllPendingToDrive(
  requests: LicenseRequest[],
  onProgress?: (message: string, current: number, total: number) => void
): Promise<{
  signaturesUploaded: number;
  justificationsUploaded: number;
  errors: string[];
}> {
  const token = await ensureGoogleDriveToken();
  if (!token) {
    throw new Error('Google Drive no está conectado. Debe autorizar la cuenta de la escuela para sincronizar.');
  }

  let signaturesUploaded = 0;
  let justificationsUploaded = 0;
  const errors: string[] = [];

  // Filtrar solicitudes con algo pendiente de subir
  const pending = requests.filter((r) => {
    const hasPendingSig = r.signatureDataUrl && r.signatureDataUrl.startsWith('data:') && !r.signatureDriveUrl;
    const hasPendingJust = r.justificationDataUrl && r.justificationDataUrl.startsWith('data:') && !r.justificationDriveUrl;
    return hasPendingSig || hasPendingJust;
  });

  const total = pending.length;
  let current = 0;

  for (const req of pending) {
    current++;
    const updates: Partial<LicenseRequest> = {};

    // 1. Subir firma digital si está en base64 y no tiene drive url
    if (req.signatureDataUrl && req.signatureDataUrl.startsWith('data:') && !req.signatureDriveUrl) {
      if (onProgress) {
        onProgress(`Subiendo firma de ${req.agentName} (${req.id})...`, current, total);
      }
      try {
        const sigName = `${req.agentDni || req.employeeNumber}_${req.id}.png`;
        const sigRes = await uploadFileToDrive({
          name: sigName,
          dataUrl: req.signatureDataUrl,
          folderId: FOLDER_FIRMAS_ID,
        });
        if (sigRes) {
          updates.signatureDriveUrl = sigRes.webViewLink;
          updates.signatureDriveFileId = sigRes.fileId;
          // Reemplazar el dataUrl temporal por la URL permanente en Drive
          updates.signatureDataUrl = sigRes.webViewLink;
          signaturesUploaded++;
        }
      } catch (err: any) {
        console.error(`Error al subir firma para ${req.id}:`, err);
        errors.push(`Firma ${req.id}: ${err.message || 'Error desconocido'}`);
      }
    }

    // 2. Subir justificación/constancia si está en base64 y no tiene drive url
    if (req.justificationDataUrl && req.justificationDataUrl.startsWith('data:') && !req.justificationDriveUrl) {
      if (onProgress) {
        onProgress(`Subiendo comprobante de ${req.agentName} (${req.id})...`, current, total);
      }
      try {
        const processed = await processFileForUpload({
          dataUrl: req.justificationDataUrl,
          name: req.justificationName || 'comprobante.jpg',
        });
        const justName = `${req.agentDni || req.employeeNumber}_${req.id}_${processed.name}`;
        const justRes = await uploadFileToDrive({
          name: justName,
          dataUrl: processed.dataUrl,
          folderId: FOLDER_CONSTANCIAS_ID,
        });
        if (justRes) {
          updates.justificationDriveUrl = justRes.webViewLink;
          updates.justificationDriveFileId = justRes.fileId;
          // Reemplazar el dataUrl temporal por la URL permanente en Drive
          updates.justificationDataUrl = justRes.webViewLink;
          justificationsUploaded++;
        }
      } catch (err: any) {
        console.error(`Error al subir comprobante para ${req.id}:`, err);
        errors.push(`Comprobante ${req.id}: ${err.message || 'Error desconocido'}`);
      }
    }

    if (Object.keys(updates).length > 0) {
      dataService.updateLicenseRequest(req.id, updates);
    }
  }

  return {
    signaturesUploaded,
    justificationsUploaded,
    errors,
  };
}
