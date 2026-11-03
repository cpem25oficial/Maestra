import React, { useState, useMemo, useEffect } from 'react';
import { 
  FolderArchive, 
  Trash2, 
  Download, 
  Eye, 
  CheckSquare, 
  Square, 
  Search, 
  Calendar, 
  Filter, 
  AlertTriangle, 
  FileText, 
  FileCheck2, 
  X, 
  ShieldAlert, 
  Sparkles, 
  RefreshCw,
  HardDrive,
  Users,
  Paperclip,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle,
  Cloud,
  CloudUpload,
  ExternalLink,
  Lock,
  Check,
  FolderOpen,
  Layers,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { User } from 'firebase/auth';
import { LicenseRequest } from '../../types';
import { dataService, formatDMY, formatDateTimeDMY, calculateDaysBetween } from '../../services/dataService';
import { authService } from '../../services/authService';
import {
  connectGoogleAdminDrive,
  disconnectGoogleAdminDrive,
  isGoogleDriveConnected,
  getGoogleDriveUserEmail,
  subscribeToDriveAuth,
  syncAllPendingToDrive,
  uploadFileToDrive,
  listFilesInDriveFolder,
  processFileForUpload,
  getDriveThumbnailUrl,
  getDrivePreviewUrl,
  getDriveDownloadUrl,
  FOLDER_FIRMAS_ID,
  FOLDER_CONSTANCIAS_ID,
  DriveFileItem
} from '../../services/googleDriveService';
import { driveSyncCronService, DriveSyncCronStatus } from '../../services/driveSyncCronService';

export const SuperadminArchivosModule: React.FC = () => {
  const [requestsWithFiles, setRequestsWithFiles] = useState<LicenseRequest[]>(() => 
    dataService.getRequestsWithJustifications()
  );
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState<'ALL' | 'PDF' | 'IMAGE' | 'OTHER'>('ALL');
  
  // Date selection tools
  const [dateSelectionType, setDateSelectionType] = useState<'EXACT' | 'RANGE' | 'MONTH'>('EXACT');
  const [selectDateExact, setSelectDateExact] = useState('');
  const [selectDateRangeFrom, setSelectDateRangeFrom] = useState('');
  const [selectDateRangeTo, setSelectDateRangeTo] = useState('');

  // Modals state
  const [viewingFileReq, setViewingFileReq] = useState<LicenseRequest | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState<'FILE_ONLY' | 'WHOLE_REQUEST'>('FILE_ONLY');
  const [deleteReason, setDeleteReason] = useState('Limpieza periódica / archivo no válido');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  // Google Drive state
  const [driveConnected, setDriveConnected] = useState<boolean>(() => isGoogleDriveConnected());
  const [driveUserEmail, setDriveUserEmail] = useState<string | null>(() => getGoogleDriveUserEmail());
  const [isConnectingDrive, setIsConnectingDrive] = useState(false);
  const [isSyncingDrive, setIsSyncingDrive] = useState(false);
  const [syncProgressMsg, setSyncProgressMsg] = useState<string | null>(null);
  
  // Real-time Drive folder explorer modal
  const [driveExplorerOpen, setDriveExplorerOpen] = useState(false);
  const [explorerFolderType, setExplorerFolderType] = useState<'FIRMAS' | 'CONSTANCIAS'>('FIRMAS');
  const [driveLiveFiles, setDriveLiveFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingLiveFiles, setIsLoadingLiveFiles] = useState(false);

  // 1-Hour Automated Drive Sync Cron Status
  const [cronStatus, setCronStatus] = useState<DriveSyncCronStatus>(() => driveSyncCronService.getStatus());

  const currentUser = authService.getCurrentUser();

  // Subscribe to drive auth changes
  useEffect(() => {
    const unsub = subscribeToDriveAuth((connected, userEmail) => {
      setDriveConnected(connected);
      setDriveUserEmail(userEmail);
    });
    return unsub;
  }, []);

  // Subscribe to 1-Hour Cron Status updates
  useEffect(() => {
    const unsubCron = driveSyncCronService.subscribe((status) => {
      setCronStatus(status);
      if (status.status === 'success') {
        reloadData();
      }
    });
    return unsubCron;
  }, []);

  const reloadData = () => {
    const list = dataService.getRequestsWithJustifications();
    setRequestsWithFiles(list);
    // Keep only valid selected ids
    setSelectedIds((prev) => {
      const next = new Set<string>();
      const valid = new Set(list.map((r) => r.id));
      prev.forEach((id) => {
        if (valid.has(id)) next.add(id);
      });
      return next;
    });
  };

  // Google Drive connect
  const handleConnectDrive = async () => {
    setIsConnectingDrive(true);
    try {
      const res = await connectGoogleAdminDrive();
      setFeedbackMsg({
        type: 'success',
        text: `Google Drive institucional conectado con éxito (${res.user.email || 'cpem25oficial@gmail.com'}). Ya puede sincronizar y ver los archivos en las carpetas.`,
      });
    } catch (err: any) {
      setFeedbackMsg({
        type: 'error',
        text: `No se pudo conectar Google Drive: ${err.message || 'Error de autenticación'}`,
      });
    } finally {
      setIsConnectingDrive(false);
    }
  };

  // Google Drive disconnect
  const handleDisconnectDrive = async () => {
    await disconnectGoogleAdminDrive();
    setFeedbackMsg({
      type: 'info',
      text: 'Sesión de Google Drive cerrada.',
    });
  };

  // Google Drive sync all
  const handleSyncAllToDrive = async () => {
    if (!driveConnected) {
      setFeedbackMsg({
        type: 'error',
        text: 'Debe conectar Google Drive antes de iniciar la sincronización.',
      });
      return;
    }

    setIsSyncingDrive(true);
    setSyncProgressMsg('Iniciando sincronización con Google Drive...');

    try {
      const allRequests = dataService.getRequests();
      const res = await syncAllPendingToDrive(allRequests, (msg) => {
        setSyncProgressMsg(msg);
      });

      reloadData();
      setFeedbackMsg({
        type: 'success',
        text: `¡Sincronización finalizada! Se subieron ${res.signaturesUploaded} firma(s) a la Carpeta de Firmas y ${res.justificationsUploaded} comprobante(s) a la Carpeta de Constancias en Google Drive.${
          res.errors.length > 0 ? ` (${res.errors.length} notas)` : ''
        }`,
      });
    } catch (err: any) {
      setFeedbackMsg({
        type: 'error',
        text: `Error durante la sincronización: ${err.message || 'Error de red'}`,
      });
    } finally {
      setIsSyncingDrive(false);
      setSyncProgressMsg(null);
    }
  };

  // Single file manual upload to Drive
  const handleUploadSingleToDrive = async (req: LicenseRequest) => {
    if (!driveConnected) {
      setFeedbackMsg({
        type: 'error',
        text: 'Conecte primero Google Drive para subir el archivo.',
      });
      return;
    }

    try {
      const updates: Partial<LicenseRequest> = {};
      
      // Upload signature if needed
      if (req.signatureDataUrl && req.signatureDataUrl.startsWith('data:') && !req.signatureDriveUrl) {
        const sigRes = await uploadFileToDrive({
          name: `${req.agentDni || req.employeeNumber}_${req.id}.png`,
          dataUrl: req.signatureDataUrl,
          folderId: FOLDER_FIRMAS_ID,
        });
        if (sigRes) {
          updates.signatureDriveUrl = sigRes.webViewLink;
          updates.signatureDriveFileId = sigRes.fileId;
        }
      }

      // Upload justification if needed
      if (req.justificationDataUrl && req.justificationDataUrl.startsWith('data:') && !req.justificationDriveUrl) {
        const processed = await processFileForUpload({
          dataUrl: req.justificationDataUrl,
          name: req.justificationName || 'comprobante.jpg',
        });
        const justRes = await uploadFileToDrive({
          name: `${req.agentDni || req.employeeNumber}_${req.id}_${processed.name}`,
          dataUrl: processed.dataUrl,
          folderId: FOLDER_CONSTANCIAS_ID,
        });
        if (justRes) {
          updates.justificationDriveUrl = justRes.webViewLink;
          updates.justificationDriveFileId = justRes.fileId;
        }
      }

      if (Object.keys(updates).length > 0) {
        dataService.updateLicenseRequest(req.id, updates);
        reloadData();
        if (viewingFileReq?.id === req.id) {
          setViewingFileReq({ ...viewingFileReq, ...updates });
        }
        setFeedbackMsg({
          type: 'success',
          text: `El archivo y firma de la solicitud ${req.id} se subieron correctamente a Google Drive.`,
        });
      }
    } catch (err: any) {
      setFeedbackMsg({
        type: 'error',
        text: `Error al subir a Google Drive: ${err.message}`,
      });
    }
  };

  // Open live folder explorer
  const handleOpenLiveFolder = async (folderType: 'FIRMAS' | 'CONSTANCIAS') => {
    setExplorerFolderType(folderType);
    setDriveExplorerOpen(true);
    setIsLoadingLiveFiles(true);
    const folderId = folderType === 'FIRMAS' ? FOLDER_FIRMAS_ID : FOLDER_CONSTANCIAS_ID;
    const files = await listFilesInDriveFolder(folderId);
    setDriveLiveFiles(files);
    setIsLoadingLiveFiles(false);
  };

  // Helper to determine file category
  const getFileCategory = (filename?: string): 'PDF' | 'IMAGE' | 'OTHER' => {
    if (!filename) return 'OTHER';
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    if (ext === 'pdf') return 'PDF';
    if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) return 'IMAGE';
    return 'OTHER';
  };

  // Helper to estimate file size or label
  const getFileSizeLabel = (req: LicenseRequest): string => {
    if (req.justificationDataUrl && req.justificationDataUrl.startsWith('data:')) {
      const base64Length = req.justificationDataUrl.length - (req.justificationDataUrl.indexOf(',') + 1);
      const bytes = (base64Length * 3) / 4;
      if (bytes < 1024) return `${Math.round(bytes)} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    if (req.justificationDriveUrl) {
      return 'En Google Drive';
    }
    return 'Adjunto digital';
  };

  // Filtered requests list
  const filteredList = useMemo(() => {
    return requestsWithFiles.filter((req) => {
      // Text search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchesName = req.agentName.toLowerCase().includes(q);
        const matchesLegajo = req.employeeNumber.toLowerCase().includes(q);
        const matchesDni = req.agentDni.toLowerCase().includes(q);
        const matchesFile = (req.justificationName || '').toLowerCase().includes(q);
        const matchesLicense = req.licenseTypeCode.toLowerCase().includes(q) || req.licenseTypeName.toLowerCase().includes(q);
        if (!matchesName && !matchesLegajo && !matchesDni && !matchesFile && !matchesLicense) {
          return false;
        }
      }

      // File type filter
      if (fileTypeFilter !== 'ALL') {
        const cat = getFileCategory(req.justificationName);
        if (cat !== fileTypeFilter) return false;
      }

      return true;
    });
  }, [requestsWithFiles, searchTerm, fileTypeFilter]);

  // Total stats & pending sync count
  const stats = useMemo(() => {
    const totalFiles = requestsWithFiles.length;
    const pdfs = requestsWithFiles.filter((r) => getFileCategory(r.justificationName) === 'PDF').length;
    const images = requestsWithFiles.filter((r) => getFileCategory(r.justificationName) === 'IMAGE').length;
    const inDrive = requestsWithFiles.filter((r) => !!r.justificationDriveUrl).length;
    
    // Count all requests in system with pending items to push to Drive
    const all = dataService.getRequests();
    const pendingSignatures = all.filter((r: LicenseRequest) => !!(r.signatureDataUrl && r.signatureDataUrl.startsWith('data:') && !r.signatureDriveUrl)).length;
    const pendingJustifications = all.filter((r: LicenseRequest) => !!(r.justificationDataUrl && r.justificationDataUrl.startsWith('data:') && !r.justificationDriveUrl)).length;
    const totalPending = pendingSignatures + pendingJustifications;

    return { totalFiles, pdfs, images, inDrive, pendingSignatures, pendingJustifications, totalPending };
  }, [requestsWithFiles]);

  // Selection handlers
  const handleToggleSelectOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAllVisible = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      filteredList.forEach((r) => next.add(r.id));
      return next;
    });
  };

  const handleDeselectAll = () => {
    setSelectedIds(new Set());
  };

  // Select by Date
  const handleSelectByDate = () => {
    const matchingIds: string[] = [];

    if (dateSelectionType === 'EXACT') {
      if (!selectDateExact) {
        setFeedbackMsg({ type: 'error', text: 'Por favor seleccione una fecha específica para marcar.' });
        return;
      }
      requestsWithFiles.forEach((r) => {
        const uploadDate = r.createdAt.slice(0, 10);
        if (uploadDate === selectDateExact || r.dateFrom === selectDateExact || r.dateTo === selectDateExact) {
          matchingIds.push(r.id);
        }
      });
    } else if (dateSelectionType === 'RANGE') {
      if (!selectDateRangeFrom || !selectDateRangeTo) {
        setFeedbackMsg({ type: 'error', text: 'Por favor seleccione el rango Desde y Hasta para marcar.' });
        return;
      }
      requestsWithFiles.forEach((r) => {
        const uploadDate = r.createdAt.slice(0, 10);
        if (
          (uploadDate >= selectDateRangeFrom && uploadDate <= selectDateRangeTo) ||
          (r.dateFrom >= selectDateRangeFrom && r.dateFrom <= selectDateRangeTo) ||
          (r.dateTo >= selectDateRangeFrom && r.dateTo <= selectDateRangeTo)
        ) {
          matchingIds.push(r.id);
        }
      });
    } else if (dateSelectionType === 'MONTH') {
      const currentMonthPrefix = new Date().toISOString().slice(0, 7); // YYYY-MM
      requestsWithFiles.forEach((r) => {
        if (r.createdAt.startsWith(currentMonthPrefix) || r.dateFrom.startsWith(currentMonthPrefix)) {
          matchingIds.push(r.id);
        }
      });
    }

    if (matchingIds.length === 0) {
      setFeedbackMsg({
        type: 'info',
        text: 'No se encontraron archivos cargados en la fecha o período seleccionado.',
      });
      return;
    }

    setSelectedIds((prev) => {
      const next = new Set(prev);
      matchingIds.forEach((id) => next.add(id));
      return next;
    });

    setFeedbackMsg({
      type: 'success',
      text: `Se seleccionaron ${matchingIds.length} archivo(s) correspondientes a la fecha seleccionada.`,
    });
  };

  // Quick preset dates
  const handleApplyPresetDate = (preset: 'TODAY' | 'WEEK' | 'MONTH') => {
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    if (preset === 'TODAY') {
      setDateSelectionType('EXACT');
      setSelectDateExact(todayStr);
    } else if (preset === 'WEEK') {
      const past7 = new Date();
      past7.setDate(today.getDate() - 7);
      setDateSelectionType('RANGE');
      setSelectDateRangeFrom(past7.toISOString().slice(0, 10));
      setSelectDateRangeTo(todayStr);
    } else if (preset === 'MONTH') {
      setDateSelectionType('MONTH');
    }
  };

  // Execute Deletion
  const handleConfirmDelete = () => {
    if (selectedIds.size === 0) return;

    const idsToDelete = Array.from(selectedIds);
    const deleteWhole = deleteMode === 'WHOLE_REQUEST';
    const email = currentUser?.email || 'cpem25oficial@gmail.com';

    const result = dataService.deleteJustificationFiles(idsToDelete, email, deleteReason, deleteWhole);

    reloadData();
    setSelectedIds(new Set());
    setIsDeleteModalOpen(false);

    setFeedbackMsg({
      type: 'success',
      text: deleteWhole
        ? `Se eliminaron exitosamente ${result.deletedCount} solicitudes y sus comprobantes adjuntos.`
        : `Se eliminaron exitosamente ${result.deletedCount} archivos de justificación adjuntos. Las solicitudes conservan su registro administrativo en estado Autorizada.`,
    });
  };

  // Helper to open single file delete
  const handleOpenSingleDelete = (req: LicenseRequest) => {
    setSelectedIds(new Set([req.id]));
    setIsDeleteModalOpen(true);
  };

  // Helper to create a test file for the superadmin to easily audit & test selection if empty
  const handleGenerateTestAttachment = async () => {
    try {
      const testAgents = dataService.getAgents();
      const agent = testAgents[0] || {
        employeeNumber: '1001',
        fullName: 'Docente de Prueba CPEM',
        dni: '25444555',
      };

      const dummyPdfDataUrl = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iajw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+ZW5kb2JqCjIgMCBvYmo8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PmVuZG9iagozIDAgb2JqPDwvVHlwZS9QYWdlL01lZGlhQm94WzAgMCAzMDAgMTQ0XT4+ZW5kb2JqCnhyZWYKMCA0CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxOCAwMDAwMCBuIAowMDAwMDAwMDY2IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKdHJhaWxlcjw8L1NpemUgNDw+PXB3Cg==';

      const req = await dataService.createLicenseRequest({
        employeeNumber: agent.employeeNumber,
        agentName: agent.fullName,
        agentDni: agent.dni,
        postsSelection: 'ALL',
        postDescription: 'Cargo Institucional - Docente',
        dateFrom: new Date().toISOString().slice(0, 10),
        dateTo: new Date().toISOString().slice(0, 10),
        isArticulation: false,
        licenseTypeId: 'lic-art28',
        licenseTypeCode: 'Art. 28',
        licenseTypeName: 'Atención Familiar / Asuntos Particulares',
        signatureDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        note: 'Archivo generado por Superadmin para pruebas de auditoría y sincronización.',
      });

      // Update to autorizada and justify it
      dataService.updateRequestStatus(req.id, 'Autorizada', currentUser?.email || 'cpem25oficial@gmail.com', 'Autorizada para prueba');
      await dataService.justifyAuthorizedRequest(
        req.id,
        agent.employeeNumber,
        {
          name: `certificado_medico_${Date.now().toString().slice(-4)}.pdf`,
          size: '142 KB',
          dataUrl: dummyPdfDataUrl,
        },
        'Comprobante médico de prueba generado por superadmin'
      );

      reloadData();
      setFeedbackMsg({
        type: 'success',
        text: 'Se generó un comprobante y firma de prueba con éxito. Puede sincronizarlo a Google Drive.',
      });
    } catch (err) {
      setFeedbackMsg({ type: 'error', text: 'Error al generar comprobante de prueba.' });
    }
  };

  const selectedCount = selectedIds.size;
  const isAllVisibleSelected = filteredList.length > 0 && filteredList.every((r) => selectedIds.has(r.id));

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* HEADER SECTION (Special Superadmin Branding) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Zona Exclusiva Superadministración</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <FolderArchive className="w-7 h-7 text-indigo-400" />
              <span>Gestión y Almacenamiento de Archivos</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Custodia documental institucional: resguardo de firmas digitales y constancias médicas de los 156 agentes. Sincronización oficial con las carpetas de Google Drive de CPEM 25 y auditoría centralizada.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={`https://drive.google.com/drive/folders/${FOLDER_FIRMAS_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/40 text-xs font-semibold transition-colors"
              title="Abrir carpeta oficial de firmas en Google Drive"
            >
              <span>📁 Carpeta Firmas</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={`https://drive.google.com/drive/folders/${FOLDER_CONSTANCIAS_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-xs font-semibold transition-colors"
              title="Abrir carpeta oficial de constancias en Google Drive"
            >
              <span>📁 Carpeta Constancias</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={reloadData}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/10 shadow-xs"
              title="Refrescar lista de archivos"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Actualizar</span>
            </button>

            {requestsWithFiles.length === 0 && (
              <button
                onClick={handleGenerateTestAttachment}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
                title="Crear un comprobante de prueba para verificar las herramientas"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generar Archivo de Prueba</span>
              </button>
            )}
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-800/80">
          <div className="bg-slate-800/50 rounded-2xl p-3 border border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Total Archivos</span>
            <div className="text-xl font-black text-white mt-0.5">{stats.totalFiles}</div>
            <span className="text-[10px] text-indigo-300 font-medium">Registrados en el sistema</span>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-3 border border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Subidos a Google Drive</span>
            <div className="text-xl font-black text-emerald-400 mt-0.5">{stats.inDrive}</div>
            <span className="text-[10px] text-slate-400 font-medium">Con enlace directo a Drive</span>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-3 border border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Pendientes de Subir</span>
            <div className={`text-xl font-black mt-0.5 ${stats.totalPending > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
              {stats.totalPending}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">{stats.pendingSignatures} firmas, {stats.pendingJustifications} constancias</span>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-3 border border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Seleccionados</span>
            <div className={`text-xl font-black mt-0.5 ${selectedCount > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
              {selectedCount}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Para acción en lote</span>
          </div>
        </div>
      </div>

      {/* GOOGLE DRIVE INTEGRATION & SYNC CARD (Key Component) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-5 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <Cloud className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Conexión con Google Drive Institucional</span>
                  {driveConnected ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Conectado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      <AlertCircle className="w-3 h-3 text-amber-600" />
                      No Conectado
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-500">
                  {driveConnected
                    ? `Autorizado como ${driveUserEmail || 'cpem25oficial@gmail.com'}. Los archivos se sincronizan directamente con las carpetas institucionales.`
                    : 'Para que las firmas y constancias se alojen directamente en Google Drive, conecte la cuenta institucional de CPEM 25.'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {!driveConnected ? (
              <button
                type="button"
                onClick={handleConnectDrive}
                disabled={isConnectingDrive}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-300 shadow-sm transition-all hover:scale-102 cursor-pointer"
                title="Iniciar sesión con Google para autorizar la subida a Drive"
              >
                {/* Official Google 'G' Icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isConnectingDrive ? 'Conectando...' : 'Conectar con Google Drive'}</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSyncAllToDrive}
                  disabled={isSyncingDrive}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all hover:scale-102 cursor-pointer"
                  title="Subir todas las firmas y constancias pendientes a Google Drive"
                >
                  <CloudUpload className={`w-4 h-4 ${isSyncingDrive ? 'animate-bounce' : ''}`} />
                  <span>
                    {isSyncingDrive
                      ? 'Sincronizando...'
                      : `Sincronizar a Drive (${stats.totalPending} pendientes)`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenLiveFolder('FIRMAS')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300/80 transition-colors"
                  title="Ver los archivos que existen actualmente en la carpeta de Firmas de Google Drive"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ver Firmas en Drive</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenLiveFolder('CONSTANCIAS')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300/80 transition-colors"
                  title="Ver los archivos que existen actualmente en la carpeta de Constancias de Google Drive"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Ver Constancias en Drive</span>
                </button>

                <button
                  type="button"
                  onClick={handleDisconnectDrive}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  title="Cerrar sesión de Google Drive"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Live sync progress alert */}
        {isSyncingDrive && syncProgressMsg && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-3 text-xs text-blue-900 animate-pulse">
            <RefreshCw className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
            <span className="font-medium">{syncProgressMsg}</span>
          </div>
        )}

        {/* AUTOMATIC 1-HOUR CRON STATUS BAR */}
        <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-xs sm:text-sm text-slate-900">
                    Cron de Sincronización Automática a Drive
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                    ⏱ Cada 1 Hora
                  </span>
                  {cronStatus.status === 'running' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 animate-pulse border border-blue-200">
                      <RefreshCw className="w-3 h-3 animate-spin text-blue-600" />
                      Sincronizando archivos...
                    </span>
                  )}
                  {driveConnected && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Activo sin pedir acceso
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  El cron institucional examina y transfiere automáticamente firmas y comprobantes a las carpetas de Google Drive cada 60 minutos sin requerir acción ni login de los agentes.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                setIsSyncingDrive(true);
                await driveSyncCronService.runSyncTask('MANUAL');
                reloadData();
                setIsSyncingDrive(false);
              }}
              disabled={isSyncingDrive || !driveConnected}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-300 shadow-2xs transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
              title="Disparar la tarea del cron manualmente ahora"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${cronStatus.status === 'running' ? 'animate-spin text-indigo-600' : ''}`} />
              <span>Ejecutar Cron Ahora</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Última ejecución:</span>
              <span className="font-mono font-bold text-slate-700">
                {cronStatus.lastSyncDate
                  ? new Date(cronStatus.lastSyncDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : 'Programada'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Próxima ejecución:</span>
              <span className="font-mono font-bold text-indigo-600">
                {cronStatus.nextSyncTimestamp
                  ? new Date(cronStatus.nextSyncTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : 'En 1 hora'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Última tanda transferida:</span>
              <span className="font-bold text-slate-700">
                {cronStatus.lastSignaturesUploaded} firmas / {cronStatus.lastJustificationsUploaded} constancias
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Modo de ejecución:</span>
              <span className="font-bold text-slate-700">
                Automático en segundo plano
              </span>
            </div>
          </div>
        </div>

        {/* Informative explanation banner */}
        {!driveConnected && (
          <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200/90 text-xs text-amber-900 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>¿Por qué no ve archivos en Google Drive todavía?</span>
            </div>
            <p className="leading-relaxed text-amber-800">
              Por requerimiento del circuito administrativo, los agentes docentes solicitan licencias ingresando únicamente con su <strong>DNI y Legajo</strong> (sin requerir que inicien sesión con cuentas personales de Google). Por eso, las firmas y constancias se resguardan de forma segura en la base de datos de la escuela.
            </p>
            <p className="leading-relaxed text-amber-800">
              Para que esos archivos se trasladen a las carpetas institucionales de Google Drive (<code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">1fK_xLbkg...</code> y <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">1WXKwj...</code>), el administrador debe pulsar en <strong>"Conectar con Google Drive"</strong> arriba. Una vez conectado, podrá pulsar <strong>"Sincronizar a Drive"</strong> y todos los archivos acumulados se subirán de forma automática.
            </p>
          </div>
        )}
      </div>

      {/* FEEDBACK BANNER */}
      {feedbackMsg && (
        <div
          className={`p-4 rounded-2xl border flex items-start justify-between gap-3 text-xs sm:text-sm animate-shake ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : feedbackMsg.type === 'error'
              ? 'bg-red-50 text-red-900 border-red-300'
              : 'bg-blue-50 text-blue-900 border-blue-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedbackMsg.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
            {feedbackMsg.type === 'error' && <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
            {feedbackMsg.type === 'info' && <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />}
            <span className="font-medium">{feedbackMsg.text}</span>
          </div>
          <button
            onClick={() => setFeedbackMsg(null)}
            className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TOOLBAR: QUICK SELECTION, DATE PICKER & BULK ACTION */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-4">
        {/* ROW 1: Action bar with Bulk Delete & Selection counters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={isAllVisibleSelected ? handleDeselectAll : handleSelectAllVisible}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                isAllVisibleSelected
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {isAllVisibleSelected ? <CheckSquare className="w-4 h-4 text-indigo-600" /> : <Square className="w-4 h-4 text-slate-400" />}
              <span>{isAllVisibleSelected ? 'Deseleccionar Todos' : 'Seleccionar Todos'}</span>
            </button>

            {selectedCount > 0 && (
              <button
                onClick={handleDeselectAll}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline px-2 cursor-pointer"
              >
                Limpiar selección ({selectedCount})
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={selectedCount === 0}
              onClick={() => setIsDeleteModalOpen(true)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                selectedCount > 0
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:scale-102 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span>Eliminar Selección ({selectedCount})</span>
            </button>
          </div>
        </div>

        {/* ROW 2: DATE SELECTOR */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-700">Seleccionar por Fecha:</span>
            <div className="flex items-center gap-1 ml-2">
              <button
                type="button"
                onClick={() => handleApplyPresetDate('TODAY')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                Hoy
              </button>
              <button
                type="button"
                onClick={() => handleApplyPresetDate('WEEK')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                Últimos 7 días
              </button>
              <button
                type="button"
                onClick={() => handleApplyPresetDate('MONTH')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                Este Mes
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Mode Selector */}
            <div className="flex rounded-xl border border-slate-300 overflow-hidden bg-white shrink-0 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setDateSelectionType('EXACT')}
                className={`px-3 py-2 transition-colors cursor-pointer ${
                  dateSelectionType === 'EXACT' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Fecha exacta
              </button>
              <button
                type="button"
                onClick={() => setDateSelectionType('RANGE')}
                className={`px-3 py-2 border-l border-slate-200 transition-colors cursor-pointer ${
                  dateSelectionType === 'RANGE' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Rango (Desde / Hasta)
              </button>
              <button
                type="button"
                onClick={() => setDateSelectionType('MONTH')}
                className={`px-3 py-2 border-l border-slate-200 transition-colors cursor-pointer ${
                  dateSelectionType === 'MONTH' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Mes completo
              </button>
            </div>

            {/* Inputs based on type */}
            <div className="flex-1 flex flex-wrap items-center gap-2">
              {dateSelectionType === 'EXACT' && (
                <input
                  type="date"
                  value={selectDateExact}
                  onChange={(e) => setSelectDateExact(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white focus:outline-indigo-500"
                />
              )}

              {dateSelectionType === 'RANGE' && (
                <div className="flex items-center gap-2 text-xs">
                  <input
                    type="date"
                    value={selectDateRangeFrom}
                    onChange={(e) => setSelectDateRangeFrom(e.target.value)}
                    className="px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white focus:outline-indigo-500"
                    placeholder="Desde"
                  />
                  <span className="text-slate-400 font-bold">al</span>
                  <input
                    type="date"
                    value={selectDateRangeTo}
                    onChange={(e) => setSelectDateRangeTo(e.target.value)}
                    className="px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white focus:outline-indigo-500"
                    placeholder="Hasta"
                  />
                </div>
              )}

              {dateSelectionType === 'MONTH' && (
                <span className="text-xs text-slate-600 font-medium bg-white px-3 py-2 rounded-xl border border-slate-200">
                  Seleccionará todos los comprobantes del mes en curso ({new Date().toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })})
                </span>
              )}

              <button
                type="button"
                onClick={handleSelectByDate}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Seleccionar por esta fecha
              </button>
            </div>
          </div>
        </div>

        {/* ROW 3: SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por agente, legajo, DNI, nombre de archivo o licencia..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-xs sm:text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5 shrink-0 text-xs">
            <Filter className="w-4 h-4 text-slate-400 mr-1" />
            {(['ALL', 'PDF', 'IMAGE', 'OTHER'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFileTypeFilter(type)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                  fileTypeFilter === type
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type === 'ALL' && 'Todos'}
                {type === 'PDF' && 'Solo PDF'}
                {type === 'IMAGE' && 'Imágenes'}
                {type === 'OTHER' && 'Otros'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FILES TABLE / LIST VIEW */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredList.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto shadow-inner">
              <FolderArchive className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="font-bold text-base text-slate-800">
                {requestsWithFiles.length === 0
                  ? 'No hay archivos de justificación adjuntos'
                  : 'Ningún archivo coincide con los filtros aplicados'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {requestsWithFiles.length === 0
                  ? 'Cuando los agentes adjunten certificados o justifiquen licencias autorizadas, los comprobantes aparecerán aquí para su gestión.'
                  : 'Pruebe restablecer la búsqueda o los filtros de tipo de archivo para ver los elementos disponibles.'}
              </p>
            </div>

            {requestsWithFiles.length === 0 && (
              <button
                onClick={handleGenerateTestAttachment}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generar Archivo de Prueba para Probar</span>
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                  <th className="py-3 px-3 text-center w-12">
                    <input
                      type="checkbox"
                      checked={isAllVisibleSelected}
                      onChange={isAllVisibleSelected ? handleDeselectAll : handleSelectAllVisible}
                      className="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      title="Seleccionar / deseleccionar todos los visibles"
                    />
                  </th>
                  <th className="py-3 px-3">ARCHIVO ADJUNTO</th>
                  <th className="py-3 px-3">AGENTE DOCENTE</th>
                  <th className="py-3 px-3">LICENCIA & PERÍODO</th>
                  <th className="py-3 px-3">FECHA DE CARGA</th>
                  <th className="py-3 px-3 text-center">ESTADO GOOGLE DRIVE</th>
                  <th className="py-3 px-4 text-right">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredList.map((req) => {
                  const isSelected = selectedIds.has(req.id);
                  const category = getFileCategory(req.justificationName);
                  const totalDays = calculateDaysBetween(req.dateFrom, req.dateTo);
                  const hasDriveJust = !!req.justificationDriveUrl;
                  const hasDriveSig = !!req.signatureDriveUrl;

                  return (
                    <tr
                      key={req.id}
                      className={`transition-colors ${
                        isSelected ? 'bg-indigo-50/70' : 'hover:bg-slate-50/80'
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectOne(req.id)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                      </td>

                      {/* Archivo */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                              category === 'PDF'
                                ? 'bg-red-50 text-red-600 border-red-200'
                                : category === 'IMAGE'
                                ? 'bg-blue-50 text-blue-600 border-blue-200'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {category === 'PDF' && <FileText className="w-5 h-5" />}
                            {category === 'IMAGE' && <FileCheck2 className="w-5 h-5" />}
                            {category === 'OTHER' && <Paperclip className="w-5 h-5" />}
                          </div>

                          <div className="min-w-0 max-w-[220px]">
                            <span
                              className="font-bold text-slate-900 truncate block hover:text-indigo-600 cursor-pointer text-xs"
                              onClick={() => setViewingFileReq(req)}
                              title={req.justificationName}
                            >
                              {req.justificationName || 'comprobante_adjunto.pdf'}
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                              <span className="font-semibold text-slate-600">{category}</span>
                              <span>•</span>
                              <span>{getFileSizeLabel(req)}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Agente */}
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900 leading-tight">{req.agentName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Leg. {req.employeeNumber} • DNI {req.agentDni}
                        </div>
                      </td>

                      {/* Licencia & Período */}
                      <td className="py-3 px-3">
                        <div className="font-semibold text-indigo-700 leading-tight">
                          {req.licenseTypeCode} - {req.licenseTypeName}
                        </div>
                        <div className="text-[11px] font-mono text-slate-600 mt-0.5">
                          {formatDMY(req.dateFrom)} al {formatDMY(req.dateTo)}{' '}
                          <span className="text-[10px] text-slate-400">({totalDays} d.)</span>
                        </div>
                      </td>

                      {/* Fecha de carga */}
                      <td className="py-3 px-3 font-mono text-slate-600 text-[11px] whitespace-nowrap">
                        {formatDateTimeDMY(req.createdAt)}
                      </td>

                      {/* Estado en Google Drive */}
                      <td className="py-3 px-3 text-center">
                        <div className="inline-flex flex-col items-center gap-1">
                          {hasDriveJust ? (
                            <a
                              href={req.justificationDriveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 transition-colors"
                              title="Abrir comprobante directamente en Google Drive"
                            >
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>En Drive ↗</span>
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                              <CloudUpload className="w-3 h-3 text-amber-600" />
                              <span>Pendiente Drive</span>
                            </span>
                          )}

                          {/* Signature drive indicator */}
                          <div className="text-[9px] font-mono text-slate-400">
                            Firma: {hasDriveSig ? <span className="text-emerald-600 font-semibold">En Drive</span> : <span className="text-amber-600">Local</span>}
                          </div>
                        </div>
                      </td>

                      {/* Acciones individuales */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {/* Vista previa */}
                          <button
                            type="button"
                            onClick={() => setViewingFileReq(req)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                            title="Vista previa del comprobante y firma"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Subir a Drive individual */}
                          {(!hasDriveJust || !hasDriveSig) && driveConnected && (
                            <button
                              type="button"
                              onClick={() => handleUploadSingleToDrive(req)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              title="Subir este archivo y firma a Google Drive ahora"
                            >
                              <CloudUpload className="w-4 h-4" />
                            </button>
                          )}

                          {/* Abrir en Drive si existe */}
                          {req.justificationDriveUrl && (
                            <a
                              href={req.justificationDriveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                              title="Abrir archivo en Google Drive"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}

                          {/* Descargar local */}
                          {req.justificationDataUrl && (
                            <a
                              href={req.justificationDataUrl}
                              download={req.justificationName || `comprobante_${req.employeeNumber}.pdf`}
                              className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                              title="Descargar archivo en este dispositivo"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}

                          {/* Eliminar individual */}
                          <button
                            type="button"
                            onClick={() => handleOpenSingleDelete(req)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Eliminar este archivo adjunto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* REAL-TIME GOOGLE DRIVE FOLDER EXPLORER MODAL */}
      {driveExplorerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Archivos en Vivo en Google Drive: Carpeta {explorerFolderType === 'FIRMAS' ? 'Firmas' : 'Constancias'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Carpeta ID: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[11px]">{explorerFolderType === 'FIRMAS' ? FOLDER_FIRMAS_ID : FOLDER_CONSTANCIAS_ID}</code>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://drive.google.com/drive/folders/${explorerFolderType === 'FIRMAS' ? FOLDER_FIRMAS_ID : FOLDER_CONSTANCIAS_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <span>Abrir en Google Drive ↗</span>
                </a>
                <button
                  onClick={() => setDriveExplorerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Folder Toggle Tabs */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleOpenLiveFolder('FIRMAS')}
                className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  explorerFolderType === 'FIRMAS'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Carpeta Firmas ({FOLDER_FIRMAS_ID.slice(0, 8)}...)
              </button>
              <button
                type="button"
                onClick={() => handleOpenLiveFolder('CONSTANCIAS')}
                className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  explorerFolderType === 'CONSTANCIAS'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Carpeta Constancias ({FOLDER_CONSTANCIAS_ID.slice(0, 8)}...)
              </button>
            </div>

            {/* Files List */}
            <div className="flex-1 overflow-y-auto min-h-[250px] border border-slate-200 rounded-2xl p-2 bg-slate-50/50">
              {isLoadingLiveFiles ? (
                <div className="flex flex-col items-center justify-center h-48 space-y-2 text-slate-400">
                  <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="text-xs font-semibold">Consultando Google Drive v3 API...</span>
                </div>
              ) : driveLiveFiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 space-y-2 text-slate-400 text-center p-4">
                  <Cloud className="w-8 h-8 text-slate-300" />
                  <p className="text-xs font-bold text-slate-600">Esta carpeta no contiene archivos subidos todavía</p>
                  <p className="text-[11px] text-slate-400 max-w-sm">
                    Utilice el botón "Sincronizar a Drive" arriba para subir todas las firmas o constancias acumuladas.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 bg-white rounded-xl border border-slate-200">
                  {driveLiveFiles.map((f) => (
                    <div key={f.id} className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                        <div className="min-w-0">
                          <span className="font-bold text-xs text-slate-900 block truncate">{f.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {f.size || 'Archivo'} • ID: {f.id.slice(0, 12)}...
                          </span>
                        </div>
                      </div>

                      <a
                        href={f.webViewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors shrink-0"
                      >
                        <span>Abrir ↗</span>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Total en carpeta: <strong>{driveLiveFiles.length}</strong> archivo(s)</span>
              <button
                type="button"
                onClick={() => setDriveExplorerOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL (Individual or Bulk) */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 leading-tight">
                  Confirmar Eliminación de Archivos
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Se dispone a eliminar {selectedCount} archivo(s) de justificación cargados por los agentes docentes.
                </p>
              </div>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Affected Files Preview */}
            <div className="max-h-36 overflow-y-auto divide-y divide-slate-100 bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-xs">
              {Array.from(selectedIds).map((id) => {
                const req = requestsWithFiles.find((r) => r.id === id);
                if (!req) return null;
                return (
                  <div key={id} className="py-1.5 flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-800 truncate">{req.justificationName || 'comprobante'}</span>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">
                      {req.agentName} (Leg. {req.employeeNumber})
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Deletion Mode selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Acción a realizar en el sistema:
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-indigo-300 bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="deleteMode"
                  checked={deleteMode === 'FILE_ONLY'}
                  onChange={() => setDeleteMode('FILE_ONLY')}
                  className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="text-xs">
                  <strong className="text-slate-900 block">Eliminar solo los archivos adjuntos (Recomendado)</strong>
                  <span className="text-slate-500 text-[11px]">
                    Libera el archivo y pasa la solicitud a estado <strong>Autorizada</strong> para que el agente pueda subir una nueva justificación si fuera necesario.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-red-200 hover:border-red-300 bg-red-50/50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="deleteMode"
                  checked={deleteMode === 'WHOLE_REQUEST'}
                  onChange={() => setDeleteMode('WHOLE_REQUEST')}
                  className="mt-0.5 text-red-600 focus:ring-red-500"
                />
                <div className="text-xs">
                  <strong className="text-red-950 block">Eliminar solicitud de licencia completa y archivo</strong>
                  <span className="text-red-800 text-[11px]">
                    Marca la solicitud como <strong>Eliminada</strong> y purga el comprobante adjunto del sistema.
                  </span>
                </div>
              </label>
            </div>

            {/* Motive input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Motivo de la eliminación (Constancia de Auditoría):
              </label>
              <input
                type="text"
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                placeholder="Ej: Archivo ilegible, comprobante vencido, limpieza periódica..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-indigo-500"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Confirmar y Eliminar Definitivamente</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FILE PREVIEW MODAL */}
      {viewingFileReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 truncate">
                    {viewingFileReq.justificationName || 'Comprobante de Justificación'}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">
                    {viewingFileReq.agentName} • Legajo {viewingFileReq.employeeNumber} • Licencia {viewingFileReq.licenseTypeCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {viewingFileReq.justificationDriveUrl ? (
                  <a
                    href={viewingFileReq.justificationDriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Ver en Drive ↗</span>
                  </a>
                ) : (
                  driveConnected && (
                    <button
                      type="button"
                      onClick={() => handleUploadSingleToDrive(viewingFileReq)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      <CloudUpload className="w-3.5 h-3.5" />
                      <span>Subir a Drive</span>
                    </button>
                  )
                )}

                {(viewingFileReq.justificationDataUrl || viewingFileReq.justificationDriveFileId) && (
                  <a
                    href={viewingFileReq.justificationDataUrl || getDriveDownloadUrl(viewingFileReq.justificationDriveFileId!)}
                    download={viewingFileReq.justificationName || 'comprobante.pdf'}
                    target={viewingFileReq.justificationDriveFileId ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Descargar</span>
                  </a>
                )}
                <button
                  onClick={() => setViewingFileReq(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Preview */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-100/50 min-h-[350px]">
              {viewingFileReq.justificationDataUrl ? (
                getFileCategory(viewingFileReq.justificationName) === 'IMAGE' ? (
                  <div className="max-w-full max-h-[550px] overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white p-2">
                    <img
                      src={viewingFileReq.justificationDataUrl}
                      alt="Comprobante médico"
                      className="max-h-[500px] object-contain rounded-lg mx-auto"
                    />
                  </div>
                ) : (
                  <div className="w-full h-[500px] rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col">
                    <iframe
                      src={viewingFileReq.justificationDataUrl}
                      title="Visor PDF"
                      className="w-full h-full border-none"
                    />
                  </div>
                )
              ) : viewingFileReq.justificationDriveUrl ? (
                getFileCategory(viewingFileReq.justificationName) === 'IMAGE' ? (
                  <div className="max-w-full max-h-[550px] overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white p-2">
                    <img
                      src={
                        viewingFileReq.justificationDriveFileId
                          ? getDriveThumbnailUrl(viewingFileReq.justificationDriveFileId, 1000)
                          : viewingFileReq.justificationDriveUrl
                      }
                      alt="Comprobante médico en Drive"
                      className="max-h-[500px] object-contain rounded-lg mx-auto"
                    />
                  </div>
                ) : getFileCategory(viewingFileReq.justificationName) === 'PDF' && viewingFileReq.justificationDriveFileId ? (
                  <div className="w-full h-[500px] rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col">
                    <iframe
                      src={getDrivePreviewUrl(viewingFileReq.justificationDriveFileId)}
                      title="Visor PDF Google Drive"
                      className="w-full h-full border-none"
                    />
                  </div>
                ) : (
                  <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md">
                    <Cloud className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Archivo Alojado en Google Drive</h4>
                    <p className="text-xs text-slate-500 mb-4">
                      Este documento está guardado en la nube institucional. Puede abrirlo directamente en Google Drive.
                    </p>
                    <a
                      href={viewingFileReq.justificationDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
                    >
                      <span>Abrir en Google Drive</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )
              ) : (
                <div className="text-center p-8 text-slate-400">
                  <AlertCircle className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="text-xs">No se pudo cargar la vista previa directa del archivo.</p>
                </div>
              )}

              {/* Firma digital del agente estampada al solicitar */}
              {(viewingFileReq.signatureDataUrl || viewingFileReq.signatureDriveUrl || viewingFileReq.signatureDriveFileId) && (
                <div className="w-full mt-4 p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-slate-800 text-xs block">
                      Firma Digital del Agente (Declaración Jurada):
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Registrada por {viewingFileReq.agentName} (DNI {viewingFileReq.agentDni})
                      {viewingFileReq.signatureDriveUrl && (
                        <a
                          href={viewingFileReq.signatureDriveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 hover:underline font-semibold inline-flex items-center gap-0.5"
                        >
                          <span>(Ver en Google Drive ↗)</span>
                        </a>
                      )}
                    </span>
                  </div>
                  <div className="h-16 px-4 py-1.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center shrink-0">
                    <img
                      src={
                        viewingFileReq.signatureDataUrl ||
                        (viewingFileReq.signatureDriveFileId
                          ? getDriveThumbnailUrl(viewingFileReq.signatureDriveFileId, 400)
                          : viewingFileReq.signatureDriveUrl)
                      }
                      alt="Firma digital"
                      className="max-h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer with details */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <div>
                <span>Período de la licencia: </span>
                <strong className="text-slate-900 font-mono">
                  {formatDMY(viewingFileReq.dateFrom)} al {formatDMY(viewingFileReq.dateTo)}
                </strong>
              </div>

              <div>
                <span>Cargado el: </span>
                <strong className="text-slate-900 font-mono">
                  {formatDateTimeDMY(viewingFileReq.createdAt)}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
