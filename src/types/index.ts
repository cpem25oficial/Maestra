export type UserRole = 'superadmin' | 'admin' | 'visitante';

export interface SystemUser {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  lastLogin?: string;
}

export type LicenseStatus = 
  | 'Pendiente'
  | 'Autorizada'
  | 'Justificada'
  | 'Completada'
  | 'Rechazada'
  | 'Injustificada'
  | 'Descuento'
  | 'Eliminada';

export type DiaSemana = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';

export interface Horario {
  id: string;
  dia: DiaSemana;
  horaIngreso: string; // HH:mm
  horaSalida: string;  // HH:mm
  esRecurrente?: boolean;
}

export interface Cargo {
  id: string;
  secuencia: string;    // ej. "220" o "SEC-101"
  turno: 'Mañana' | 'Tarde' | 'Vespertino' | 'Noche' | 'Central' | 'Extendido' | 'Intermedio';
  curso: string;        // ej. "1°", "2°", "3°"
  seccion: string;      // ej. "Div. A", "1°", "Única"
  descripcion: string;  // ej. "Artes Visuales", "Biología"
  obligaciones?: string;
  area: string;
  horarios: Horario[];
  tieneArticulacion: boolean;
  horarioArticulacion?: Horario;
  activo: boolean;
  ordenVisual?: number; // Para ordenar y mover filas en el listado
  csvIndex?: number;    // Índice de orden original en el CSV
  createdAt?: string;
}

export interface PuestoAgenteAsignado {
  agenteId: string;
  orden: number; // 1, 2, 3...
  fechaAsignacion: string;
  situacionRevista?: 'Titular' | 'Interino' | 'Suplente';
  observacion?: string;
  notaEspecial?: string; // ej. "ASAMBLEA", "SP", "CESAR DE PLANTA"
}

export interface Puesto {
  id: string;
  cargoId: string;
  descripcion?: string;
  agentesAsignados: PuestoAgenteAsignado[];
  activo: boolean;
  csvIndex?: number;
  createdAt?: string;
}

export interface AssignedPost {
  id: string;
  cargo: string;
  curso: string;
  situacionRevista: 'Titular' | 'Interino' | 'Suplente';
  assigned: boolean;
  materia?: string;
}

export interface Agent {
  id: string;
  apellidos: string;
  nombres: string;
  fullName: string;
  employeeNumber: string;
  dni: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  activo: boolean;
  hasAssignedPost: boolean;
  posts?: AssignedPost[];
  createdAt?: string;
}

export interface LicenseType {
  id: string;
  code: string;
  name: string;
  category: 'Corta duración' | 'Larga duración' | 'Especial';
  sinLimite?: boolean;
  maxDaysPerYear?: number;
  diasTotales?: number;
  diasMensuales?: number;
  tipoDias?: 'habiles' | 'continuos';
  maxConsecutiveDays?: number;
  maxUsagePerYear?: number;
  relacionadoConObligaciones?: boolean;
  requiresJustification: boolean;
  justificationHelpText?: string;
  requiresObligations: boolean;
  obligationsHelpText?: string;
  description: string;
  active: boolean;
  csvIndex?: number;
}

export interface HistorialEstadoSolicitud {
  id: string;
  estadoAnterior: LicenseStatus;
  estadoNuevo: LicenseStatus;
  fecha: string;
  usuario: string;
  detalle: string;
}

export interface LicenseRequest {
  id: string;
  employeeNumber: string;
  agentName: string;
  agentDni: string;
  postsSelection: 'ALL' | string;
  postDescription: string;
  dateFrom: string;
  dateTo: string;
  isArticulation: boolean;
  licenseTypeId: string;
  licenseTypeCode: string;
  licenseTypeName: string;
  note?: string;
  detail?: string;
  justificationName?: string;
  justificationDataUrl?: string;
  cantidadObligaciones?: number;
  obligaciones?: string;
  obligations?: string; // Support both aliases
  signatureDataUrl: string;
  signatureDriveUrl?: string;
  signatureDriveFileId?: string;
  justificationDriveUrl?: string;
  justificationDriveFileId?: string;
  status: LicenseStatus;
  createdAt: string;
  source: 'Solicitud' | 'SISO';
  sisoId?: string;
  deletedAt?: string;
  historialEstados?: HistorialEstadoSolicitud[];
}

export interface SisoLicense {
  id: string;
  nroEmpleado: string;
  dni: string;
  nombre: string;
  email: string;
  tipo: string;
  carga: string;
  desde: string;
  hasta: string;
  dias: number;
  justifica: string;
  codLicencia: string;
  fechaAlta: string;
  auditor?: string;
  patologia?: string;
  fechaAuditoria?: string;
  medicoInterviniente?: string;
  matriculaMedicoInterviniente?: string;
  establecimientosOSector?: string;
  fechaImportacion: string;
  importId: string;
}

export interface SisoImportHistory {
  id: string;
  fecha: string;
  nombreArchivo: string;
  cantidadDetectados: number;
  registrosNuevos: number;
  registrosActualizados: number;
  usuario: string;
  errores: string[];
}

export interface AuditLog {
  id: string;
  action: 'CREACION_SOLICITUD' | 'ELIMINACION_SOLICITUD' | 'CAMBIO_ESTADO' | 'MODIFICACION_MASIVA' | 'IMPORTACION_SISO' | 'ELIMINACION_ADJUNTO';
  targetRequestId?: string;
  employeeNumber?: string;
  agentName?: string;
  reason: string;
  timestamp: string;
  usuario?: string;
}

export interface WeeklyAbsenceRow {
  uniqueKey: string;
  agentName: string;
  employeeNumber: string;
  cargoCursoSiso: string;
  source: 'SISO' | 'Solicitud';
  licenseType: string;
  dateFrom: string;
  dateTo: string;
  status: LicenseStatus;
  days: {
    lun: boolean;
    mar: boolean;
    mie: boolean;
    jue: boolean;
    vie: boolean;
  };
}

export interface LongLicenseItem {
  id: string;
  agentName: string;
  employeeNumber: string;
  cargo: string;
  curso: string;
  licenseType: string;
  dateFrom: string;
  dateTo: string;
  totalDays: number;
  source: 'SISO' | 'Solicitud';
  status: LicenseStatus;
}
