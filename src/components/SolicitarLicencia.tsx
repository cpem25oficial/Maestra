import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Search, 
  Calendar, 
  FileText, 
  Paperclip, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Briefcase, 
  ShieldCheck, 
  Info,
  Clock,
  Layers,
  FileCheck2,
  X,
  Cloud,
  ExternalLink
} from 'lucide-react';
import { Agent, AssignedPost, LicenseType, LicenseRequest } from '../types';
import { dataService, calculateDaysBetween, formatYMD, formatDMY } from '../services/dataService';
import { 
  uploadFileToDrive, 
  FOLDER_FIRMAS_ID, 
  ensureGoogleDriveToken, 
  connectGoogleAdminDrive, 
  GOOGLE_DRIVE_ACCOUNT_EMAIL,
  isGoogleDriveConnected
} from '../services/googleDriveService';
import { SignatureCanvas } from './SignatureCanvas';

interface SolicitarLicenciaProps {
  initialEmployeeNumber?: string;
  onGoToMisSolicitudes: (employeeNumber: string) => void;
}

export const SolicitarLicencia: React.FC<SolicitarLicenciaProps> = ({
  initialEmployeeNumber = '',
  onGoToMisSolicitudes,
}) => {
  // Step 1: Agent Identification
  const [employeeInput, setEmployeeInput] = useState(initialEmployeeNumber);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null);

  // Form Fields
  const [assignedPosts, setAssignedPosts] = useState<AssignedPost[]>([]);
  const [postSelectionType, setPostSelectionType] = useState<'ALL' | 'SPECIFIC'>('SPECIFIC');
  const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);
  
  const todayStr = formatYMD(new Date());
  const [dateFrom, setDateFrom] = useState(todayStr);
  const [dateTo, setDateTo] = useState(todayStr);
  const [isArticulation, setIsArticulation] = useState(false);
  
  const [licenseTypes, setLicenseTypes] = useState<LicenseType[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<string>('');
  const [selectedType, setSelectedType] = useState<LicenseType | null>(null);

  const [note, setNote] = useState('');
  // Motivo no obligatorio: detalle de por qué solicita licencia
  const [motivo, setMotivo] = useState('');
  // Obligaciones: cantidad de obligaciones que afectan a la licencia
  const [obligacionesCantidad, setObligacionesCantidad] = useState<number>(1);
  const [obligacionesDetalle, setObligacionesDetalle] = useState('');
  
  // Justification file (opcional si el agente desea adjuntarlo anticipadamente)
  const [justificationFile, setJustificationFile] = useState<{ name: string; size: string; dataUrl?: string } | null>(null);
  
  // Signature
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);

  // Errors state
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  // Confirmation Modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<LicenseRequest | null>(null);

  // Load license types
  useEffect(() => {
    const fetchTypes = () => {
      dataService.getLicenseTypes().then((types) => {
        if (types && types.length > 0) {
          setLicenseTypes(types);
          setSelectedTypeId((prev) => prev || types[0].id);
          setSelectedType((prev) => prev || types[0]);
        }
      });
    };

    fetchTypes();
    const unsub = dataService.subscribe(fetchTypes);
    return unsub;
  }, []);

  // When selectedTypeId changes, update selectedType
  useEffect(() => {
    const found = licenseTypes.find((t) => t.id === selectedTypeId);
    setSelectedType(found || null);
  }, [selectedTypeId, licenseTypes]);

  // If initial employee number passed, auto-verify
  useEffect(() => {
    if (initialEmployeeNumber && !currentAgent) {
      handleVerifyEmployee(initialEmployeeNumber);
    }
  }, [initialEmployeeNumber]);

  const handleVerifyEmployee = async (empNum?: string) => {
    const num = empNum || employeeInput;
    if (!num.trim()) {
      setVerificationError('Por favor ingrese su DNI o número de empleado.');
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);

    try {
      const agent = await dataService.verifyAgent(num);
      if (!agent) {
        setVerificationError('No se encontró ningún agente con el número ingresado. Verifique su DNI o número de legajo.');
        setCurrentAgent(null);
      } else {
        setCurrentAgent(agent);
        const postsList = agent.posts || [];
        setAssignedPosts(postsList);
        if (postsList.length > 0) {
          setSelectedPostIds([postsList[0].id]);
          setPostSelectionType('SPECIFIC');
        } else {
          setSelectedPostIds([]);
          setPostSelectionType('ALL');
        }
      }
    } catch (err) {
      setVerificationError('Error al consultar el padrón de agentes en Supabase. Intente nuevamente.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleTogglePost = (postId: string) => {
    setSelectedPostIds((prev) => {
      if (prev.includes(postId)) {
        return prev.filter((id) => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  const handleSelectAllPosts = () => {
    setSelectedPostIds(assignedPosts.map((p) => p.id));
    setPostSelectionType('ALL');
  };

  const handleResetAgent = () => {
    setCurrentAgent(null);
    setEmployeeInput('');
    setAssignedPosts([]);
    setSelectedPostIds([]);
    setValidationErrors({});
    setShowConfirmModal(false);
    setSubmittedRequest(null);
  };

  // Handle optional file selection / reader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setValidationErrors((prev) => ({
        ...prev,
        justification: 'El archivo excede el tamaño máximo permitido de 5MB.',
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setJustificationFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        dataUrl: event.target?.result as string,
      });
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next.justification;
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const removeJustificationFile = () => {
    setJustificationFile(null);
  };

  // Validation Logic (Section 29)
  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    // 1. Agente válido
    if (!currentAgent) {
      errors.agent = 'Debe identificarse con un número de empleado válido.';
    }

    // 2. Puesto válido y actualmente asignado al agente
    if (postSelectionType === 'SPECIFIC') {
      if (selectedPostIds.length === 0) {
        errors.post = 'Debe seleccionar al menos un puesto asignado (uno o más de uno).';
      }
    } else {
      if (assignedPosts.length === 0) {
        errors.post = 'El agente no cuenta con puestos actualmente asignados por el administrador.';
      }
    }

    // 3. Fecha Desde
    if (!dateFrom) {
      errors.dateFrom = 'La fecha Desde es obligatoria.';
    }

    // 4. Fecha Hasta
    if (!dateTo) {
      errors.dateTo = 'La fecha Hasta es obligatoria.';
    }

    // 5. Que Hasta no sea anterior a Desde
    if (dateFrom && dateTo && dateTo < dateFrom) {
      errors.dateTo = 'La fecha Hasta no puede ser anterior a la fecha Desde.';
    }

    // 6. Tipo de licencia
    if (!selectedType) {
      errors.licenseType = 'Debe seleccionar un tipo de licencia reglamentario.';
    } else {
      // 7. Reglas de la licencia
      const totalDays = calculateDaysBetween(dateFrom, dateTo);
      if (selectedType.maxConsecutiveDays && totalDays > selectedType.maxConsecutiveDays) {
        errors.rules = `El tipo de licencia seleccionado (${selectedType.code}) permite hasta un máximo de ${selectedType.maxConsecutiveDays} días consecutivos por solicitud (solicitados: ${totalDays} días).`;
      }

      // 8. Obligaciones: cantidad de obligaciones que afectan a la licencia (entre 1 y 6)
      if (!obligacionesCantidad || obligacionesCantidad < 1 || obligacionesCantidad > 6) {
        errors.obligations = 'Debe seleccionar la cantidad de obligaciones afectadas (entre 1 y 6).';
      }
    }

    // 9. Firma obligatoria
    if (!signatureDataUrl) {
      errors.signature = 'La firma digital manuscrita es obligatoria para enviar la solicitud.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmModal(true);
    } else {
      // Scroll to first error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Drive direct upload state
  const [uploadProgressText, setUploadProgressText] = useState<string | null>(null);

  const handleConfirmSubmit = async () => {
    if (!currentAgent || !selectedType || !signatureDataUrl) return;

    setIsSubmitting(true);
    setUploadProgressText('Procesando solicitud institucional...');

    try {
      let postDescription = '';
      const isAllSelected = postSelectionType === 'ALL' || selectedPostIds.length === assignedPosts.length;
      if (isAllSelected) {
        postDescription = `Todos sus puestos asignados (${assignedPosts.length} cargo${assignedPosts.length > 1 ? 's' : ''})`;
      } else {
        const selectedPosts = assignedPosts.filter((p) => selectedPostIds.includes(p.id));
        postDescription = selectedPosts
          .map((p) => `${p.cargo} - ${p.curso}${p.materia ? ` (${p.materia})` : ''}`)
          .join('; ');
      }

      const obligationsFormatted = `${obligacionesCantidad} obligación${obligacionesCantidad > 1 ? 'es' : ''}${
        obligacionesDetalle.trim() ? ` (${obligacionesDetalle.trim()})` : ''
      }`;

      // 1. Generar ID oficial del trámite
      const reqId = 'SOL-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900);
      const signatureFileName = `${currentAgent.dni}_${reqId}.png`;

      // 2. Subir firma digital DIRECTAMENTE a Google Drive (Carpeta Firmas 1fK_xLbkg...)
      setUploadProgressText(`Guardando firma digital en Google Drive (${signatureFileName})...`);
      let driveRes = null;
      try {
        driveRes = await uploadFileToDrive({
          name: signatureFileName,
          dataUrl: signatureDataUrl,
          folderId: FOLDER_FIRMAS_ID,
        });
      } catch (uploadErr) {
        console.warn('Aviso al subir firma a Drive:', uploadErr);
      }

      // 3. Crear solicitud con el enlace oficial de Google Drive
      setUploadProgressText('Registrando solicitud institucional...');
      const newReq = await dataService.createLicenseRequest({
        id: reqId,
        employeeNumber: currentAgent.employeeNumber,
        agentName: currentAgent.fullName,
        agentDni: currentAgent.dni,
        postsSelection: isAllSelected ? 'ALL' : selectedPostIds.join(','),
        postDescription,
        dateFrom,
        dateTo,
        isArticulation,
        licenseTypeId: selectedType.id,
        licenseTypeCode: selectedType.code,
        licenseTypeName: selectedType.name,
        note: note.trim() || undefined,
        detail: motivo.trim() || undefined,
        obligations: obligationsFormatted,
        cantidadObligaciones: obligacionesCantidad,
        signatureDataUrl: driveRes?.webViewLink || signatureDataUrl,
        signatureDriveUrl: driveRes?.webViewLink,
        signatureDriveFileId: driveRes?.fileId,
      });

      setSubmittedRequest(newReq);
      setShowConfirmModal(false);
    } catch (err: any) {
      console.error('Submission error:', err);
      alert(err.message || 'Ocurrió un error al registrar la solicitud. Por favor intente nuevamente.');
    } finally {
      setIsSubmitting(false);
      setUploadProgressText(null);
    }
  };

  const totalCalculatedDays = calculateDaysBetween(dateFrom, dateTo);

  // Success view
  if (submittedRequest) {
    return (
      <div className="max-w-xl mx-auto px-4 py-8 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 sm:p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full uppercase tracking-wider">
              Estado: Pendiente
            </span>
            <h2 className="text-2xl font-bold text-slate-800">
              ¡Solicitud registrada con éxito!
            </h2>
            <p className="text-sm text-slate-600">
              La solicitud fue firmada y enviada a la Secretaría Institucional para su análisis administrativo.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 text-left text-xs sm:text-sm space-y-2.5 border border-slate-200">
            <div className="flex justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 font-medium">N° de Solicitud:</span>
              <span className="font-mono font-bold text-slate-800">{submittedRequest.id}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 font-medium">Agente:</span>
              <span className="font-semibold text-slate-800">{submittedRequest.agentName} (Legajo: {submittedRequest.employeeNumber})</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 font-medium">Puesto(s):</span>
              <span className="font-medium text-slate-800 text-right max-w-[60%]">{submittedRequest.postDescription}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 font-medium">Licencia:</span>
              <span className="font-semibold text-blue-700">{submittedRequest.licenseTypeCode} - {submittedRequest.licenseTypeName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 font-medium">Período:</span>
              <span className="font-medium text-slate-800">Del {formatDMY(submittedRequest.dateFrom)} al {formatDMY(submittedRequest.dateTo)} ({totalCalculatedDays} días)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">¿Es articulación?:</span>
              <span className="font-semibold text-slate-800">{submittedRequest.isArticulation ? 'Sí' : 'No'}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onGoToMisSolicitudes(submittedRequest.employeeNumber)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-colors"
            >
              <FileText className="w-4 h-4" />
              Ver en Mis solicitudes
            </button>
            <button
              onClick={() => {
                setSubmittedRequest(null);
                setSignatureDataUrl(null);
                setJustificationFile(null);
                setNote('');
                setMotivo('');
                setObligacionesCantidad(1);
                setObligacionesDetalle('');
              }}
              className="py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors"
            >
              Realizar otra solicitud
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Header Info */}
      
      {/* STEP 1: Agente Identification (Section 27) */}
      {!currentAgent ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 space-y-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Paso 1: Identificarse
              </h2>
              <p className="text-xs text-slate-500">
                Ingrese su DNI o número de empleado.
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifyEmployee();
            }}
            className="space-y-4"
          >
            <div>
              <label 
                htmlFor="empNumber" 
                className="block text-sm font-semibold text-slate-800 mb-1"
              >
                Número de DNI o Legajo <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="empNumber"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ej: 28123456 o 1042"
                  value={employeeInput}
                  onChange={(e) => {
                    setEmployeeInput(e.target.value);
                    if (verificationError) setVerificationError(null);
                  }}
                  className="w-full pl-4 pr-11 py-3 text-base rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-mono"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isVerifying || !employeeInput.trim()}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-[#2B3E4C] hover:bg-[#1E2C36] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isVerifying ? (
                    <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Search className="w-3.5 h-3.5 text-[#87b867]" />
                      <span>Ver</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {verificationError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-start gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <span>{verificationError}</span>
              </div>
            )}
          </form>
        </div>
      ) : (
        /* STEP 2: Agent Verified & Form */
        <div className="space-y-6">
          {/* Agent Banner */}
          <div className="bg-gradient-to-r from-[#2B3E4C] to-[#1E2C36] rounded-2xl text-white p-4 sm:p-5 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-lg border border-white/20">
                {currentAgent.fullName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base sm:text-lg leading-tight">
                    {currentAgent.fullName}
                  </h3>
                  <span className="bg-[#87b867]/30 text-white border border-[#87b867]/50 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Activo
                  </span>
                </div>
                <div className="text-xs text-blue-100 flex flex-wrap gap-x-3 gap-y-1 mt-0.5 font-mono">
                  <span>Legajo: {currentAgent.employeeNumber}</span>
                  <span>DNI: {currentAgent.dni}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAgent}
              className="text-xs text-blue-200 hover:text-white underline underline-offset-2 px-2 py-1 transition-colors"
              title="Cambiar de agente"
            >
              Cambiar
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleOpenConfirmation} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 space-y-6">
            
            {/* 1. SELECCIÓN DE PUESTO (Section 27) */}
            <div className="space-y-3 border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Puesto(s) a los que aplica la licencia <span className="text-red-500">*</span></span>
                </label>
              </div>

              {assignedPosts.length === 0 ? (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs sm:text-sm">
                  El agente no posee cargos asignados actualmente por el administrador.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {/* Selector: Un puesto o más vs Todos sus puestos */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPostSelectionType('SPECIFIC')}
                      className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                        postSelectionType === 'SPECIFIC'
                          ? 'bg-white text-blue-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Puesto(s) específico(s) ({selectedPostIds.length})
                    </button>
                    <button
                      type="button"
                      onClick={handleSelectAllPosts}
                      className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                        postSelectionType === 'ALL'
                          ? 'bg-white text-blue-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Todos sus puestos ({assignedPosts.length})
                    </button>
                  </div>

                  {postSelectionType === 'SPECIFIC' ? (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 px-1 pb-1">
                        <span>Seleccione uno o más puestos afectados:</span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedPostIds(assignedPosts.map((p) => p.id))}
                            className="text-blue-600 hover:underline font-medium text-[11px]"
                          >
                            Marcar todos
                          </button>
                          <span>•</span>
                          <button
                            type="button"
                            onClick={() => setSelectedPostIds([])}
                            className="text-slate-500 hover:underline font-medium text-[11px]"
                          >
                            Desmarcar
                          </button>
                        </div>
                      </div>

                      {assignedPosts.map((post) => {
                        const isSelected = selectedPostIds.includes(post.id);
                        return (
                          <label
                            key={post.id}
                            className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <input
                              type="checkbox"
                              name="assignedPost"
                              value={post.id}
                              checked={isSelected}
                              onChange={() => handleTogglePost(post.id)}
                              className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                            />
                            <div className="text-xs sm:text-sm flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900">{post.cargo}</span>
                                <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                  {post.situacionRevista}
                                </span>
                              </div>
                              <p className="text-slate-600 mt-0.5">
                                Curso/Turno: <span className="font-medium text-slate-800">{post.curso}</span>
                                {post.materia && <> • Materia: <span className="font-medium text-slate-800">{post.materia}</span></>}
                              </p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                      <p className="font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        La licencia afectará simultáneamente a todos sus cargos asignados:
                      </p>
                      <ul className="list-disc pl-5 text-blue-800 space-y-0.5 pt-1">
                        {assignedPosts.map((p) => (
                          <li key={p.id}>
                            <strong>{p.cargo}</strong> — {p.curso} ({p.situacionRevista})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {validationErrors.post && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {validationErrors.post}
                </p>
              )}
            </div>

            {/* 2. FECHAS: DESDE Y HASTA (Section 27 & 29) */}
            <div className="space-y-3 border-b border-slate-100 pb-5">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Período de la Licencia <span className="text-red-500">*</span></span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="dateFromInput" className="block text-xs font-semibold text-slate-700 mb-1">
                    Desde
                  </label>
                  <input
                    id="dateFromInput"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm font-mono"
                  />
                  {validationErrors.dateFrom && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.dateFrom}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="dateToInput" className="block text-xs font-semibold text-slate-700 mb-1">
                    Hasta
                  </label>
                  <input
                    id="dateToInput"
                    type="date"
                    value={dateTo}
                    min={dateFrom}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm font-mono"
                  />
                  {validationErrors.dateTo && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.dateTo}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200">
                <span className="text-slate-600">Duración total solicitada:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {totalCalculatedDays > 0 ? `${totalCalculatedDays} día${totalCalculatedDays > 1 ? 's' : ''}` : '0 días'}
                </span>
              </div>
            </div>

            {/* 3. ¿ES ARTICULACIÓN? (Section 27) */}
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <label htmlFor="isArticulationToggle" className="text-sm font-bold text-slate-900 block cursor-pointer">
                    ¿Es articulación?
                  </label>
                  <p className="text-xs text-slate-500">
                    Active esta opción si la licencia corresponde a una actividad articulada institucionalmente o inter-cátedra.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="isArticulationToggle"
                    type="checkbox"
                    checked={isArticulation}
                    onChange={(e) => setIsArticulation(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* 4. TIPO DE LICENCIA (Section 27) */}
            <div className="space-y-3 border-b border-slate-100 pb-5">
              <label htmlFor="licenseTypeSelect" className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Tipo de licencia <span className="text-red-500">*</span></span>
              </label>

              <select
                id="licenseTypeSelect"
                value={selectedTypeId}
                onChange={(e) => setSelectedTypeId(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                {licenseTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.code ? `${type.code} - ` : ''}{type.name} {type.requiresJustification ? '(Requiere comprobante)' : ''}
                  </option>
                ))}
              </select>

              {selectedType && (
                <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl text-xs space-y-1.5 text-slate-700">
                  <p className="font-medium text-blue-950">{selectedType.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedType.diasTotales ? (
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                        Total anual: <strong className="text-slate-800">{selectedType.diasTotales} días {selectedType.tipoDias || 'hábiles'}</strong>
                      </span>
                    ) : selectedType.maxDaysPerYear ? (
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                        Total anual: <strong className="text-slate-800">{selectedType.maxDaysPerYear} días</strong>
                      </span>
                    ) : null}

                    {selectedType.diasMensuales ? (
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                        Tope mensual: <strong className="text-slate-800">{selectedType.diasMensuales} días</strong>
                      </span>
                    ) : selectedType.maxConsecutiveDays ? (
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                        Máx. consecutivo: <strong className="text-slate-800">{selectedType.maxConsecutiveDays} días</strong>
                      </span>
                    ) : null}

                    {selectedType.requiresJustification && (
                      <span className="bg-amber-100/80 text-amber-800 px-2 py-0.5 rounded font-semibold border border-amber-200">
                        Requiere archivo de justificación
                      </span>
                    )}
                    {selectedType.requiresObligations && (
                      <span className="bg-indigo-100/80 text-indigo-800 px-2 py-0.5 rounded font-semibold border border-indigo-200">
                        Requiere declaración de obligaciones
                      </span>
                    )}
                  </div>
                  {selectedType.justificationHelpText && (
                    <p className="text-[11px] text-amber-800 pt-0.5">
                      <strong>Comprobante sugerido:</strong> {selectedType.justificationHelpText}
                    </p>
                  )}
                </div>
              )}

              {validationErrors.rules && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {validationErrors.rules}
                </p>
              )}
            </div>

            {/* 5. SELECCIÓN DE OBLIGACIONES AFECTADAS */}
            <div className="space-y-3 border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-indigo-600" />
                  <span>Obligaciones que afectan a la licencia <span className="text-red-500">*</span></span>
                </label>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  {obligacionesCantidad} {obligacionesCantidad === 1 ? 'obligación' : 'obligaciones'}
                </span>
              </div>

              <p className="text-xs text-slate-500">
                Seleccione la cantidad de obligaciones (horas cátedra, turnos o módulos de servicio) que son alcanzadas por la solicitud de licencia.
              </p>

              {/* Selector interactivo de cantidad de obligaciones */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600 mr-1">Seleccionar (1 a 6):</span>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setObligacionesCantidad(num)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                        obligacionesCantidad === num
                          ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400 scale-105'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setObligacionesCantidad((prev) => Math.max(1, prev - 1))}
                      disabled={obligacionesCantidad <= 1}
                      className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 font-bold text-base transition-colors"
                      title="Restar 1 obligación"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="6"
                      value={obligacionesCantidad}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val >= 1 && val <= 6) setObligacionesCantidad(val);
                      }}
                      className="w-16 h-10 text-center font-bold text-slate-900 border-x border-slate-200 text-sm focus:outline-none focus:bg-indigo-50/50"
                    />
                    <button
                      type="button"
                      onClick={() => setObligacionesCantidad((prev) => Math.min(6, prev + 1))}
                      disabled={obligacionesCantidad >= 6}
                      className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 font-bold text-base transition-colors"
                      title="Sumar 1 obligación"
                    >
                      +
                    </button>
                  </div>

                  <input
                    type="text"
                    value={obligacionesDetalle}
                    onChange={(e) => setObligacionesDetalle(e.target.value)}
                    placeholder="Detalle o materia de las obligaciones (opcional)"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-xs sm:text-sm"
                  />
                </div>
              </div>

              {validationErrors.obligations && (
                <p className="text-xs text-red-600 font-medium">{validationErrors.obligations}</p>
              )}
            </div>

            {/* 6. MOTIVO / DETALLE DE LA SOLICITUD (NO OBLIGATORIO) */}
            <div className="space-y-3 border-b border-slate-100 pb-5">
              <label htmlFor="motivoInput" className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>
                  Motivo / Detalle de la solicitud <span className="text-slate-400 font-normal text-xs">(Opcional)</span>
                </span>
              </label>

              <p className="text-xs text-slate-500">
                Indique brevemente el motivo o detalle por el cual solicita la licencia. Este campo no es obligatorio.
              </p>

              <textarea
                id="motivoInput"
                rows={2}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ej: Turno médico programado, trámite personal, examen docente, etc..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-xs sm:text-sm"
              />
            </div>

            {/* 7. ADJUNTO / JUSTIFICACIÓN (SE SUBE LUEGO DE LA AUTORIZACIÓN) */}
            <div className="space-y-3 border-b border-slate-100 pb-5">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs sm:text-sm space-y-2">
                <div className="flex items-start gap-2.5">
                  <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-blue-900 text-xs sm:text-sm">
                      Comprobante de Justificación Posterior
                    </h4>
                    <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                      <strong>No necesita cargar adjunto en esta solicitud inicial.</strong> Primero la Secretaría o Dirección autoriza la licencia, y posteriormente usted podrá justificarla subiendo su certificado o comprobante desde el módulo <strong>Mis Solicitudes</strong>.
                    </p>
                  </div>
                </div>

                {/* Si de todas formas desea adjuntarlo opcionalmente ahora */}
                <div className="pt-2 border-t border-blue-200/60">
                  {justificationFile ? (
                    <div className="flex items-center justify-between p-2.5 bg-white border border-emerald-300 rounded-xl">
                      <div className="flex items-center gap-2 overflow-hidden text-xs">
                        <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-bold text-slate-800 truncate">{justificationFile.name}</span>
                        <span className="text-slate-500 font-mono text-[11px]">({justificationFile.size})</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeJustificationFile}
                        className="text-slate-400 hover:text-red-600 p-1 rounded"
                        title="Quitar archivo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="inline-flex items-center gap-2 text-xs text-blue-700 font-semibold cursor-pointer hover:text-blue-900">
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>¿Ya posee el archivo y desea adjuntarlo ahora? (Opcional)</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* 8. FIRMA DIGITAL MANUSCRITA (Section 28) */}
            <div className="pt-1">
              <SignatureCanvas
                onSignatureChange={(url) => {
                  setSignatureDataUrl(url);
                  if (url && validationErrors.signature) {
                    setValidationErrors((prev) => {
                      const next = { ...prev };
                      delete next.signature;
                      return next;
                    });
                  }
                }}
                requiredError={validationErrors.signature}
              />
            </div>

            {/* Errors overview */}
            {Object.keys(validationErrors).length > 0 && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  Por favor revise los siguientes errores antes de continuar:
                </span>
                <ul className="list-disc pl-5 space-y-0.5">
                  {Object.values(validationErrors).map((msg, i) => (
                    <li key={i}>{msg}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Button: triggers confirmation modal */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#2B3E4C] hover:bg-[#1E2C36] active:bg-[#152028] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#87b867]" />
                <span>Revisar y Enviar Solicitud</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CONFIRMATION MODAL / SUMMARY SCREEN (Section 29) */}
      {showConfirmModal && currentAgent && selectedType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-5 animate-scale-up my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-lg">Resumen de la Solicitud</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Verifique detenidamente los datos antes de confirmar el envío formal de su solicitud.
            </p>

            <div className="bg-slate-50 rounded-xl p-4 text-xs sm:text-sm space-y-2.5 border border-slate-200">
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500 font-medium">Agente:</span>
                <span className="font-bold text-slate-800">{currentAgent.fullName} (Legajo: {currentAgent.employeeNumber})</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500 font-medium">DNI:</span>
                <span className="font-mono text-slate-800">{currentAgent.dni}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500 font-medium">Puesto seleccionado:</span>
                <span className="font-semibold text-slate-800 text-right max-w-[65%]">
                  {postSelectionType === 'ALL' || selectedPostIds.length === assignedPosts.length
                    ? `Todos sus puestos (${assignedPosts.length} cargos)`
                    : assignedPosts
                        .filter((p) => selectedPostIds.includes(p.id))
                        .map((p) => p.cargo)
                        .join(', ') || 'Puesto(s) seleccionado(s)'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500 font-medium">Tipo de licencia:</span>
                <span className="font-bold text-blue-700">{selectedType.code} - {selectedType.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500 font-medium">Período:</span>
                <span className="font-semibold text-slate-800">
                  {formatDMY(dateFrom)} al {formatDMY(dateTo)} ({totalCalculatedDays} día{totalCalculatedDays > 1 ? 's' : ''})
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500 font-medium">¿Es articulación?:</span>
                <span className="font-bold text-slate-800">{isArticulation ? 'SÍ' : 'NO'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500 font-medium">Obligaciones afectadas:</span>
                <span className="font-bold text-indigo-700">
                  {obligacionesCantidad} {obligacionesCantidad === 1 ? 'obligación' : 'obligaciones'}
                  {obligacionesDetalle.trim() ? ` (${obligacionesDetalle.trim()})` : ''}
                </span>
              </div>
              {motivo && (
                <div className="border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500 font-medium block">Motivo / Detalle:</span>
                  <p className="text-slate-800 text-xs mt-0.5">{motivo}</p>
                </div>
              )}
              {justificationFile && (
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500 font-medium">Adjunto preliminar:</span>
                  <span className="text-emerald-700 font-medium truncate max-w-[50%]">{justificationFile.name}</span>
                </div>
              )}
              {!justificationFile && (
                <div className="text-slate-500 text-[11px] italic pt-0.5">
                  * El comprobante oficial de justificación se adjuntará una vez que la licencia sea autorizada.
                </div>
              )}
            </div>

            {/* Signature Preview */}
            {signatureDataUrl && (
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-700 block">Firma digital estampada:</span>
                <div className="h-20 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center p-2">
                  <img src={signatureDataUrl} alt="Firma digital" className="max-h-full object-contain" />
                </div>
              </div>
            )}

            {uploadProgressText && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-xs text-blue-900 animate-pulse">
                <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full shrink-0" />
                <span className="font-semibold">{uploadProgressText}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
              >
                Modificar datos
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 rounded-xl bg-[#2B3E4C] hover:bg-[#1E2C36] text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    <span>Guardando en Drive...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#87b867]" />
                    <span>Confirmar y enviar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
