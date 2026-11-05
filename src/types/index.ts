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
  cargo_id?: number;
  secuencia: string;    // ej. "220" o "SEC-101"
  turno: 'Mañana' | 'Tarde' | 'Vespertino' | 'Noche' | 'Central' | 'Extendido' | 'Intermedio';
  turno_codigo?: string;
  curso: string;        // ej. "1°", "2°", "3°"
  curso_raw?: string;
  seccion: string;      // ej. "Div. A", "1°", "Única"
  seccion_raw?: string;
  descripcion: string;  // ej. "Artes Visuales", "Biología"
  obligaciones?: string;
  area: string;
  area_id?: number | null;
  horarios: Horario[];
  tieneArticulacion: boolean;
  tiene_art?: boolean;
  horarioArticulacion?: Horario;
  activo: boolean;
  ordenVisual?: number; // Para ordenar y mover filas en el listado
  orden_visual?: number;
  csvIndex?: number;    // Índice de orden original en el CSV
  createdAt?: string;
  created_at?: string;
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
  puesto_id?: number;
  cargoId: string;
  cargo_id?: number;
  descripcion?: string;
  agentesAsignados: PuestoAgenteAsignado[];
  activo: boolean;
  csvIndex?: number;
  createdAt?: string;
  created_at?: string;
}

export interface PuestoCargo {
  puestos_cargos_id: number;
  puesto_id: number;
  agente_id: number;
  orden: number;
  sit_revista: string;
  fecha_alta?: string;
  activo: boolean;
  detalle?: string;
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
  agente_id?: number;
  apellido?: string;
  apellidos: string;
  nombre?: string;
  nombres: string;
  fullName: string;
  employeeNumber: string;
  legajo?: number | string;
  dni: string;
  dni_number?: number;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  fecha_nac?: string;
  lugarNacimiento: string;
  lugar_nacimiento?: string;
  domicilio?: string;
  titulo?: string;
  activo: boolean;
  hasAssignedPost: boolean;
  posts?: AssignedPost[];
  createdAt?: string;
  created_at?: string;
}

export interface LicenseType {
  id: string;
  tipo_licencia_id?: number;
  code: string;
  codigo?: string;
  name: string;
  nombre?: string;
  category: 'Corta duración' | 'Larga duración' | 'Especial' | string;
  categoria?: string;
  sinLimite?: boolean;
  sin_limite?: boolean;
  maxDaysPerYear?: number | null;
  max_dias_anio?: number | null;
  diasTotales?: number | null;
  diasMensuales?: number | null;
  tipoDias?: 'habiles' | 'continuos';
  maxConsecutiveDays?: number | null;
  max_dias_seguidos?: number | null;
  maxUsagePerYear?: number | null;
  relacionadoConObligaciones?: boolean;
  requiresJustification: boolean;
  requiere_justificacion?: boolean;
  justificationHelpText?: string;
  requiresObligations: boolean;
  requiere_obligaciones?: boolean;
  obligationsHelpText?: string;
  description: string;
  descripccion?: string;
  active: boolean;
  activo?: boolean;
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
  siso_id?: number | string;
  id: string;
  nro_empleado?: string | number;
  nroEmpleado: string;
  dni: string;
  nombre: string;
  email: string;
  tipo: string;
  carga: string;
  fecha_desde?: string;
  fecha_hasta?: string;
  desde: string;
  hasta: string;
  dias: number | string;
  justifica: string;
  cod_licencia?: string | number;
  codLicencia: string;
  fecha_alta?: string;
  fechaAlta?: string;
  auditor?: string;
  patologia?: string;
  fecha_auditoria?: string;
  fechaAuditoria?: string;
  medico_interviniente?: string;
  medicoInterviniente?: string;
  matricula_medico_interviniente?: string;
  matriculaMedicoInterviniente?: string;
  establecimientos_o_sector?: string;
  establecimientosOSector?: string;
  fechaImportacion?: string;
  importId?: string;
  created_at?: string;
}

export interface SisoImportHistory {
  id: string;
  fecha: string;
  nombreArchivo: string;
  cantidadDetectados: number;
  registrosNuevos: number;
  registrosActualizados: number;
  usuario: string;
  errores?: string[];
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
