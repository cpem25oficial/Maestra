import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc,
  writeBatch,
  query, 
  where 
} from 'firebase/firestore';
import { db } from './firebase';
import { 
  Agent, 
  Cargo, 
  Puesto, 
  LicenseType, 
  LicenseRequest, 
  SisoLicense, 
  SisoImportHistory, 
  AuditLog, 
  WeeklyAbsenceRow, 
  LongLicenseItem,
  LicenseStatus,
  HistorialEstadoSolicitud
} from '../types';
import { SEED_CARGOS } from '../data/cargosData';

// Storage keys (v6 - Base de datos limpia y lista para sembrar desde CSV)
const STORAGE_AGENTS = 'cpem_agents_v6';
const STORAGE_CARGOS = 'cpem_cargos_v6';
const STORAGE_PUESTOS = 'cpem_puestos_v6';
const STORAGE_TYPES = 'cpem_license_types_v6';
const STORAGE_REQUESTS = 'cpem_license_requests_v6';
const STORAGE_SISO_LICENSES = 'cpem_siso_licenses_v6';
const STORAGE_SISO_IMPORTS = 'cpem_siso_imports_v6';
const STORAGE_AUDIT_LOGS = 'cpem_audit_logs_v6';

/**
 * Normaliza fechas provenientes de SISO (DD-MM-YYYY o DD/MM/YYYY) a formato estándar ISO YYYY-MM-DD.
 */
export function normalizeSisoDate(dateStr: string): string {
  if (!dateStr) return '';
  const trimmed = dateStr.trim();
  // Match DD-MM-YYYY o DD/MM/YYYY
  const dmyMatch = trimmed.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmyMatch) {
    const day = dmyMatch[1].padStart(2, '0');
    const month = dmyMatch[2].padStart(2, '0');
    const year = dmyMatch[3];
    return `${year}-${month}-${day}`;
  }
  // Match YYYY-MM-DD
  const ymdMatch = trimmed.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (ymdMatch) {
    const year = ymdMatch[1];
    const month = ymdMatch[2].padStart(2, '0');
    const day = ymdMatch[3].padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return trimmed;
}

/**
 * Limpia y normaliza el nombre de un encabezado CSV para comparación robusta
 */
export function cleanHeaderKey(h: string): string {
  return h
    .trim()
    .replace(/^["']|["']$/g, '')
    .toUpperCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Quita acentos (e.g. Í -> I)
    .replace(/[._\-]/g, ' ') // Reemplaza puntos, guiones y guiones bajos por espacios
    .replace(/\s+/g, ' ') // Colapsa espacios múltiples
    .trim();
}

/**
 * Encabezados oficiales de SISO (19 columnas en orden estándar)
 */
export const STANDARD_SISO_HEADERS: string[] = [
  'ID',
  'NRO EMPLEADO',
  'DNI',
  'NOMBRE',
  'EMAIL',
  'TIPO',
  'CARGA',
  'DESDE',
  'HASTA',
  'DIAS',
  'JUSTIFICA',
  'COD LICENCIA',
  'FECHA ALTA',
  'AUDITOR',
  'PATOLOGIA',
  'FECHA AUDITORIA',
  'MEDICO_INTERVINIENTE',
  'MATRICULA_MEDICO_INTERVINIENTE',
  'ESTABLECIMIENTOS O SECTOR',
];

export interface PreprocessedSisoResult {
  headers: string[];
  dataRows: string[];
  delimiter: string;
  isHeaderAutoAssigned: boolean;
}

/**
 * Preprocesa texto de reporte SISO limpiando prefijos, encabezados con '.' o filas sin encabezados
 */
export function preprocessSisoCsv(rawText: string): PreprocessedSisoResult {
  const rawLines = rawText.split(/\r?\n/);
  const cleanLines: string[] = [];

  for (const l of rawLines) {
    let line = l.trim();
    if (!line) continue;
    // Remueve prefijos de copia como "- encabezados:" o "encabezados:"
    if (/^[-*•]?\s*encabezados\s*:\s*/i.test(line)) {
      line = line.replace(/^[-*•]?\s*encabezados\s*:\s*/i, '').trim();
    }
    // Ignora líneas de texto como "ejemplos:", "ejemplo:", "notas:"
    if (/^[-*•]?\s*ejemplos?\s*:\s*$/i.test(line) || /^[-*•]?\s*notas?\s*:\s*$/i.test(line)) {
      continue;
    }
    // Ignora comentarios
    if (line.startsWith('#') || line.startsWith('//')) continue;

    cleanLines.push(line);
  }

  if (cleanLines.length === 0) {
    return {
      headers: [],
      dataRows: [],
      delimiter: ';',
      isHeaderAutoAssigned: false,
    };
  }

  // Detecta delimitador principal (; o ,)
  const firstWithSep = cleanLines.find((l) => l.includes(';') || l.includes(',')) || cleanLines[0];
  const semiCount = (firstWithSep.match(/;/g) || []).length;
  const commaCount = (firstWithSep.match(/,/g) || []).length;
  const delimiter = semiCount >= commaCount ? ';' : ',';

  const firstLineTokens = parseCSVLine(cleanLines[0], delimiter);
  const firstLineUpper = cleanLines[0].toUpperCase();

  const isHeaderRow = 
    firstLineUpper.includes('ID') || 
    firstLineUpper.includes('EMPLEADO') || 
    firstLineUpper.includes('LEGAJO') || 
    firstLineUpper.includes('NOMBRE') || 
    firstLineUpper.includes('DESDE');

  let headers: string[] = [];
  let dataRows: string[] = [];
  let isHeaderAutoAssigned = false;

  if (isHeaderRow) {
    headers = firstLineTokens.map(cleanHeaderKey);
    dataRows = cleanLines.slice(1);
  } else {
    // Si no tiene encabezados, asigna los 19 encabezados oficiales de SISO
    headers = STANDARD_SISO_HEADERS.map(cleanHeaderKey);
    dataRows = cleanLines;
    isHeaderAutoAssigned = true;
  }

  return { headers, dataRows, delimiter, isHeaderAutoAssigned };
}

/**
 * Obtiene el valor de un campo desde un registro buscando entre varias claves candidatas
 */
export function getField(row: Record<string, string>, ...keys: string[]): string {
  for (const k of keys) {
    const cleanK = cleanHeaderKey(k);
    if (row[cleanK] !== undefined && row[cleanK] !== '') {
      return row[cleanK].trim();
    }
  }
  return '';
}

/**
 * Parsea una línea de CSV respetando comillas y detectando delimitador (';' o ',')
 */
export function parseCSVLine(line: string, delimiter?: string): string[] {
  if (!delimiter) {
    const semiCount = (line.match(/;/g) || []).length;
    const commaCount = (line.match(/,/g) || []).length;
    delimiter = semiCount >= commaCount ? ';' : ',';
  }

  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim().replace(/^["']|["']$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^["']|["']$/g, ''));
  return result;
}

export function calculateDaysBetween(from: string, to: string): number {
  if (!from || !to) return 0;
  const normFrom = normalizeSisoDate(from);
  const normTo = normalizeSisoDate(to);
  const d1 = new Date(normFrom + 'T00:00:00');
  const d2 = new Date(normTo + 'T00:00:00');
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;
  const diffTime = d2.getTime() - d1.getTime();
  if (diffTime < 0) return 0;
  return Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

export function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function formatYMD(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDM(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}-${month}`;
}

/**
 * Formatea una fecha o string de fecha al formato visual institucional: dd-mm-YY
 * Mantiene en base de datos el formato estándar (YYYY-MM-DD o ISO).
 * Ejemplos:
 * "2026-10-19" -> "19-10-26"
 * "2026-03-05" -> "05-03-26"
 * "1982-07-03" -> "03-07-82"
 * "2026-10-19T08:00:00.000Z" -> "19-10-26"
 * "19/10/2026" -> "19-10-26"
 */
export function formatDMY(dateInput?: string | Date | null): string {
  if (!dateInput) return '';
  
  if (dateInput instanceof Date) {
    if (isNaN(dateInput.getTime())) return '';
    const day = String(dateInput.getDate()).padStart(2, '0');
    const month = String(dateInput.getMonth() + 1).padStart(2, '0');
    const year = String(dateInput.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  }

  const str = String(dateInput).trim();
  if (!str) return '';

  // Si contiene T (ISO timestamp)
  const cleanStr = str.split('T')[0].trim();

  // Match YYYY-MM-DD o YYYY/MM/DD
  const ymdMatch = cleanStr.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (ymdMatch) {
    const year = ymdMatch[1].slice(-2);
    const month = ymdMatch[2].padStart(2, '0');
    const day = ymdMatch[3].padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  // Match DD-MM-YYYY o DD/MM/YYYY
  const dmy4Match = cleanStr.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmy4Match) {
    const day = dmy4Match[1].padStart(2, '0');
    const month = dmy4Match[2].padStart(2, '0');
    const year = dmy4Match[3].slice(-2);
    return `${day}-${month}-${year}`;
  }

  // Match DD-MM-YY o DD/MM/YY
  const dmy2Match = cleanStr.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{2})$/);
  if (dmy2Match) {
    const day = dmy2Match[1].padStart(2, '0');
    const month = dmy2Match[2].padStart(2, '0');
    const year = dmy2Match[3];
    return `${day}-${month}-${year}`;
  }

  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    const day = String(parsed.getDate()).padStart(2, '0');
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const year = String(parsed.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  }

  return str;
}

/**
 * Formatea fecha y hora al formato visual institucional: dd-mm-YY HH:MM hs
 */
export function formatDateTimeDMY(dateInput?: string | Date | null): string {
  if (!dateInput) return '';
  const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(d.getTime())) return formatDMY(dateInput);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  const hours = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${mins} hs`;
}

// Base de datos: Cargos sembrados desde CSV (424 registros)
export const INITIAL_AGENTS: Agent[] = [];
export const INITIAL_CARGOS: Cargo[] = [...SEED_CARGOS];
export const INITIAL_PUESTOS: Puesto[] = [];
export const INITIAL_LICENSE_TYPES: LicenseType[] = [];
export const INITIAL_SISO_LICENSES: SisoLicense[] = [];
export const INITIAL_SISO_IMPORTS: SisoImportHistory[] = [];

class DataService {
  private agents: Agent[] = [];
  private cargos: Cargo[] = [];
  private puestos: Puesto[] = [];
  private licenseTypes: LicenseType[] = [];
  private requests: LicenseRequest[] = [];
  private sisoLicenses: SisoLicense[] = [];
  private sisoImports: SisoImportHistory[] = [];
  private auditLogs: AuditLog[] = [];
  private initialized = false;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const storedAgents = localStorage.getItem(STORAGE_AGENTS);
      if (storedAgents) {
        const parsed: Agent[] = JSON.parse(storedAgents);
        const map = new Map<string, Agent>();
        for (const a of INITIAL_AGENTS) map.set(a.id, a);
        for (const a of parsed) map.set(a.id, a);
        this.agents = Array.from(map.values());
      } else {
        this.agents = [...INITIAL_AGENTS];
      }

      const storedCargos = localStorage.getItem(STORAGE_CARGOS);
      if (storedCargos) {
        const parsed: Cargo[] = JSON.parse(storedCargos);
        if (parsed && Array.isArray(parsed) && parsed.length >= INITIAL_CARGOS.length) {
          this.cargos = parsed;
        } else {
          this.cargos = [...INITIAL_CARGOS];
          this.saveCargos();
        }
      } else {
        this.cargos = [...INITIAL_CARGOS];
      }

      const storedPuestos = localStorage.getItem(STORAGE_PUESTOS);
      if (storedPuestos) {
        const parsed: Puesto[] = JSON.parse(storedPuestos);
        if (parsed && Array.isArray(parsed) && parsed.length >= INITIAL_PUESTOS.length) {
          this.puestos = parsed;
        } else {
          this.puestos = [...INITIAL_PUESTOS];
          this.savePuestos();
        }
      } else {
        this.puestos = [...INITIAL_PUESTOS];
      }

      const storedTypes = localStorage.getItem(STORAGE_TYPES);
      if (storedTypes) {
        const parsed: LicenseType[] = JSON.parse(storedTypes);
        if (parsed && Array.isArray(parsed) && parsed.length >= INITIAL_LICENSE_TYPES.length) {
          this.licenseTypes = parsed;
        } else {
          this.licenseTypes = [...INITIAL_LICENSE_TYPES];
          this.saveLicenseTypes();
        }
      } else {
        this.licenseTypes = [...INITIAL_LICENSE_TYPES];
      }

      const storedSiso = localStorage.getItem(STORAGE_SISO_LICENSES);
      if (storedSiso) {
        const parsed: SisoLicense[] = JSON.parse(storedSiso);
        this.sisoLicenses = Array.isArray(parsed)
          ? parsed.filter((s) => s.importId !== 'import-seed-1')
          : [];
      } else {
        this.sisoLicenses = [];
      }

      const storedImports = localStorage.getItem(STORAGE_SISO_IMPORTS);
      if (storedImports) {
        const parsed: SisoImportHistory[] = JSON.parse(storedImports);
        this.sisoImports = Array.isArray(parsed)
          ? parsed.filter((i) => i.id !== 'import-seed-1')
          : [];
      } else {
        this.sisoImports = [];
      }

      this.auditLogs = JSON.parse(localStorage.getItem(STORAGE_AUDIT_LOGS) || 'null') || [];
      
      const storedReqs = localStorage.getItem(STORAGE_REQUESTS);
      if (storedReqs) {
        const parsed: LicenseRequest[] = JSON.parse(storedReqs);
        this.requests = Array.isArray(parsed)
          ? parsed.filter(
              (r) =>
                r.id !== 'SOL-2026-001' &&
                r.id !== 'SOL-2026-002' &&
                r.id !== 'SOL-2026-003' &&
                r.employeeNumber !== '1042' &&
                r.employeeNumber !== '3118' &&
                r.employeeNumber !== '4092'
            )
          : [];
      } else {
        this.requests = [];
        this.saveRequests();
      }
    } catch {
      this.agents = [...INITIAL_AGENTS];
      this.cargos = [...INITIAL_CARGOS];
      this.puestos = [...INITIAL_PUESTOS];
      this.licenseTypes = [...INITIAL_LICENSE_TYPES];
      this.sisoLicenses = [];
      this.sisoImports = [];
      this.requests = [];
    }
  }

  private generateInitialRequests(): LicenseRequest[] {
    return [];
  }

  private saveAgents() {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_AGENTS, JSON.stringify(this.agents));
  }
  private saveCargos() {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_CARGOS, JSON.stringify(this.cargos));
  }
  private savePuestos() {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_PUESTOS, JSON.stringify(this.puestos));
  }
  private saveLicenseTypes() {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_TYPES, JSON.stringify(this.licenseTypes));
  }
  private saveRequests() {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_REQUESTS, JSON.stringify(this.requests));
  }
  private saveSisoLicenses() {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_SISO_LICENSES, JSON.stringify(this.sisoLicenses));
  }
  private saveSisoImports() {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_SISO_IMPORTS, JSON.stringify(this.sisoImports));
  }
  private saveAuditLogs() {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_AUDIT_LOGS, JSON.stringify(this.auditLogs));
  }

  public async initialize() {
    if (this.initialized) return;
    this.initialized = true;

    try {
      // 1. Cargar Solicitudes de Licencia desde Firestore
      const reqSnap = await getDocs(collection(db, 'license_requests'));
      if (!reqSnap.empty) {
        const remoteRequests: LicenseRequest[] = [];
        reqSnap.forEach((docItem) => {
          remoteRequests.push(docItem.data() as LicenseRequest);
        });
        // Merge with local requests
        const reqMap = new Map<string, LicenseRequest>();
        for (const r of this.requests) reqMap.set(r.id, r);
        for (const r of remoteRequests) reqMap.set(r.id, r);
        this.requests = Array.from(reqMap.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.saveRequests();
      }

      // 2. Cargar Licencias SISO desde Firestore
      const sisoSnap = await getDocs(collection(db, 'siso_licenses'));
      if (!sisoSnap.empty) {
        const remoteSiso: SisoLicense[] = [];
        sisoSnap.forEach((docItem) => {
          remoteSiso.push(docItem.data() as SisoLicense);
        });
        const sisoMap = new Map<string, SisoLicense>();
        for (const s of this.sisoLicenses) sisoMap.set(s.id, s);
        for (const s of remoteSiso) sisoMap.set(s.id, s);
        this.sisoLicenses = Array.from(sisoMap.values());
        this.saveSisoLicenses();
      }

      // 3. Sincronizar Agentes
      const agentSnap = await getDocs(collection(db, 'agents'));
      if (!agentSnap.empty) {
        const remoteAgents: Agent[] = [];
        agentSnap.forEach((docItem) => {
          remoteAgents.push(docItem.data() as Agent);
        });
        const agentMap = new Map<string, Agent>();
        for (const a of this.agents) agentMap.set(a.id, a);
        for (const a of remoteAgents) agentMap.set(a.id, a);
        this.agents = Array.from(agentMap.values());
        this.saveAgents();
      } else {
        // Sembrar agentes iniciales en segundo plano
        this.batchSeedCollection('agents', this.agents);
      }

      // 4. Sincronizar Cargos
      const cargoSnap = await getDocs(collection(db, 'cargos'));
      if (!cargoSnap.empty) {
        const remoteCargos: Cargo[] = [];
        cargoSnap.forEach((docItem) => {
          remoteCargos.push(docItem.data() as Cargo);
        });
        const cargoMap = new Map<string, Cargo>();
        for (const c of this.cargos) cargoMap.set(c.id, c);
        for (const c of remoteCargos) cargoMap.set(c.id, c);
        this.cargos = Array.from(cargoMap.values());
        this.saveCargos();
      } else {
        // Sembrar cargos iniciales en segundo plano
        this.batchSeedCollection('cargos', this.cargos);
      }

      // 5. Sincronizar Puestos
      const puestoSnap = await getDocs(collection(db, 'puestos'));
      if (!puestoSnap.empty) {
        const remotePuestos: Puesto[] = [];
        puestoSnap.forEach((docItem) => {
          remotePuestos.push(docItem.data() as Puesto);
        });
        const puestoMap = new Map<string, Puesto>();
        for (const p of this.puestos) puestoMap.set(p.id, p);
        for (const p of remotePuestos) puestoMap.set(p.id, p);
        this.puestos = Array.from(puestoMap.values());
        this.savePuestos();
      } else {
        // Sembrar puestos iniciales en segundo plano
        this.batchSeedCollection('puestos', this.puestos);
      }

      // 6. Sincronizar Tipos de Licencias
      const typeSnap = await getDocs(collection(db, 'license_types'));
      if (!typeSnap.empty) {
        const remoteTypes: LicenseType[] = [];
        typeSnap.forEach((docItem) => {
          remoteTypes.push(docItem.data() as LicenseType);
        });
        const typeMap = new Map<string, LicenseType>();
        for (const t of this.licenseTypes) typeMap.set(t.id, t);
        for (const t of remoteTypes) typeMap.set(t.id, t);
        this.licenseTypes = Array.from(typeMap.values());
        this.saveLicenseTypes();
      } else {
        this.batchSeedCollection('license_types', this.licenseTypes);
      }
    } catch (error) {
      console.warn('Firestore initial synchronization notice:', error);
    }
  }

  private async batchSeedCollection<T extends { id: string }>(collName: string, items: T[], chunkSize = 300) {
    try {
      for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize);
        const batch = writeBatch(db);
        for (const item of chunk) {
          const docRef = doc(db, collName, item.id);
          batch.set(docRef, item);
        }
        await batch.commit();
      }
    } catch (e) {
      console.warn(`Batch seed for ${collName} failed gracefully:`, e);
    }
  }

  // AGENTES CRUD (Section 4)
  public getAgents(): Agent[] {
    return this.agents.map((ag) => {
      // Attach current posts for easy frontend presentation
      const assignedPuestos = this.puestos.filter((p) =>
        p.agentesAsignados.some((asig) => asig.agenteId === ag.id)
      );
      return {
        ...ag,
        hasAssignedPost: assignedPuestos.length > 0,
        posts: assignedPuestos.map((p) => {
          const c = this.cargos.find((cargo) => cargo.id === p.cargoId);
          return {
            id: p.id,
            cargo: c?.descripcion || 'Cargo',
            curso: `${c?.curso || ''} ${c?.seccion || ''} (${c?.turno || ''})`.trim(),
            situacionRevista: p.agentesAsignados.find((as) => as.agenteId === ag.id)?.situacionRevista || 'Titular',
            assigned: true,
          };
        }),
      };
    });
  }

  public getAgentById(id: string): Agent | null {
    const list = this.getAgents();
    return list.find((a) => a.id === id) || null;
  }

  public verifyAgent(employeeNumber: string): Promise<Agent | null> {
    const list = this.getAgents();
    const trimmed = employeeNumber.trim().toLowerCase();
    const found = list.find(
      (a) => a.employeeNumber.toLowerCase() === trimmed || a.dni.toLowerCase() === trimmed
    );
    return Promise.resolve(found || null);
  }

  public createAgent(data: Omit<Agent, 'id' | 'fullName' | 'hasAssignedPost'>): Agent {
    const existsNum = this.agents.some((a) => a.employeeNumber === data.employeeNumber.trim());
    if (existsNum) {
      throw new Error(`Ya existe un agente registrado con el número de empleado ${data.employeeNumber}.`);
    }
    const existsDni = this.agents.some((a) => a.dni.replace(/\D/g, '') === data.dni.replace(/\D/g, ''));
    if (existsDni) {
      throw new Error(`Ya existe un agente registrado con el DNI ${data.dni}.`);
    }

    const id = 'agent-' + Date.now();
    const fullName = `${data.apellidos.trim()}, ${data.nombres.trim()}`;
    const newAgent: Agent = {
      ...data,
      id,
      apellidos: data.apellidos.trim(),
      nombres: data.nombres.trim(),
      fullName,
      employeeNumber: data.employeeNumber.trim(),
      dni: data.dni.trim(),
      telefono: data.telefono.trim(),
      email: data.email.trim().toLowerCase(),
      activo: true,
      hasAssignedPost: false,
      createdAt: new Date().toISOString(),
    };

    this.agents.push(newAgent);
    this.saveAgents();
    setDoc(doc(db, 'agents', newAgent.id), newAgent).catch((e) =>
      console.warn('Firestore createAgent sync failed:', e)
    );
    return newAgent;
  }

  public updateAgent(id: string, updates: Partial<Agent>): Agent {
    const index = this.agents.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Agente no encontrado.');

    const current = this.agents[index];
    const apellidos = updates.apellidos !== undefined ? updates.apellidos.trim() : current.apellidos;
    const nombres = updates.nombres !== undefined ? updates.nombres.trim() : current.nombres;
    const fullName = `${apellidos}, ${nombres}`;

    this.agents[index] = {
      ...current,
      ...updates,
      apellidos,
      nombres,
      fullName,
    };

    this.saveAgents();
    setDoc(doc(db, 'agents', id), this.agents[index], { merge: true }).catch((e) =>
      console.warn('Firestore updateAgent sync failed:', e)
    );
    return this.agents[index];
  }

  // Section 4 & 21: "Desactivar agente sin eliminar su historial"
  public toggleAgentActive(id: string, activo: boolean): Agent {
    const index = this.agents.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Agente no encontrado.');

    this.agents[index].activo = activo;
    this.saveAgents();
    setDoc(doc(db, 'agents', id), { activo }, { merge: true }).catch((e) =>
      console.warn('Firestore toggleAgentActive sync failed:', e)
    );
    return this.agents[index];
  }

  /**
   * Importa agentes desde texto CSV siguiendo las reglas estrictas:
   * 1. Lee las filas de abajo hacia arriba ("de abajo a arriba").
   * 2. Toma únicamente los datos necesarios (Apellidos, Nombres, N° Empleado, DNI, Teléfono, Lugar y Fecha de Nacimiento).
   * 3. Utiliza "Dirección de correo electrónico" como el email real.
   * 4. Si ya existe, conserva el registro más reciente ("si ya existe toma el mas actual para registro final").
   */
  public importAgentsFromCSV(csvText: string): {
    totalRows: number;
    uniqueParsed: number;
    newAdded: number;
    updated: number;
    duplicatesSkipped: number;
  } {
    const parseCSVLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    const clean = (s?: string) => (s ? s.replace(/^["'\s]+|["'\s]+$/g, '').trim() : '');
    const formatDob = (raw?: string): string => {
      if (!raw) return '';
      const parts = raw.split('/');
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        let year = parts[2].trim();
        if (year.length === 2) {
          const num = parseInt(year, 10);
          year = num > 30 ? '19' + year : '20' + year;
        }
        return `${year}-${month}-${day}`;
      }
      return raw;
    };

    const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length === 0) {
      throw new Error('El archivo CSV está vacío.');
    }

    let startIndex = 0;
    const firstRow = parseCSVLine(lines[0]);
    if (
      firstRow.some(
        (col) =>
          col.toLowerCase().includes('correo') ||
          col.toLowerCase().includes('apellido') ||
          col.toLowerCase().includes('dni')
      )
    ) {
      startIndex = 1;
    }

    const dataRows = lines.slice(startIndex);
    const seenMap = new Map<string, Agent>();
    let duplicatesSkipped = 0;

    // Iterar de abajo a arriba: la primera aparición es la más reciente
    for (let i = dataRows.length - 1; i >= 0; i--) {
      const row = parseCSVLine(dataRows[i]);
      if (row.length < 5) continue;

      const emailReal = clean(row[1]).toLowerCase();
      const apellidos = clean(row[2]);
      const nombres = clean(row[3]);
      const rawDni = clean(row[4]);
      const rawEmpNum = clean(row[5]);
      const telefono = clean(row[6]);
      const lugarNacimiento = clean(row[8]);
      const fechaNacimiento = clean(row[9]);

      const cleanDni = rawDni.replace(/[.\s-]/g, '');
      const cleanEmpNum = rawEmpNum.replace(/[.\s-]/g, '');

      if (!cleanDni && !cleanEmpNum) continue;

      const keyDni = cleanDni ? `DNI_${cleanDni}` : null;
      const keyEmp = cleanEmpNum ? `EMP_${cleanEmpNum}` : null;

      // Si ya fue visto desde abajo, se descarta la fila anterior (más antigua)
      if ((keyDni && seenMap.has(keyDni)) || (keyEmp && seenMap.has(keyEmp))) {
        duplicatesSkipped++;
        continue;
      }

      const agent: Agent = {
        id: `agent-${cleanEmpNum || cleanDni}`,
        apellidos: apellidos || 'Sin Apellido',
        nombres: nombres || 'Sin Nombre',
        fullName: `${apellidos || 'Sin Apellido'}, ${nombres || 'Sin Nombre'}`,
        employeeNumber: cleanEmpNum || cleanDni,
        dni: cleanDni,
        telefono,
        email: emailReal,
        fechaNacimiento: formatDob(fechaNacimiento),
        lugarNacimiento,
        activo: true,
        hasAssignedPost: false,
        createdAt: new Date().toISOString(),
      };

      if (keyDni) seenMap.set(keyDni, agent);
      if (keyEmp) seenMap.set(keyEmp, agent);
      seenMap.set(`ID_${agent.id}`, agent);
    }

    const uniqueList = Array.from(new Set(Array.from(seenMap.values())));
    let newAdded = 0;
    let updated = 0;

    for (const newAg of uniqueList) {
      const existingIdx = this.agents.findIndex(
        (a) =>
          (newAg.dni && a.dni.replace(/\D/g, '') === newAg.dni.replace(/\D/g, '')) ||
          (newAg.employeeNumber && a.employeeNumber === newAg.employeeNumber)
      );

      if (existingIdx >= 0) {
        this.agents[existingIdx] = {
          ...this.agents[existingIdx],
          ...newAg,
          id: this.agents[existingIdx].id,
        };
        updated++;
      } else {
        this.agents.push(newAg);
        newAdded++;
      }
    }

    this.saveAgents();

    return {
      totalRows: dataRows.length,
      uniqueParsed: uniqueList.length,
      newAdded,
      updated,
      duplicatesSkipped,
    };
  }

  // CARGOS CRUD (Section 5, 7) - Ordenados según el orden del CSV por defecto
  public getCargos(): Cargo[] {
    return [...this.cargos].sort((a, b) => {
      const orderA = a.ordenVisual !== undefined ? a.ordenVisual : (a.csvIndex !== undefined ? a.csvIndex + 1 : 99999);
      const orderB = b.ordenVisual !== undefined ? b.ordenVisual : (b.csvIndex !== undefined ? b.csvIndex + 1 : 99999);
      return orderA - orderB;
    });
  }

  public moveCargoUp(cargoId: string): Cargo[] {
    const list = this.getCargos();
    const idx = list.findIndex((c) => c.id === cargoId);
    if (idx > 0) {
      const temp = list[idx];
      list[idx] = list[idx - 1];
      list[idx - 1] = temp;
      list.forEach((c, i) => {
        c.ordenVisual = i + 1;
      });
      this.cargos = list;
      this.saveCargos();
    }
    return this.getCargos();
  }

  public moveCargoDown(cargoId: string): Cargo[] {
    const list = this.getCargos();
    const idx = list.findIndex((c) => c.id === cargoId);
    if (idx >= 0 && idx < list.length - 1) {
      const temp = list[idx];
      list[idx] = list[idx + 1];
      list[idx + 1] = temp;
      list.forEach((c, i) => {
        c.ordenVisual = i + 1;
      });
      this.cargos = list;
      this.saveCargos();
    }
    return this.getCargos();
  }

  public moveCargoToPosition(cargoId: string, targetPosition: number): Cargo[] {
    const list = this.getCargos();
    const idx = list.findIndex((c) => c.id === cargoId);
    if (idx === -1) return list;
    const targetIdx = Math.max(0, Math.min(list.length - 1, targetPosition - 1));
    if (idx === targetIdx) return list;

    const [item] = list.splice(idx, 1);
    list.splice(targetIdx, 0, item);
    list.forEach((c, i) => {
      c.ordenVisual = i + 1;
    });
    this.cargos = list;
    this.saveCargos();
    return this.getCargos();
  }

  public reorderCargos(newOrder: Cargo[]): Cargo[] {
    newOrder.forEach((c, i) => {
      c.ordenVisual = i + 1;
    });
    this.cargos = newOrder;
    this.saveCargos();
    return this.getCargos();
  }

  public resetCargosToCSVOrder(): Cargo[] {
    const list = [...this.cargos].sort((a, b) => {
      const idxA = a.csvIndex !== undefined ? a.csvIndex : 99999;
      const idxB = b.csvIndex !== undefined ? b.csvIndex : 99999;
      return idxA - idxB;
    });
    list.forEach((c, i) => {
      c.ordenVisual = i + 1;
    });
    this.cargos = list;
    this.saveCargos();
    return this.getCargos();
  }

  public createCargo(data: Omit<Cargo, 'id'>): Cargo {
    const id = 'cargo-' + Date.now();
    const newCargo: Cargo = {
      ...data,
      id,
      activo: true,
      createdAt: new Date().toISOString(),
    };
    this.cargos.push(newCargo);
    this.saveCargos();
    setDoc(doc(db, 'cargos', newCargo.id), newCargo).catch((e) =>
      console.warn('Firestore createCargo sync failed:', e)
    );

    // Automatically create default Puesto for this Cargo
    const puestoId = 'puesto-' + Date.now();
    const newPuesto = {
      id: puestoId,
      cargoId: id,
      descripcion: `Puesto ${newCargo.descripcion} (${newCargo.curso} ${newCargo.seccion})`,
      agentesAsignados: [],
      activo: true,
      createdAt: new Date().toISOString(),
    };
    this.puestos.push(newPuesto);
    this.savePuestos();
    setDoc(doc(db, 'puestos', puestoId), newPuesto).catch((e) =>
      console.warn('Firestore createPuesto sync failed:', e)
    );

    return newCargo;
  }

  public updateCargo(id: string, updates: Partial<Cargo>): Cargo {
    const index = this.cargos.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Cargo no encontrado.');

    this.cargos[index] = {
      ...this.cargos[index],
      ...updates,
    };
    this.saveCargos();
    setDoc(doc(db, 'cargos', id), this.cargos[index], { merge: true }).catch((e) =>
      console.warn('Firestore updateCargo sync failed:', e)
    );
    return this.cargos[index];
  }

  // Section 21: "No eliminar cargos que tengan historial relacionado"
  public deleteCargo(id: string) {
    const puesto = this.puestos.find((p) => p.cargoId === id && p.agentesAsignados.length > 0);
    if (puesto) {
      throw new Error('No es posible eliminar un cargo que tiene agentes asignados. Desasigne primero los agentes o desactive el cargo.');
    }
    const puestoToDelete = this.puestos.find((p) => p.cargoId === id);
    this.cargos = this.cargos.filter((c) => c.id !== id);
    this.puestos = this.puestos.filter((p) => p.cargoId !== id);
    this.saveCargos();
    this.savePuestos();

    deleteDoc(doc(db, 'cargos', id)).catch((e) =>
      console.warn('Firestore deleteCargo sync failed:', e)
    );
    if (puestoToDelete) {
      deleteDoc(doc(db, 'puestos', puestoToDelete.id)).catch((e) =>
        console.warn('Firestore deletePuesto sync failed:', e)
      );
    }
  }

  // PUESTOS & ASIGNACIONES (Section 6, 14)
  public getPuestos(): Puesto[] {
    return this.puestos;
  }

  public getPuestoByCargoId(cargoId: string): Puesto | null {
    return this.puestos.find((p) => p.cargoId === cargoId) || null;
  }

  // Assign agent to puesto in specific order (Section 6: Un mismo puesto puede tener varios agentes con orden)
  public assignAgentToPuesto(
    puestoId: string, 
    agenteId: string, 
    situacionRevista: 'Titular' | 'Interino' | 'Suplente' = 'Titular'
  ): Puesto {
    const index = this.puestos.findIndex((p) => p.id === puestoId);
    if (index === -1) throw new Error('Puesto no encontrado.');

    const currentPuesto = this.puestos[index];
    const exists = currentPuesto.agentesAsignados.some((a) => a.agenteId === agenteId);
    if (exists) {
      throw new Error('El agente ya se encuentra asignado a este puesto.');
    }

    const nextOrden = currentPuesto.agentesAsignados.length + 1;
    currentPuesto.agentesAsignados.push({
      agenteId,
      orden: nextOrden,
      fechaAsignacion: formatYMD(new Date()),
      situacionRevista,
    });

    this.savePuestos();
    setDoc(doc(db, 'puestos', puestoId), currentPuesto).catch((e) =>
      console.warn('Firestore assignAgentToPuesto sync failed:', e)
    );
    return currentPuesto;
  }

  public removeAgentFromPuesto(puestoId: string, agenteId: string): Puesto {
    const index = this.puestos.findIndex((p) => p.id === puestoId);
    if (index === -1) throw new Error('Puesto no encontrado.');

    const currentPuesto = this.puestos[index];
    currentPuesto.agentesAsignados = currentPuesto.agentesAsignados
      .filter((a) => a.agenteId !== agenteId)
      // Re-index order
      .map((a, i) => ({ ...a, orden: i + 1 }));

    this.savePuestos();
    setDoc(doc(db, 'puestos', puestoId), currentPuesto).catch((e) =>
      console.warn('Firestore removeAgentFromPuesto sync failed:', e)
    );
    return currentPuesto;
  }

  public reorderPuestoAgents(puestoId: string, orderedAgentIds: string[]): Puesto {
    const index = this.puestos.findIndex((p) => p.id === puestoId);
    if (index === -1) throw new Error('Puesto no encontrado.');

    const currentPuesto = this.puestos[index];
    const newAssignments = orderedAgentIds.map((agId, i) => {
      const existing = currentPuesto.agentesAsignados.find((a) => a.agenteId === agId);
      return {
        agenteId: agId,
        orden: i + 1,
        fechaAsignacion: existing?.fechaAsignacion || formatYMD(new Date()),
        situacionRevista: existing?.situacionRevista || 'Titular',
      };
    });

    currentPuesto.agentesAsignados = newAssignments;
    this.savePuestos();
    setDoc(doc(db, 'puestos', puestoId), currentPuesto).catch((e) =>
      console.warn('Firestore reorderPuestoAgents sync failed:', e)
    );
    return currentPuesto;
  }

  // SOLICITUDES DE LICENCIAS (Section 9, 16, 17, 18)
  public getRequests(): LicenseRequest[] {
    return [...this.requests].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getRequestsByEmployee(employeeNumber: string): Promise<LicenseRequest[]> {
    const trimmed = employeeNumber.trim().toLowerCase();
    const list = this.requests
      .filter((r) => r.employeeNumber.toLowerCase() === trimmed && r.status !== 'Eliminada')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return Promise.resolve(list);
  }

  public createLicenseRequest(
    data: Omit<LicenseRequest, 'id' | 'createdAt' | 'status' | 'source' | 'historialEstados'> & { id?: string }
  ): Promise<LicenseRequest> {
    const id = data.id || ('SOL-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900));
    const newReq: LicenseRequest = {
      ...data,
      id,
      status: 'Pendiente',
      createdAt: new Date().toISOString(),
      source: 'Solicitud',
      historialEstados: [],
    };

    this.requests.unshift(newReq);
    this.saveRequests();

    // Persist to Firestore
    setDoc(doc(db, 'license_requests', newReq.id), newReq).catch((e) =>
      console.warn('Firestore setDoc failed:', e)
    );

    const logEntry: AuditLog = {
      id: 'log-' + Date.now(),
      action: 'CREACION_SOLICITUD',
      targetRequestId: id,
      employeeNumber: newReq.employeeNumber,
      agentName: newReq.agentName,
      reason: `Solicitud creada para ${newReq.postDescription}`,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(logEntry);
    this.saveAuditLogs();
    setDoc(doc(db, 'audit_logs', logEntry.id), logEntry).catch((e) =>
      console.warn('Firestore audit log failed:', e)
    );

    return Promise.resolve(newReq);
  }

  public updateLicenseRequest(id: string, updates: Partial<LicenseRequest>): LicenseRequest {
    const index = this.requests.findIndex((r) => r.id === id);
    if (index === -1) throw new Error('Solicitud no encontrada.');
    this.requests[index] = { ...this.requests[index], ...updates };
    this.saveRequests();
    setDoc(doc(db, 'license_requests', id), this.requests[index], { merge: true }).catch((e) =>
      console.warn('Firestore updateLicenseRequest failed:', e)
    );
    return this.requests[index];
  }

  // Section 9 & 16: Change state with history, user, and detail observation
  public updateRequestStatus(
    requestId: string,
    newStatus: LicenseStatus,
    usuarioEmail: string,
    detalleObservacion: string
  ): LicenseRequest {
    const index = this.requests.findIndex((r) => r.id === requestId);
    if (index === -1) throw new Error('Solicitud no encontrada.');

    const req = this.requests[index];
    const prevStatus = req.status;

    const historyEntry: HistorialEstadoSolicitud = {
      id: 'h-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      estadoAnterior: prevStatus,
      estadoNuevo: newStatus,
      fecha: new Date().toISOString(),
      usuario: usuarioEmail,
      detalle: detalleObservacion.trim() || 'Modificación de estado desde panel administrativo.',
    };

    req.status = newStatus;
    if (!req.historialEstados) req.historialEstados = [];
    req.historialEstados.unshift(historyEntry);

    this.saveRequests();
    setDoc(doc(db, 'license_requests', req.id), req).catch((e) =>
      console.warn('Firestore updateRequestStatus failed:', e)
    );

    const logEntry: AuditLog = {
      id: 'log-' + Date.now(),
      action: 'CAMBIO_ESTADO',
      targetRequestId: req.id,
      employeeNumber: req.employeeNumber,
      agentName: req.agentName,
      reason: `Estado cambiado de ${prevStatus} a ${newStatus}. ${detalleObservacion}`,
      usuario: usuarioEmail,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(logEntry);
    this.saveAuditLogs();
    setDoc(doc(db, 'audit_logs', logEntry.id), logEntry).catch((e) =>
      console.warn('Firestore audit log failed:', e)
    );

    return req;
  }

  /**
   * Permite al agente justificar una licencia autorizada adjuntando comprobante/documentación
   */
  public justifyAuthorizedRequest(
    requestId: string,
    employeeNumber: string,
    file: { name: string; size: string; dataUrl: string; driveUrl?: string; driveFileId?: string },
    observacion?: string
  ): Promise<LicenseRequest> {
    const index = this.requests.findIndex((r) => r.id === requestId);
    if (index === -1) throw new Error('Solicitud no encontrada.');

    const req = this.requests[index];
    if (req.employeeNumber.trim().toLowerCase() !== employeeNumber.trim().toLowerCase()) {
      throw new Error('No tiene permisos para justificar esta solicitud.');
    }

    const prevStatus = req.status;
    req.justificationName = file.name;
    req.justificationDataUrl = file.driveUrl || file.dataUrl;
    req.justificationDriveUrl = file.driveUrl;
    req.justificationDriveFileId = file.driveFileId;
    req.status = 'Justificada';

    const historyEntry: HistorialEstadoSolicitud = {
      id: 'h-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      estadoAnterior: prevStatus,
      estadoNuevo: 'Justificada',
      fecha: new Date().toISOString(),
      usuario: `Agente Leg. ${employeeNumber}`,
      detalle: observacion?.trim()
        ? `Comprobante de justificación adjuntado (${file.name}): ${observacion.trim()}`
        : `Comprobante de justificación adjuntado por el agente (${file.name}).`,
    };

    if (!req.historialEstados) req.historialEstados = [];
    req.historialEstados.unshift(historyEntry);

    this.saveRequests();
    setDoc(doc(db, 'license_requests', req.id), req).catch((e) =>
      console.warn('Firestore justifyAuthorizedRequest failed:', e)
    );

    this.auditLogs.unshift({
      id: 'log-' + Date.now(),
      action: 'CAMBIO_ESTADO',
      targetRequestId: req.id,
      employeeNumber: req.employeeNumber,
      agentName: req.agentName,
      reason: `El agente adjuntó comprobante de justificación (${file.name}). Estado actualizado a Justificada.`,
      usuario: `Agente Leg. ${employeeNumber}`,
      timestamp: new Date().toISOString(),
    });
    this.saveAuditLogs();

    return Promise.resolve(req);
  }

  // Section 18: Modificación Masiva
  public bulkUpdateStatus(
    requestIds: string[],
    newStatus: LicenseStatus,
    usuarioEmail: string,
    detalleObservacion: string
  ): { updatedCount: number } {
    let count = 0;
    for (const id of requestIds) {
      const index = this.requests.findIndex((r) => r.id === id);
      if (index !== -1) {
        const req = this.requests[index];
        const prevStatus = req.status;

        const historyEntry: HistorialEstadoSolicitud = {
          id: 'h-' + Date.now() + '-' + count,
          estadoAnterior: prevStatus,
          estadoNuevo: newStatus,
          fecha: new Date().toISOString(),
          usuario: usuarioEmail,
          detalle: `Modificación masiva: ${detalleObservacion || 'Cambio por lote de solicitudes.'}`,
        };

        req.status = newStatus;
        if (!req.historialEstados) req.historialEstados = [];
        req.historialEstados.unshift(historyEntry);
        count++;
      }
    }

    this.saveRequests();

    this.auditLogs.unshift({
      id: 'log-' + Date.now(),
      action: 'MODIFICACION_MASIVA',
      reason: `Se modificó en lote el estado de ${count} solicitudes a "${newStatus}". Detalle: ${detalleObservacion}`,
      usuario: usuarioEmail,
      timestamp: new Date().toISOString(),
    });
    this.saveAuditLogs();

    return { updatedCount: count };
  }

  // Deletion with rules
  public deleteLicenseRequest(requestId: string, employeeNumber: string, reason: string): Promise<boolean> {
    const index = this.requests.findIndex((r) => r.id === requestId);
    if (index === -1) throw new Error('La solicitud no fue encontrada.');

    const req = this.requests[index];
    if (req.status !== 'Pendiente' && req.status !== 'Rechazada') {
      throw new Error(`No se permite eliminar solicitudes en estado "${req.status}".`);
    }

    req.status = 'Eliminada';
    req.deletedAt = new Date().toISOString();
    this.saveRequests();
    setDoc(doc(db, 'license_requests', requestId), { status: 'Eliminada', deletedAt: req.deletedAt }, { merge: true }).catch((e) =>
      console.warn('Firestore deleteLicenseRequest failed:', e)
    );

    this.auditLogs.unshift({
      id: 'log-' + Date.now(),
      action: 'ELIMINACION_SOLICITUD',
      targetRequestId: requestId,
      employeeNumber: req.employeeNumber,
      agentName: req.agentName,
      reason: reason || 'Eliminada por el agente',
      timestamp: new Date().toISOString(),
    });
    this.saveAuditLogs();

    return Promise.resolve(true);
  }

  /**
   * Obtiene todas las solicitudes que contienen archivos o comprobantes adjuntos
   */
  public getRequestsWithJustifications(): LicenseRequest[] {
    return this.requests.filter(
      (r) =>
        (Boolean(r.justificationName) ||
          Boolean(r.justificationDataUrl) ||
          Boolean(r.justificationDriveUrl) ||
          Boolean(r.justificationDriveFileId)) &&
        r.status !== 'Eliminada'
    );
  }

  /**
   * Superadmin: Elimina archivos de justificación adjuntos en una o varias solicitudes.
   * Permite eliminar solo el archivo adjunto (dejando la solicitud en estado Autorizada para requerir nuevo comprobante)
   * o eliminar la solicitud completa junto con su comprobante.
   */
  public deleteJustificationFiles(
    requestIds: string[],
    superadminEmail: string,
    reason: string = 'Eliminación administrativa de comprobantes por Superadmin',
    deleteWholeRequest: boolean = false
  ): { deletedCount: number; affectedRequests: LicenseRequest[] } {
    let count = 0;
    const affected: LicenseRequest[] = [];

    for (const id of requestIds) {
      const req = this.requests.find((r) => r.id === id);
      if (req && (req.justificationName || req.justificationDataUrl || req.justificationDriveUrl || req.justificationDriveFileId)) {
        const fileName = req.justificationName || 'comprobante_adjunto';
        const prevStatus = req.status;

        if (deleteWholeRequest) {
          req.status = 'Eliminada';
          req.deletedAt = new Date().toISOString();
          req.justificationName = undefined;
          req.justificationDataUrl = undefined;
          req.justificationDriveUrl = undefined;
          req.justificationDriveFileId = undefined;
        } else {
          req.justificationName = undefined;
          req.justificationDataUrl = undefined;
          req.justificationDriveUrl = undefined;
          req.justificationDriveFileId = undefined;
          if (req.status === 'Justificada') {
            req.status = 'Autorizada';
          }
        }

        const historyEntry: HistorialEstadoSolicitud = {
          id: 'h-' + Date.now() + '-' + count,
          estadoAnterior: prevStatus,
          estadoNuevo: req.status,
          fecha: new Date().toISOString(),
          usuario: superadminEmail,
          detalle: deleteWholeRequest
            ? `Solicitud y comprobante "${fileName}" eliminados por Superadmin. Motivo: ${reason}`
            : `Comprobante adjunto "${fileName}" eliminado por Superadmin. Motivo: ${reason}`,
        };

        if (!req.historialEstados) req.historialEstados = [];
        req.historialEstados.unshift(historyEntry);

        this.auditLogs.unshift({
          id: 'log-' + Date.now() + '-' + count,
          action: 'ELIMINACION_ADJUNTO',
          targetRequestId: req.id,
          employeeNumber: req.employeeNumber,
          agentName: req.agentName,
          reason: `Archivo adjunto "${fileName}" eliminado por ${superadminEmail}. Motivo: ${reason}${deleteWholeRequest ? ' (Solicitud eliminada)' : ''}`,
          usuario: superadminEmail,
          timestamp: new Date().toISOString(),
        });

        count++;
        affected.push(req);
      }
    }

    if (count > 0) {
      this.saveRequests();
      this.saveAuditLogs();
    }

    return { deletedCount: count, affectedRequests: affected };
  }

  // SISO IMPORT (Section 8, 22)
  public getSisoLicenses(): SisoLicense[] {
    return this.sisoLicenses;
  }

  public getSisoImports(): SisoImportHistory[] {
    return this.sisoImports;
  }

  /**
   * Retorna un mapa indexado por legajo y DNI con las licencias activas (en curso) a la fecha de referencia
   */
  public getActiveLicensesMap(referenceDate?: string): Map<string, {
    source: 'Solicitud' | 'SISO';
    licenseType: string;
    dateFrom: string;
    dateTo: string;
    status: string;
  }> {
    const today = referenceDate || formatYMD(new Date());
    const map = new Map<string, {
      source: 'Solicitud' | 'SISO';
      licenseType: string;
      dateFrom: string;
      dateTo: string;
      status: string;
    }>();

    // 1. Solicitudes de licencias activas
    for (const r of this.requests) {
      if (['Autorizada', 'Justificada', 'Completada', 'Descuento', 'Pendiente'].includes(r.status)) {
        if (r.dateFrom <= today && r.dateTo >= today) {
          const info = {
            source: r.source,
            licenseType: `${r.licenseTypeCode} - ${r.licenseTypeName}`,
            dateFrom: r.dateFrom,
            dateTo: r.dateTo,
            status: r.status,
          };
          if (r.employeeNumber) map.set(r.employeeNumber.trim().toLowerCase(), info);
          if (r.agentDni) map.set(r.agentDni.replace(/\D/g, ''), info);
        }
      }
    }

    // 2. Licencias SISO activas
    for (const s of this.sisoLicenses) {
      if (s.desde <= today && s.hasta >= today) {
        const info = {
          source: 'SISO' as const,
          licenseType: s.codLicencia ? `${s.codLicencia}` : s.tipo,
          dateFrom: s.desde,
          dateTo: s.hasta,
          status: s.justifica || 'SISO',
        };
        if (s.nroEmpleado) map.set(s.nroEmpleado.trim().toLowerCase(), info);
        if (s.dni) map.set(s.dni.replace(/\D/g, ''), info);
      }
    }

    return map;
  }

  /**
   * Analiza el CSV o texto de SISO antes de importar para validar columnas y previsualizar registros
   */
  public analyzeSisoCsv(csvText: string): {
    valid: boolean;
    detected: number;
    newCount: number;
    updateCount: number;
    errors: string[];
    warnings: string[];
    delimiter: string;
    previewRows: Array<{
      id: string;
      nombre: string;
      nroEmpleado: string;
      dni: string;
      tipo: string;
      desde: string;
      hasta: string;
      dias: number;
      justifica: string;
      codLicencia: string;
      isExisting: boolean;
    }>;
  } {
    const { headers, dataRows, delimiter, isHeaderAutoAssigned } = preprocessSisoCsv(csvText);

    if (dataRows.length === 0) {
      return {
        valid: false,
        detected: 0,
        newCount: 0,
        updateCount: 0,
        errors: ['El archivo o texto no posee registros de datos suficientes para procesar.'],
        warnings: [],
        delimiter: ';',
        previewRows: [],
      };
    }

    const errors: string[] = [];
    const warnings: string[] = [];

    // Validar columnas obligatorias si se especificaron encabezados
    if (!isHeaderAutoAssigned) {
      const requiredConcepts = [
        { label: 'ID', keys: ['ID', 'NRO TRAMITE', 'ID SISO'] },
        { label: 'NRO EMPLEADO', keys: ['NRO EMPLEADO', 'LEGAJO', 'EMPLEADO'] },
        { label: 'DESDE', keys: ['DESDE', 'FECHA DESDE', 'INICIO'] },
        { label: 'HASTA', keys: ['HASTA', 'FECHA HASTA', 'FIN'] },
      ];

      const missing = requiredConcepts.filter(
        (req) => !headers.some((h) => req.keys.some((k) => cleanHeaderKey(k) === h || h.includes(cleanHeaderKey(k))))
      );

      if (missing.length > 0) {
        errors.push(`Columnas requeridas faltantes en el reporte SISO: ${missing.map((m) => m.label).join(', ')}`);
        return {
          valid: false,
          detected: 0,
          newCount: 0,
          updateCount: 0,
          errors,
          warnings,
          delimiter,
          previewRows: [],
        };
      }
    }

    let detected = 0;
    let newCount = 0;
    let updateCount = 0;
    const previewRows: Array<{
      id: string;
      nombre: string;
      nroEmpleado: string;
      dni: string;
      tipo: string;
      desde: string;
      hasta: string;
      dias: number;
      justifica: string;
      codLicencia: string;
      isExisting: boolean;
    }> = [];

    for (let i = 0; i < dataRows.length; i++) {
      const line = dataRows[i];
      if (!line.trim()) continue;

      const values = parseCSVLine(line, delimiter);
      const row: Record<string, string> = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx] !== undefined ? values[idx] : '';
      });

      const sisoId = getField(row, 'ID', 'ID SISO', 'NRO TRAMITE') || `siso-gen-${i + 1}`;
      const nroEmpleado = getField(row, 'NRO EMPLEADO', 'LEGAJO', 'EMPLEADO');
      const dni = getField(row, 'DNI', 'DOCUMENTO').replace(/\D/g, '');
      const nombre = getField(row, 'NOMBRE', 'APELLIDO Y NOMBRE', 'NOMBRE Y APELLIDO', 'AGENTE') || 'Sin Nombre';
      const rawDesde = getField(row, 'DESDE', 'FECHA DESDE', 'INICIO');
      const rawHasta = getField(row, 'HASTA', 'FECHA HASTA', 'FIN');
      const desde = normalizeSisoDate(rawDesde);
      const hasta = normalizeSisoDate(rawHasta);

      if (!sisoId || !desde || !hasta) {
        warnings.push(`Fila ${i + 1}: Datos incompletos (requiere ID, DESDE, HASTA).`);
        continue;
      }

      detected++;

      const rawDias = getField(row, 'DIAS', 'CANTIDAD DIAS', 'DIAS TOTALES');
      const diasParsed = parseInt(rawDias, 10);
      const dias = !isNaN(diasParsed) && diasParsed > 0 ? diasParsed : calculateDaysBetween(desde, hasta);

      const justifica = getField(row, 'JUSTIFICA', 'ESTADO', 'JUSTIFICADO', 'AUDITORIA') || 'SIN AUDITAR';
      const codLicencia = getField(row, 'COD LICENCIA', 'CODIGO LICENCIA', 'CODIGO', 'ARTICULO') || '7000 - PENDIENTE DE AUDITAR MEDICINA LABORAL';
      const tipo = getField(row, 'TIPO', 'TIPO LICENCIA') || 'ENFERMEDAD';

      const isExisting = this.sisoLicenses.some(
        (lic) => lic.id === sisoId || (lic.nroEmpleado === nroEmpleado && lic.desde === desde && lic.hasta === hasta)
      );

      if (isExisting) {
        updateCount++;
      } else {
        newCount++;
      }

      if (previewRows.length < 15) {
        previewRows.push({
          id: sisoId,
          nombre,
          nroEmpleado,
          dni,
          tipo,
          desde,
          hasta,
          dias,
          justifica,
          codLicencia,
          isExisting,
        });
      }
    }

    return {
      valid: errors.length === 0 && detected > 0,
      detected,
      newCount,
      updateCount,
      errors,
      warnings,
      delimiter,
      previewRows,
    };
  }

  public importSisoCsv(
    csvText: string,
    fileName: string,
    usuarioEmail: string
  ): {
    success: boolean;
    detected: number;
    created: number;
    updated: number;
    errors: string[];
    importId: string;
  } {
    const { headers, dataRows, delimiter } = preprocessSisoCsv(csvText);

    if (dataRows.length === 0) {
      return {
        success: false,
        detected: 0,
        created: 0,
        updated: 0,
        errors: ['El archivo CSV está vacío o no contiene filas de datos.'],
        importId: '',
      };
    }

    const importId = 'imp-' + Date.now();
    const errors: string[] = [];
    let created = 0;
    let updated = 0;
    let detected = 0;

    for (let i = 0; i < dataRows.length; i++) {
      const line = dataRows[i];
      if (!line.trim()) continue;

      const values = parseCSVLine(line, delimiter);
      const row: Record<string, string> = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx] !== undefined ? values[idx] : '';
      });

      const sisoId = getField(row, 'ID', 'ID SISO', 'NRO TRAMITE') || `siso-gen-${Date.now()}-${i}`;
      const nroEmpleado = getField(row, 'NRO EMPLEADO', 'LEGAJO', 'EMPLEADO');
      const dni = getField(row, 'DNI', 'DOCUMENTO').replace(/\D/g, '');
      const nombre = getField(row, 'NOMBRE', 'APELLIDO Y NOMBRE', 'NOMBRE Y APELLIDO', 'AGENTE') || 'Sin Nombre';
      const email = getField(row, 'EMAIL', 'CORREO', 'MAIL');
      const tipo = getField(row, 'TIPO', 'TIPO LICENCIA') || 'ENFERMEDAD';
      const rawCarga = getField(row, 'CARGA', 'FECHA CARGA');
      const rawDesde = getField(row, 'DESDE', 'FECHA DESDE', 'INICIO');
      const rawHasta = getField(row, 'HASTA', 'FECHA HASTA', 'FIN');
      const desde = normalizeSisoDate(rawDesde);
      const hasta = normalizeSisoDate(rawHasta);

      if (!sisoId || !desde || !hasta) {
        errors.push(`Fila ${i + 1}: Datos incompletos (requiere ID, DESDE, HASTA).`);
        continue;
      }

      detected++;

      const rawDias = getField(row, 'DIAS', 'CANTIDAD DIAS', 'DIAS TOTALES');
      const diasParsed = parseInt(rawDias, 10);
      const dias = !isNaN(diasParsed) && diasParsed > 0 ? diasParsed : calculateDaysBetween(desde, hasta);

      const justifica = getField(row, 'JUSTIFICA', 'ESTADO', 'JUSTIFICADO', 'AUDITORIA') || 'SIN AUDITAR';
      const codLicencia = getField(row, 'COD LICENCIA', 'CODIGO LICENCIA', 'CODIGO', 'ARTICULO') || '7000 - PENDIENTE DE AUDITAR MEDICINA LABORAL';
      const rawFechaAlta = getField(row, 'FECHA ALTA', 'ALTA');
      const fechaAlta = rawFechaAlta ? normalizeSisoDate(rawFechaAlta) : (rawCarga ? normalizeSisoDate(rawCarga) : formatYMD(new Date()));
      const auditor = getField(row, 'AUDITOR', 'MEDICO AUDITOR');
      const patologia = getField(row, 'PATOLOGIA', 'DIAGNOSTICO', 'CIE10');
      const rawFechaAuditoria = getField(row, 'FECHA AUDITORIA');
      const fechaAuditoria = rawFechaAuditoria ? normalizeSisoDate(rawFechaAuditoria) : '';
      const medicoInterviniente = getField(row, 'MEDICO_INTERVINIENTE', 'MEDICO INTERVINIENTE', 'MEDICO');
      const matriculaMedicoInterviniente = getField(row, 'MATRICULA_MEDICO_INTERVINIENTE', 'MATRICULA MEDICO INTERVINIENTE', 'MATRICULA');
      const establecimientosOSector = getField(row, 'ESTABLECIMIENTOS O SECTOR', 'ESTABLECIMIENTO', 'SECTOR') || 'CPEM N° 25';

      // Verificar si ya existe
      const existingIdx = this.sisoLicenses.findIndex(
        (lic) => lic.id === sisoId || (lic.nroEmpleado === nroEmpleado && lic.desde === desde && lic.hasta === hasta)
      );

      const sisoItem: SisoLicense = {
        id: sisoId,
        nroEmpleado,
        dni,
        nombre,
        email,
        tipo,
        carga: rawCarga || formatDMY(new Date().toISOString()),
        desde,
        hasta,
        dias,
        justifica,
        codLicencia,
        fechaAlta,
        auditor,
        patologia,
        fechaAuditoria,
        medicoInterviniente,
        matriculaMedicoInterviniente,
        establecimientosOSector,
        fechaImportacion: new Date().toISOString(),
        importId,
      };

      if (existingIdx !== -1) {
        this.sisoLicenses[existingIdx] = sisoItem;
        updated++;
      } else {
        this.sisoLicenses.unshift(sisoItem);
        created++;
      }
    }

    this.saveSisoLicenses();
    this.batchSeedCollection('siso_licenses', this.sisoLicenses);

    const importRecord: SisoImportHistory = {
      id: importId,
      fecha: new Date().toISOString(),
      nombreArchivo: fileName,
      cantidadDetectados: detected,
      registrosNuevos: created,
      registrosActualizados: updated,
      usuario: usuarioEmail,
      errores: errors,
    };

    this.sisoImports.unshift(importRecord);
    this.saveSisoImports();
    setDoc(doc(db, 'siso_imports', importRecord.id), importRecord).catch((e) =>
      console.warn('Firestore siso_imports sync failed:', e)
    );

    this.auditLogs.unshift({
      id: 'log-' + Date.now(),
      action: 'IMPORTACION_SISO',
      reason: `Importación CSV "${fileName}": ${created} nuevos, ${updated} actualizados de ${detected} detectados.`,
      usuario: usuarioEmail,
      timestamp: new Date().toISOString(),
    });
    this.saveAuditLogs();

    return {
      success: true,
      detected,
      created,
      updated,
      errors,
      importId,
    };
  }

  // LICENSE TYPES CONFIG (Section 9, 21)
  public getLicenseTypes(): Promise<LicenseType[]> {
    return Promise.resolve(this.licenseTypes.filter((lt) => lt.active !== false));
  }

  public getAllLicenseTypes(): LicenseType[] {
    return this.licenseTypes;
  }

  public updateLicenseType(id: string, updates: Partial<LicenseType>): LicenseType {
    const index = this.licenseTypes.findIndex((lt) => lt.id === id);
    if (index === -1) throw new Error('Tipo de licencia no encontrado.');

    this.licenseTypes[index] = {
      ...this.licenseTypes[index],
      ...updates,
    };
    this.saveLicenseTypes();
    return this.licenseTypes[index];
  }

  public createLicenseType(data: Omit<LicenseType, 'id'>): LicenseType {
    const id = 'art-' + data.code.toLowerCase().replace(/[^a-z0-9]/g, '');
    const newType: LicenseType = {
      ...data,
      id,
      active: true,
    };
    this.licenseTypes.push(newType);
    this.saveLicenseTypes();
    return newType;
  }

  /**
   * Importa tipos de licencias desde texto CSV con las columnas:
   * licencia,dias_totales,tipo_dias,activa,dias_mensuales
   */
  public importLicenseTypesFromCSV(csvText: string): { total: number; added: number; updated: number } {
    const lines = csvText.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) throw new Error('El archivo CSV no contiene filas de datos.');

    let added = 0;
    let updated = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      let parts: string[] = [];
      let cur = '';
      let inQ = false;
      for (let c of line) {
        if (c === '"') inQ = !inQ;
        else if (c === ',' && !inQ) {
          parts.push(cur.trim());
          cur = '';
        } else {
          cur += c;
        }
      }
      parts.push(cur.trim());
      if (parts.length < 4) continue;

      const [licencia, dias_totales_str, tipo_dias, activa_str, dias_mensuales_str] = parts;
      const dias_totales = parseInt(dias_totales_str, 10) || 1;
      const dias_mensuales = parseInt(dias_mensuales_str || dias_totales_str, 10) || dias_totales;
      const activa = activa_str ? activa_str.toUpperCase() === 'SI' : true;
      const tipoDiasNorm: 'habiles' | 'continuos' = tipo_dias && tipo_dias.toLowerCase().includes('contin') ? 'continuos' : 'habiles';

      const existingIndex = this.licenseTypes.findIndex(
        (lt) => lt.name.trim().toLowerCase() === licencia.trim().toLowerCase()
      );

      const desc = `Régimen: ${dias_totales} días ${tipoDiasNorm} anuales (máx. ${dias_mensuales} días por mes).`;

      if (existingIndex !== -1) {
        this.licenseTypes[existingIndex] = {
          ...this.licenseTypes[existingIndex],
          name: licencia,
          diasTotales: dias_totales,
          diasMensuales: dias_mensuales,
          maxDaysPerYear: dias_totales,
          maxConsecutiveDays: dias_mensuales,
          tipoDias: tipoDiasNorm,
          active: activa,
          description: desc,
        };
        updated++;
      } else {
        const id = 'lic-csv-' + (this.licenseTypes.length + 1);
        const code = 'LIC-' + (this.licenseTypes.length + 1);
        this.licenseTypes.push({
          id,
          code,
          name: licencia,
          category: dias_totales >= 30 ? 'Larga duración' : 'Corta duración',
          sinLimite: dias_totales >= 365,
          maxDaysPerYear: dias_totales,
          diasTotales: dias_totales,
          diasMensuales: dias_mensuales,
          tipoDias: tipoDiasNorm,
          maxConsecutiveDays: dias_mensuales,
          requiresJustification: true,
          requiresObligations: dias_totales > 5,
          description: desc,
          active: activa,
          csvIndex: this.licenseTypes.length + 1,
        });
        added++;
      }
    }

    this.saveLicenseTypes();
    return { total: lines.length - 1, added, updated };
  }

  public resetLicenseTypesToCSVDefault(): LicenseType[] {
    this.licenseTypes = [...INITIAL_LICENSE_TYPES];
    this.saveLicenseTypes();
    return this.licenseTypes;
  }

  // WEEKLY ABSENCES & LONG LICENSES (Section 33 - 39)
  public getWeeklyAbsences(monday: Date): WeeklyAbsenceRow[] {
    const mondayStr = formatYMD(monday);
    const friDate = new Date(monday);
    friDate.setDate(monday.getDate() + 4);
    const fridayStr = formatYMD(friDate);

    const weekDays: { dateStr: string; key: 'lun' | 'mar' | 'mie' | 'jue' | 'vie' }[] = [
      { dateStr: formatYMD(monday), key: 'lun' },
      { dateStr: formatYMD(new Date(monday.getTime() + 86400000 * 1)), key: 'mar' },
      { dateStr: formatYMD(new Date(monday.getTime() + 86400000 * 2)), key: 'mie' },
      { dateStr: formatYMD(new Date(monday.getTime() + 86400000 * 3)), key: 'jue' },
      { dateStr: formatYMD(new Date(monday.getTime() + 86400000 * 4)), key: 'vie' },
    ];

    const effectiveStatuses: LicenseStatus[] = ['Autorizada', 'Justificada', 'Completada', 'Descuento'];

    // 1. Solicitudes
    const activeRequests = this.requests.filter((r) => {
      if (!effectiveStatuses.includes(r.status)) return false;
      return !(r.dateTo < mondayStr || r.dateFrom > fridayStr);
    });

    // 2. SISO Licenses
    const activeSiso = this.sisoLicenses.filter((s) => {
      return !(s.hasta < mondayStr || s.desde > fridayStr);
    });

    const rows: WeeklyAbsenceRow[] = [];
    const seenKeys = new Set<string>();

    // Add Requests
    for (const r of activeRequests) {
      const dedupKey = `${r.employeeNumber}_${r.dateFrom}_${r.dateTo}`;
      if (seenKeys.has(dedupKey)) continue;
      seenKeys.add(dedupKey);

      const days = { lun: false, mar: false, mie: false, jue: false, vie: false };
      for (const wDay of weekDays) {
        if (wDay.dateStr >= r.dateFrom && wDay.dateStr <= r.dateTo) {
          days[wDay.key] = true;
        }
      }

      rows.push({
        uniqueKey: r.id,
        agentName: r.agentName,
        employeeNumber: r.employeeNumber,
        cargoCursoSiso: r.source === 'SISO' ? `[SISO] ${r.postDescription}` : r.postDescription,
        source: r.source,
        licenseType: `${r.licenseTypeCode} - ${r.licenseTypeName}`,
        dateFrom: r.dateFrom,
        dateTo: r.dateTo,
        status: r.status,
        days,
      });
    }

    // Add SISO
    for (const s of activeSiso) {
      const dedupKey = `${s.nroEmpleado}_${s.desde}_${s.hasta}`;
      if (seenKeys.has(dedupKey)) continue;
      seenKeys.add(dedupKey);

      const days = { lun: false, mar: false, mie: false, jue: false, vie: false };
      for (const wDay of weekDays) {
        if (wDay.dateStr >= s.desde && wDay.dateStr <= s.hasta) {
          days[wDay.key] = true;
        }
      }

      rows.push({
        uniqueKey: s.id,
        agentName: s.nombre,
        employeeNumber: s.nroEmpleado,
        cargoCursoSiso: `[SISO] ${s.establecimientosOSector || 'Personal CPEM'} (${s.tipo})`,
        source: 'SISO',
        licenseType: `${s.codLicencia} - ${s.tipo}`,
        dateFrom: s.desde,
        dateTo: s.hasta,
        status: 'Justificada',
        days,
      });
    }

    return rows.sort((a, b) => a.agentName.localeCompare(b.agentName));
  }

  public getLongLicenses(): LongLicenseItem[] {
    const items: LongLicenseItem[] = [];

    // From requests
    for (const r of this.requests) {
      if (r.status === 'Eliminada' || r.status === 'Rechazada') continue;
      const totalDays = calculateDaysBetween(r.dateFrom, r.dateTo);
      if (totalDays > 15) {
        let cargo = r.postDescription;
        let curso = 'Institucional';
        if (r.postDescription.includes('-')) {
          const parts = r.postDescription.split('-');
          cargo = parts[0].trim();
          curso = parts.slice(1).join('-').trim();
        }

        items.push({
          id: r.id,
          agentName: r.agentName,
          employeeNumber: r.employeeNumber,
          cargo,
          curso,
          licenseType: `${r.licenseTypeCode} - ${r.licenseTypeName}`,
          dateFrom: r.dateFrom,
          dateTo: r.dateTo,
          totalDays,
          source: r.source,
          status: r.status,
        });
      }
    }

    // From SISO
    for (const s of this.sisoLicenses) {
      const totalDays = calculateDaysBetween(s.desde, s.hasta);
      if (totalDays > 15) {
        items.push({
          id: s.id,
          agentName: s.nombre,
          employeeNumber: s.nroEmpleado,
          cargo: s.establecimientosOSector || 'Docente / Cargo',
          curso: s.carga || 'Institucional',
          licenseType: `${s.codLicencia} - ${s.tipo}`,
          dateFrom: s.desde,
          dateTo: s.hasta,
          totalDays,
          source: 'SISO',
          status: 'Justificada',
        });
      }
    }

    return items;
  }

  // Dashboard Metrics
  public getDashboardMetrics() {
    const today = formatYMD(new Date());
    const agents = this.getAgents();
    const activeAgents = agents.filter((a) => a.activo).length;
    const activeCargos = this.cargos.filter((c) => c.activo).length;
    
    const pendingRequests = this.requests.filter((r) => r.status === 'Pendiente').length;

    // Licencias vigentes hoy (SISO + Requests)
    const activeLicensesToday = 
      this.requests.filter((r) => ['Autorizada', 'Justificada', 'Completada', 'Descuento'].includes(r.status) && r.dateFrom <= today && r.dateTo >= today).length +
      this.sisoLicenses.filter((s) => s.desde <= today && s.hasta >= today).length;

    const longLicensesCount = this.getLongLicenses().length;

    return {
      activeAgents,
      activeCargos,
      pendingRequests,
      activeLicensesToday,
      longLicensesCount,
      totalSisoLicenses: this.sisoLicenses.length,
      totalRequests: this.requests.length,
    };
  }
}

export const dataService = new DataService();
