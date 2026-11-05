import React, { useState, useEffect } from 'react';
import { 
  FolderClock, 
  Search, 
  Trash2, 
  AlertCircle, 
  Calendar, 
  FileText, 
  Paperclip, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Info,
  X,
  FileCheck,
  Ban,
  ArrowRight,
  Cloud,
  ExternalLink,
  Activity,
  FileSpreadsheet
} from 'lucide-react';
import { LicenseRequest, LicenseStatus, Agent, SisoLicense } from '../types';
import { dataService, calculateDaysBetween, formatDMY } from '../services/dataService';
import { 
  processFileForUpload, 
  uploadFileToDrive, 
  FOLDER_CONSTANCIAS_ID,
  ensureGoogleDriveToken,
  connectGoogleAdminDrive,
  GOOGLE_DRIVE_ACCOUNT_EMAIL,
  getDriveThumbnailUrl,
  getDriveDownloadUrl
} from '../services/googleDriveService';

interface MisSolicitudesProps {
  initialEmployeeNumber?: string;
  onGoToSolicitar: (employeeNumber: string) => void;
}

export const MisSolicitudes: React.FC<MisSolicitudesProps> = ({
  initialEmployeeNumber = '',
  onGoToSolicitar,
}) => {
  const [employeeInput, setEmployeeInput] = useState(initialEmployeeNumber);
  const [activeEmployeeNumber, setActiveEmployeeNumber] = useState<string | null>(
    initialEmployeeNumber ? initialEmployeeNumber : null
  );
  const [agentInfo, setAgentInfo] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [requests, setRequests] = useState<LicenseRequest[]>([]);
  const [sisoLicenses, setSisoLicenses] = useState<SisoLicense[]>([]);
  const [consultTab, setConsultTab] = useState<'internas' | 'siso'>('internas');

  // Filter state
  const [statusFilter, setStatusFilter] = useState<'TODOS' | LicenseStatus>('TODOS');

  // Deletion Modal state (Section 31)
  const [requestToDelete, setRequestToDelete] = useState<LicenseRequest | null>(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState<string | null>(null);

  // Justification Modal state (Para adjuntar comprobante a licencia autorizada)
  const [requestToJustify, setRequestToJustify] = useState<LicenseRequest | null>(null);
  const [justifyFile, setJustifyFile] = useState<{ name: string; size: string; dataUrl: string } | null>(null);
  const [justifyObservacion, setJustifyObservacion] = useState('');
  const [isSubmittingJustify, setIsSubmittingJustify] = useState(false);
  const [justifyError, setJustifyError] = useState<string | null>(null);

  // Detail Modal
  const [selectedRequestDetail, setSelectedRequestDetail] = useState<LicenseRequest | null>(null);

  const handleOpenJustifyModal = (req: LicenseRequest) => {
    setRequestToJustify(req);
    setJustifyFile(null);
    setJustifyObservacion('');
    setJustifyError(null);
  };

  const handleJustifyFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setJustifyError('El archivo excede el tamaño máximo permitido de 15MB.');
      return;
    }

    try {
      // Si son fotos: Comprime con Canvas a max 1000px y 0.98 de calidad. Si es PDF: normal.
      const processed = await processFileForUpload(file);
      const approxKb = Math.round((processed.dataUrl.length * 3) / 4 / 1024);
      setJustifyFile({
        name: processed.name,
        size: `${approxKb} KB${processed.isCompressed ? ' (Optimizado a 1000px)' : ''}`,
        dataUrl: processed.dataUrl,
      });
      setJustifyError(null);
    } catch (err: any) {
      setJustifyError('Error al procesar el archivo. Intente con otra imagen o PDF.');
    }
  };

  // Google Drive upload state
  const [uploadProgressText, setUploadProgressText] = useState<string | null>(null);

  const handleSubmitJustification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestToJustify || !activeEmployeeNumber) return;

    if (!justifyFile) {
      setJustifyError('Debe seleccionar un archivo o certificado para justificar la licencia.');
      return;
    }

    setIsSubmittingJustify(true);
    setJustifyError(null);
    setUploadProgressText('Procesando comprobante...');

    try {
      // 1. Subir directamente a la carpeta de Constancias de Google Drive (1WXKwj...) si está conectado
      setUploadProgressText(`Guardando "${justifyFile.name}" en Google Drive...`);
      const driveFileName = `${requestToJustify.agentDni || activeEmployeeNumber}_${requestToJustify.id}_${justifyFile.name}`;
      let driveRes = null;
      try {
        driveRes = await uploadFileToDrive({
          name: driveFileName,
          dataUrl: justifyFile.dataUrl,
          folderId: FOLDER_CONSTANCIAS_ID,
        });
      } catch (uploadErr) {
        console.warn('Aviso al subir comprobante a Drive:', uploadErr);
      }

      // 2. Guardar en base de datos con enlace directo a Google Drive
      setUploadProgressText('Actualizando registro de la solicitud...');
      await dataService.justifyAuthorizedRequest(
        requestToJustify.id,
        activeEmployeeNumber,
        {
          name: justifyFile.name,
          size: justifyFile.size,
          dataUrl: driveRes?.webViewLink || justifyFile.dataUrl,
          driveUrl: driveRes?.webViewLink,
          driveFileId: driveRes?.fileId,
        },
        justifyObservacion
      );

      setDeleteSuccessMsg(`¡Licencia ${requestToJustify.id} justificada con éxito! El comprobante fue resguardado correctamente.`);
      setRequestToJustify(null);
      await loadRequests(activeEmployeeNumber);
    } catch (err: any) {
      console.error('Error justificando comprobante:', err);
      setJustifyError(err.message || 'Error al guardar la justificación.');
    } finally {
      setIsSubmittingJustify(false);
      setUploadProgressText(null);
    }
  };

  useEffect(() => {
    if (activeEmployeeNumber) {
      loadRequests(activeEmployeeNumber);
    }
  }, [activeEmployeeNumber]);

  const loadRequests = async (queryNum: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const agent = await dataService.verifyAgent(queryNum);
      if (!agent) {
        setErrorMessage('No se encontró ningún agente con el número de legajo o DNI ingresado.');
        setRequests([]);
        setSisoLicenses([]);
        setAgentInfo(null);
        return;
      }

      setAgentInfo(agent);
      const list = await dataService.getRequestsByEmployee(agent.employeeNumber);
      setRequests(list);

      // Consulta aislada de licencias de SISO exclusivamente por DNI o legajo
      const sisoList = dataService.getSisoLicensesByAgent({
        dni: agent.dni,
        nroEmpleado: agent.employeeNumber
      });
      setSisoLicenses(sisoList);
    } catch (e) {
      setErrorMessage('Error al consultar las solicitudes. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeInput.trim()) {
      setErrorMessage('Por favor ingrese su número de legajo o DNI.');
      return;
    }
    setActiveEmployeeNumber(employeeInput.trim());
  };

  const handleClearAgent = () => {
    setActiveEmployeeNumber(null);
    setEmployeeInput('');
    setRequests([]);
    setSisoLicenses([]);
    setAgentInfo(null);
    setErrorMessage(null);
    setDeleteSuccessMsg(null);
  };

  // Status Badge Helper
  const getStatusBadge = (status: LicenseStatus) => {
    switch (status) {
      case 'Pendiente':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            Pendiente
          </span>
        );
      case 'Autorizada':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            Autorizada
          </span>
        );
      case 'Justificada':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            <FileCheck className="w-3 h-3 text-emerald-600" />
            Justificada
          </span>
        );
      case 'Completada':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
            <CheckCircle2 className="w-3 h-3 text-slate-600" />
            Completada
          </span>
        );
      case 'Rechazada':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
            <XCircle className="w-3 h-3 text-red-600" />
            Rechazada
          </span>
        );
      case 'Injustificada':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
            <AlertCircle className="w-3 h-3 text-orange-600" />
            Injustificada
          </span>
        );
      case 'Descuento':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
            <Ban className="w-3 h-3 text-purple-600" />
            Descuento
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">
            {status}
          </span>
        );
    }
  };

  // Section 31: Deletion validation
  // "El agente podrá eliminar una solicitud solamente cuando su estado sea: Pendiente o Rechazada"
  // "No permitir eliminar solicitudes que se encuentren en: Autorizada, Justificada, Completada, Injustificada, Descuento"
  const canDeleteRequest = (status: LicenseStatus): boolean => {
    return status === 'Pendiente' || status === 'Rechazada';
  };

  const openDeleteModal = (req: LicenseRequest) => {
    if (!canDeleteRequest(req.status)) {
      alert(`No es posible eliminar una solicitud en estado "${req.status}". Únicamente pueden eliminarse solicitudes en estado Pendiente o Rechazada.`);
      return;
    }
    setRequestToDelete(req);
    setDeleteReason('');
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    if (!requestToDelete || !activeEmployeeNumber) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await dataService.deleteLicenseRequest(
        requestToDelete.id,
        activeEmployeeNumber,
        deleteReason || 'Eliminada a solicitud del agente desde el portal'
      );

      setDeleteSuccessMsg(`La solicitud ${requestToDelete.id} ha sido eliminada correctamente.`);
      setRequestToDelete(null);
      // Reload requests
      await loadRequests(activeEmployeeNumber);
    } catch (err: any) {
      setDeleteError(err.message || 'Error al eliminar la solicitud.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredRequests = requests.filter((r) => {
    if (statusFilter === 'TODOS') return true;
    return r.status === statusFilter;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FolderClock className="w-6 h-6 text-blue-600" />
            Mis Solicitudes
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Consulte el historial y estado de tramitación de sus licencias presentadas.
          </p>
        </div>

        {activeEmployeeNumber && (
          <button
            onClick={() => onGoToSolicitar(activeEmployeeNumber)}
            className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors shrink-0"
          >
            <span>+ Nueva Solicitud</span>
          </button>
        )}
      </div>

      {/* Access Gate: Enter Employee Number (Section 30) */}
      {!activeEmployeeNumber ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Consulta de Licencias y Trámites
            </h2>
            <p className="text-xs text-slate-500">
              Ingrese su número de legajo o su número de DNI para consultar sus solicitudes del colegio y auditorías de SISO.
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="empNumberSearch" className="block text-sm font-semibold text-slate-800 mb-1">
                Número de legajo o DNI <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="empNumberSearch"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ej: Legajo 1042 o DNI 35123456"
                  value={employeeInput}
                  onChange={(e) => {
                    setEmployeeInput(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full pl-4 pr-11 py-3 text-base rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-mono"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isLoading || !employeeInput.trim()}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors"
                >
                  {isLoading ? (
                    <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Search className="w-3.5 h-3.5" />
                      <span>Ingresar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      ) : (
        /* Agent Verified: Requests View */
        <div className="space-y-6">
          {/* Active Agent Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                {agentInfo?.fullName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                  {agentInfo?.fullName}
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  Legajo: <strong>{activeEmployeeNumber}</strong> • DNI: {agentInfo?.dni}
                </span>
              </div>
            </div>

            <button
              onClick={handleClearAgent}
              className="text-xs text-slate-500 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 rounded-lg px-2.5 py-1 transition-colors"
            >
              Cambiar legajo
            </button>
          </div>

          {/* Success banner if deleted */}
          {deleteSuccessMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-xl flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                {deleteSuccessMsg}
              </span>
              <button onClick={() => setDeleteSuccessMsg(null)} className="text-emerald-600 hover:text-emerald-800">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Sub-tabs: Solicitudes del Colegio vs Auditorías Médicas SISO */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setConsultTab('internas')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                consultTab === 'internas'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Solicitudes del Colegio ({requests.length})</span>
            </button>
            <button
              onClick={() => setConsultTab('siso')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                consultTab === 'siso'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Auditorías Médicas SISO ({sisoLicenses.length})</span>
            </button>
          </div>

          {consultTab === 'internas' ? (
            <>
              {/* Filters Bar */}
              <div className="flex flex-wrap items-center gap-2 pb-1">
                <span className="text-xs font-semibold text-slate-500 mr-1">Filtrar estado:</span>
                {(['TODOS', 'Pendiente', 'Autorizada', 'Justificada', 'Completada', 'Rechazada'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      statusFilter === st
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

          {/* Requests Content (Section 30: Tarjetas / Tabla Responsive) */}
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <FolderClock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                No se encontraron solicitudes
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                {statusFilter === 'TODOS'
                  ? 'Usted no posee solicitudes de licencia registradas en el sistema todavía.'
                  : `No se encontraron solicitudes con estado "${statusFilter}".`}
              </p>
              <button
                onClick={() => onGoToSolicitar(activeEmployeeNumber)}
                className="mt-2 inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
              >
                <span>Solicitar una licencia</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredRequests.map((req) => {
                const totalDays = calculateDaysBetween(req.dateFrom, req.dateTo);
                const isDeletable = canDeleteRequest(req.status);

                return (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all p-4 sm:p-5 space-y-4"
                  >
                    {/* Top Row: Date of Request, License Type, Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm sm:text-base text-slate-900">
                            {req.licenseTypeCode} - {req.licenseTypeName}
                          </span>
                          {req.source === 'SISO' && (
                            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded">
                              SISO
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                          <span>Solicitud N°: {req.id}</span>
                          <span>•</span>
                          <span>Presentada el {formatDMY(req.createdAt)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusBadge(req.status)}
                      </div>
                    </div>

                    {/* Middle: Details & Fields (Section 30) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-1.5">
                          <span className="text-slate-500 font-medium shrink-0">Puesto:</span>
                          <span className="font-semibold text-slate-800">{req.postDescription}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-500 font-medium">Período:</span>
                          <span className="font-medium text-slate-800">
                            Del <strong className="text-slate-900">{formatDMY(req.dateFrom)}</strong> al{' '}
                            <strong className="text-slate-900">{formatDMY(req.dateTo)}</strong> ({totalDays} día{totalDays > 1 ? 's' : ''})
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 sm:text-right">
                        <div className="flex sm:justify-end items-center gap-1.5">
                          <span className="text-slate-500 font-medium">¿Es articulación?:</span>
                          <span className={`font-semibold ${req.isArticulation ? 'text-indigo-600 font-bold' : 'text-slate-700'}`}>
                            {req.isArticulation ? 'Sí' : 'No'}
                          </span>
                        </div>
                        {req.justificationName && (
                          <div className="flex sm:justify-end items-center gap-1.5 text-emerald-700">
                            <Paperclip className="w-3.5 h-3.5" />
                            <span className="font-medium truncate max-w-[200px]" title={req.justificationName}>
                              {req.justificationName}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Obligations */}
                    {req.obligations && (
                      <div className="flex items-center gap-1.5 text-xs text-indigo-900 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2">
                        <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span><strong>Obligaciones que afectan:</strong> {req.obligations}</span>
                      </div>
                    )}

                    {/* Note / Detail */}
                    {(req.note || req.detail) && (
                      <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 space-y-1 border border-slate-100">
                        {req.note && (
                          <p>
                            <strong className="text-slate-700">Nota:</strong> {req.note}
                          </p>
                        )}
                        {req.detail && (
                          <p>
                            <strong className="text-slate-700">Motivo:</strong> {req.detail}
                          </p>
                        )}
                      </div>
                    )}

                    {/* CALLOUT: If Autorizada, the agent must justify it with an attachment */}
                    {req.status === 'Autorizada' && (
                      <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                        <div className="text-xs text-amber-950 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-amber-900">Licencia Autorizada por Administración</span>
                            <p className="text-[11px] text-amber-800 mt-0.5">
                              Su solicitud fue autorizada. Debe justificarla adjuntando el comprobante o certificado correspondiente.
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleOpenJustifyModal(req)}
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all shrink-0 hover:scale-[1.02]"
                        >
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>Justificar Licencia (Subir Adjunto)</span>
                        </button>
                      </div>
                    )}

                    {/* If Justificada, show success chip and download */}
                    {req.status === 'Justificada' && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-900">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            <strong>Licencia Justificada:</strong> Comprobante adjunto ({req.justificationName || 'Certificado presentado'}).
                          </span>
                        </div>
                        {req.justificationDataUrl && (
                          <a
                            href={req.justificationDataUrl}
                            download={req.justificationName || 'comprobante.pdf'}
                            className="text-emerald-700 hover:text-emerald-950 font-bold underline text-[11px] flex items-center gap-1"
                          >
                            <Paperclip className="w-3 h-3" />
                            <span>Descargar adjunto</span>
                          </a>
                        )}
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <button
                        onClick={() => setSelectedRequestDetail(req)}
                        className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2 flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Ver comprobante completo</span>
                      </button>

                      {/* Section 31: Deletion button only when Pendiente or Rechazada */}
                      {isDeletable ? (
                        <button
                          type="button"
                          onClick={() => openDeleteModal(req)}
                          className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-semibold px-2.5 py-1 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                          title="Eliminar esta solicitud"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Eliminar solicitud</span>
                        </button>
                      ) : (
                        <span 
                          className="text-[11px] text-slate-400 italic flex items-center gap-1"
                          title="Solo se pueden eliminar solicitudes en estado Pendiente o Rechazada"
                        >
                          <Info className="w-3 h-3" />
                          <span>No eliminable ({req.status})</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        /* Contenido de SISO (Auditoría Médica Oficial) */
        <div className="space-y-4">
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-center justify-between">
            <div>
              <span className="font-bold">Licencias Médicas Registradas en SISO</span>
              <span className="block text-[11px] text-emerald-800 mt-0.5">
                Historial oficial de auditoría médica para Legajo: {agentInfo?.employeeNumber} · DNI: {agentInfo?.dni}
              </span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
              {sisoLicenses.length} registradas
            </span>
          </div>

          {sisoLicenses.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
              <Activity className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="font-bold text-sm text-slate-700">No se registran licencias en SISO</h4>
              <p className="text-xs text-slate-400">
                No constan auditorías médicas registradas en la plataforma provincial SISO para su legajo o DNI.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {sisoLicenses.map((s) => {
                const justificaStatus = (s.justifica || '').toUpperCase();
                const isJustificado = justificaStatus === 'JUSTIFICADO';
                const isInjustificado = justificaStatus === 'INJUSTIFICADO';

                return (
                  <div
                    key={s.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-emerald-200 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">
                            {s.tipo}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                            SISO #{s.id}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 font-semibold block mt-0.5">
                          {s.codLicencia || s.cod_licencia}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isJustificado
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : isInjustificado
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {isJustificado ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          ) : isInjustificado ? (
                            <XCircle className="w-3 h-3 text-rose-600" />
                          ) : (
                            <Clock className="w-3 h-3 text-amber-600" />
                          )}
                          <span>{s.justifica || 'SIN AUDITAR'}</span>
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 font-medium">Período:</span>{' '}
                        <span className="font-bold text-slate-800">
                          {s.desde || s.fecha_desde} al {s.hasta || s.fecha_hasta} ({s.dias} días)
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">Fecha de Carga:</span>{' '}
                        <span className="font-semibold text-slate-700">{s.carga}</span>
                      </div>

                      {s.medicoInterviniente && (
                        <div className="sm:col-span-2">
                          <span className="text-slate-400 font-medium">Médico:</span>{' '}
                          <span className="text-slate-700">
                            {s.medicoInterviniente} {s.matriculaMedicoInterviniente ? `(Mat: ${s.matriculaMedicoInterviniente})` : ''}
                          </span>
                        </div>
                      )}

                      {s.auditor && (
                        <div className="sm:col-span-2">
                          <span className="text-slate-400 font-medium">Auditor:</span>{' '}
                          <span className="text-slate-700">{s.auditor}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )}

      {/* CONFIRMATION DIALOG FOR DELETION (Section 31) */}
      {/* "Cuando el agente intente eliminar una solicitud permitida, solicitar confirmación.
          Ejemplo: ¿Está seguro de que desea eliminar esta solicitud? Esta acción no se puede deshacer." */}
      {requestToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-red-100 p-6 space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-slate-900">
                Eliminar Solicitud
              </h3>
              {/* Requirement 31 exact message */}
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                ¿Está seguro de que desea eliminar esta solicitud? Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 text-xs text-slate-600 border border-slate-200 space-y-1">
              <div>
                <strong>Solicitud:</strong> {requestToDelete.id}
              </div>
              <div>
                <strong>Licencia:</strong> {requestToDelete.licenseTypeCode} - {requestToDelete.licenseTypeName}
              </div>
              <div>
                <strong>Período:</strong> {formatDMY(requestToDelete.dateFrom)} al {formatDMY(requestToDelete.dateTo)}
              </div>
              <div>
                <strong>Estado actual:</strong> {requestToDelete.status}
              </div>
            </div>

            {deleteError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {deleteError}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRequestToDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                {isDeleting ? (
                  <span>Eliminando...</span>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Sí, eliminar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED VIEW MODAL */}
      {selectedRequestDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900">
                <FileCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-lg">Comprobante de Solicitud</h3>
              </div>
              <button
                onClick={() => setSelectedRequestDetail(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Estado:</span>
                {getStatusBadge(selectedRequestDetail.status)}
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">N° de Trámite:</span>
                <span className="font-mono font-bold text-slate-800">{selectedRequestDetail.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Docente / Agente:</span>
                <span className="font-semibold text-slate-800">{selectedRequestDetail.agentName} (Legajo {selectedRequestDetail.employeeNumber})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Puesto:</span>
                <span className="font-medium text-slate-800 text-right max-w-[60%]">{selectedRequestDetail.postDescription}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Licencia:</span>
                <span className="font-bold text-blue-700">{selectedRequestDetail.licenseTypeCode} - {selectedRequestDetail.licenseTypeName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Período:</span>
                <span className="font-semibold text-slate-800">{selectedRequestDetail.dateFrom} al {selectedRequestDetail.dateTo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Articulación:</span>
                <span className="font-semibold text-slate-800">{selectedRequestDetail.isArticulation ? 'SÍ' : 'NO'}</span>
              </div>
              {selectedRequestDetail.justificationName && (
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Adjunto:</span>
                  <span className="font-semibold text-emerald-700">{selectedRequestDetail.justificationName}</span>
                </div>
              )}
              {selectedRequestDetail.obligations && (
                <div className="py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium block">Obligaciones declaradas:</span>
                  <p className="text-slate-800 text-xs mt-0.5">{selectedRequestDetail.obligations}</p>
                </div>
              )}
              {selectedRequestDetail.detail && (
                <div className="py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium block">Detalle:</span>
                  <p className="text-slate-800 text-xs mt-0.5">{selectedRequestDetail.detail}</p>
                </div>
              )}

              {/* Digital Signature */}
              {selectedRequestDetail.signatureDataUrl && (
                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-700 block mb-1">Firma digital registrada:</span>
                  <div className="h-20 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center p-2">
                    <img src={selectedRequestDetail.signatureDataUrl} alt="Firma digital" className="max-h-full object-contain" />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedRequestDetail(null)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors"
              >
                Cerrar comprobante
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA JUSTIFICAR LICENCIA AUTORIZADA */}
      {requestToJustify && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Paperclip className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Justificar Licencia Autorizada
                  </h3>
                  <p className="text-xs text-slate-500">
                    Solicitud N° {requestToJustify.id}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRequestToJustify(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Resumen de la solicitud */}
            <div className="bg-slate-50 rounded-xl p-3.5 text-xs text-slate-700 space-y-1.5 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Licencia:</span>
                <strong className="text-blue-700">{requestToJustify.licenseTypeCode} - {requestToJustify.licenseTypeName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Período:</span>
                <span className="font-mono">{formatDMY(requestToJustify.dateFrom)} al {formatDMY(requestToJustify.dateTo)}</span>
              </div>
              {requestToJustify.obligations && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Obligaciones:</span>
                  <span className="font-medium text-slate-800">{requestToJustify.obligations}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmitJustification} className="space-y-4">
              {/* File upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Archivo o Certificado de Justificación <span className="text-red-500">*</span>
                </label>
                {justifyFile ? (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-bold text-emerald-950 truncate">{justifyFile.name}</span>
                      <span className="text-emerald-700 font-mono text-[11px]">({justifyFile.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setJustifyFile(null)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-xl p-5 text-center transition-colors">
                    <input
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleJustifyFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-1 pointer-events-none">
                      <Paperclip className="w-6 h-6 text-slate-400 mx-auto" />
                      <p className="text-xs font-medium text-slate-700">
                        Seleccionar certificado médico, constancia o comprobante
                      </p>
                      <p className="text-[11px] text-slate-400">
                        PDF, JPG, PNG o DOC hasta 5MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Observación adicional opcional */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Observación o aclaración del comprobante (Opcional)
                </label>
                <input
                  type="text"
                  value={justifyObservacion}
                  onChange={(e) => setJustifyObservacion(e.target.value)}
                  placeholder="Ej: Certificado emitido por centro médico, sello y matrícula..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-500"
                />
              </div>

              {justifyError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {justifyError}
                </div>
              )}

              {uploadProgressText && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-xs text-blue-900 animate-pulse">
                  <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full shrink-0" />
                  <span className="font-semibold">{uploadProgressText}</span>
                </div>
              )}

              <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setRequestToJustify(null)}
                    disabled={isSubmittingJustify}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingJustify || !justifyFile}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    {isSubmittingJustify ? (
                      <span>Guardando en Drive...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirmar Justificación</span>
                      </>
                    )}
                  </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
