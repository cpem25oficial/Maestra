import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  RotateCcw, 
  CheckSquare, 
  Square, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Layers, 
  Calendar, 
  Paperclip, 
  History, 
  X, 
  Edit3,
  FileCheck,
  Ban,
  XCircle,
  HelpCircle,
  Download,
  ExternalLink
} from 'lucide-react';
import { LicenseRequest, LicenseStatus, LicenseType } from '../../types';
import { dataService, calculateDaysBetween, formatDMY, formatDateTimeDMY } from '../../services/dataService';
import { authService } from '../../services/authService';

interface SolicitudesAdminModuleProps {
  initialSelectedRequest?: LicenseRequest | null;
  onClearInitialSelected?: () => void;
}

export const SolicitudesAdminModule: React.FC<SolicitudesAdminModuleProps> = ({
  initialSelectedRequest,
  onClearInitialSelected,
}) => {
  const [requests, setRequests] = useState<LicenseRequest[]>(() => dataService.getRequests());
  const [licenseTypes, setLicenseTypes] = useState<LicenseType[]>(() => dataService.getAllLicenseTypes());
  const currentUser = authService.getCurrentUser();

  // Multi-selection for Bulk Modification (Section 18)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<LicenseStatus>('Autorizada');
  const [bulkObservation, setBulkObservation] = useState('');

  // Single Status Change Modal (Section 16)
  const [statusChangeReq, setStatusChangeReq] = useState<LicenseRequest | null>(
    initialSelectedRequest || null
  );
  const [newStatus, setNewStatus] = useState<LicenseStatus>('Autorizada');
  const [statusObservation, setStatusObservation] = useState('');

  // View Details & Attachment Modal
  const [viewingRequest, setViewingRequest] = useState<LicenseRequest | null>(null);

  // Toggle filters visibility
  const [showFilters, setShowFilters] = useState(false);

  // Section 17: Combined Filters
  const [filterNombre, setFilterNombre] = useState('');
  const [filterApellido, setFilterApellido] = useState('');
  const [filterDni, setFilterDni] = useState('');
  const [filterEmployeeNumber, setFilterEmployeeNumber] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('TODOS');
  const [filterLicenseType, setFilterLicenseType] = useState<string>('TODOS');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [filterArticulation, setFilterArticulation] = useState<string>('TODOS'); // 'TODOS' | 'SI' | 'NO'

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filterNombre.trim()) count++;
    if (filterApellido.trim()) count++;
    if (filterDni.trim()) count++;
    if (filterEmployeeNumber.trim()) count++;
    if (filterStatus !== 'TODOS') count++;
    if (filterLicenseType !== 'TODOS') count++;
    if (filterDateFrom) count++;
    if (filterDateTo) count++;
    if (filterArticulation !== 'TODOS') count++;
    return count;
  }, [
    filterNombre,
    filterApellido,
    filterDni,
    filterEmployeeNumber,
    filterStatus,
    filterLicenseType,
    filterDateFrom,
    filterDateTo,
    filterArticulation,
  ]);

  const refreshRequests = () => {
    setRequests(dataService.getRequests());
  };

  // Section 17: "Limpiar filtros"
  const handleClearFilters = () => {
    setFilterNombre('');
    setFilterApellido('');
    setFilterDni('');
    setFilterEmployeeNumber('');
    setFilterStatus('TODOS');
    setFilterLicenseType('TODOS');
    setFilterDateFrom('');
    setFilterDateTo('');
    setFilterArticulation('TODOS');
  };

  // Combined Filters Logic (Section 17)
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      if (filterNombre.trim()) {
        const q = filterNombre.toLowerCase().trim();
        if (!r.agentName.toLowerCase().includes(q)) return false;
      }

      if (filterApellido.trim()) {
        const q = filterApellido.toLowerCase().trim();
        if (!r.agentName.toLowerCase().includes(q)) return false;
      }

      if (filterDni.trim()) {
        const q = filterDni.replace(/\D/g, '');
        if (!r.agentDni.includes(q)) return false;
      }

      if (filterEmployeeNumber.trim()) {
        const q = filterEmployeeNumber.toLowerCase().trim();
        if (!r.employeeNumber.toLowerCase().includes(q)) return false;
      }

      if (filterStatus !== 'TODOS' && r.status !== filterStatus) {
        return false;
      }

      if (filterLicenseType !== 'TODOS' && r.licenseTypeId !== filterLicenseType) {
        return false;
      }

      if (filterDateFrom && r.dateFrom < filterDateFrom) {
        return false;
      }

      if (filterDateTo && r.dateTo > filterDateTo) {
        return false;
      }

      if (filterArticulation === 'SI' && !r.isArticulation) return false;
      if (filterArticulation === 'NO' && r.isArticulation) return false;

      return true;
    });
  }, [
    requests,
    filterNombre,
    filterApellido,
    filterDni,
    filterEmployeeNumber,
    filterStatus,
    filterLicenseType,
    filterDateFrom,
    filterDateTo,
    filterArticulation,
  ]);

  // Checkbox handlers for Bulk Actions (Section 18)
  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredRequests.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRequests.map((r) => r.id));
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Status Badge Helper
  const getStatusBadge = (status: LicenseStatus) => {
    switch (status) {
      case 'Pendiente':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            Pendiente
          </span>
        );
      case 'Autorizada':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            Autorizada
          </span>
        );
      case 'Justificada':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            <FileCheck className="w-3 h-3 text-emerald-600" />
            Justificada
          </span>
        );
      case 'Completada':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
            <CheckCircle2 className="w-3 h-3 text-slate-600" />
            Completada
          </span>
        );
      case 'Rechazada':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
            <XCircle className="w-3 h-3 text-red-600" />
            Rechazada
          </span>
        );
      case 'Injustificada':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
            <AlertCircle className="w-3 h-3 text-orange-600" />
            Injustificada
          </span>
        );
      case 'Descuento':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
            <Ban className="w-3 h-3 text-purple-600" />
            Descuento
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
            {status}
          </span>
        );
    }
  };

  // Open single state change modal
  const handleOpenStatusChange = (req: LicenseRequest) => {
    setStatusChangeReq(req);
    setNewStatus(req.status);
    setStatusObservation('');
  };

  const handleConfirmStatusChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusChangeReq) return;

    dataService.updateRequestStatus(
      statusChangeReq.id,
      newStatus,
      currentUser?.email || 'admin@cpem.edu.ar',
      statusObservation || 'Actualización de estado realizada desde secretaría.'
    );

    setStatusChangeReq(null);
    if (onClearInitialSelected) onClearInitialSelected();
    refreshRequests();
  };

  // Section 18: Execute Bulk Status Change
  const handleExecuteBulkChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) return;

    dataService.bulkUpdateStatus(
      selectedIds,
      bulkStatus,
      currentUser?.email || 'admin@cpem.edu.ar',
      bulkObservation || 'Modificación masiva autorizada por secretaría institucional.'
    );

    setShowBulkModal(false);
    setSelectedIds([]);
    setBulkObservation('');
    refreshRequests();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <span>Solicitudes de Licencia</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* Toggle Filters Button */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
              showFilters || activeFiltersCount > 0
                ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-xs'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-4 h-4 text-blue-600" />
            <span>{showFilters ? 'Ocultar Filtros' : 'Filtros'}</span>
            {activeFiltersCount > 0 && (
              <span className="w-4.5 h-4.5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Section 18: Modificar estado seleccionado */}
          {selectedIds.length > 0 && (
            <button
              onClick={() => setShowBulkModal(true)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all animate-scale-up"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Modificar ({selectedIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* ACTIVE FILTERS SUMMARY WHEN PANEL IS HIDDEN */}
      {!showFilters && activeFiltersCount > 0 && (
        <div className="p-2.5 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>
              Filtros activos (<strong>{activeFiltersCount}</strong>): <strong>{filteredRequests.length}</strong> solicitudes coincidentes
            </span>
          </div>
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-xs text-blue-700 hover:text-blue-900 font-bold underline"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* COMPACT FILTERS PANEL (Shown only when toggled) */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs space-y-3 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xs sm:text-sm">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>Filtros de búsqueda</span>
              <span className="text-slate-400 font-normal">({filteredRequests.length} de {requests.length})</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpiar</span>
              </button>
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-600 mb-0.5 text-[11px]">Agente</label>
              <input
                type="text"
                placeholder="Nombre o apellido..."
                value={filterNombre}
                onChange={(e) => setFilterNombre(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 focus:border-blue-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-0.5 text-[11px]">DNI / Legajo</label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="DNI"
                  value={filterDni}
                  onChange={(e) => setFilterDni(e.target.value)}
                  className="w-1/2 px-2 py-1.5 rounded-lg border border-slate-300 font-mono text-xs"
                />
                <input
                  type="text"
                  placeholder="Legajo"
                  value={filterEmployeeNumber}
                  onChange={(e) => setFilterEmployeeNumber(e.target.value)}
                  className="w-1/2 px-2 py-1.5 rounded-lg border border-slate-300 font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-0.5 text-[11px]">Estado</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
              >
                <option value="TODOS">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Autorizada">Autorizada</option>
                <option value="Justificada">Justificada</option>
                <option value="Completada">Completada</option>
                <option value="Rechazada">Rechazada</option>
                <option value="Injustificada">Injustificada</option>
                <option value="Descuento">Descuento</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-0.5 text-[11px]">Tipo de Licencia</label>
              <select
                value={filterLicenseType}
                onChange={(e) => setFilterLicenseType(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs truncate"
              >
                <option value="TODOS">Todas las licencias</option>
                {licenseTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.code} - {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-0.5 text-[11px]">Desde</label>
              <input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-0.5 text-[11px]">Hasta</label>
              <input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-0.5 text-[11px]">Articulación</label>
              <select
                value={filterArticulation}
                onChange={(e) => setFilterArticulation(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
              >
                <option value="TODOS">Todas</option>
                <option value="SI">Solo Articulación</option>
                <option value="NO">Sin Articulación</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="w-full bg-slate-50 py-1.5 px-2.5 rounded-lg border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                <span>Resultados:</span>
                <strong className="text-slate-900 font-mono text-xs">{filteredRequests.length}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPACT REQUESTS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[780px]">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-2.5 w-8 text-center">
                  <input
                    type="checkbox"
                    checked={
                      filteredRequests.length > 0 &&
                      selectedIds.length === filteredRequests.length
                    }
                    onChange={handleToggleSelectAll}
                    className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="py-2.5 px-2.5">AGENTE</th>
                <th className="py-2.5 px-2.5">LICENCIA</th>
                <th className="py-2.5 px-2.5">PERÍODO</th>
                <th className="py-2.5 px-2 text-center">ART.</th>
                <th className="py-2.5 px-2 text-center">OBLIG.</th>
                <th className="py-2.5 px-2.5">ESTADO</th>
                <th className="py-2.5 px-2 text-center">ADJ.</th>
                <th className="py-2.5 px-3 text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-slate-400">
                    No se encontraron solicitudes con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => {
                  const isSelected = selectedIds.includes(req.id);
                  const totalDays = calculateDaysBetween(req.dateFrom, req.dateTo);

                  return (
                    <tr
                      key={req.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isSelected ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      {/* Checkbox for Bulk Modification */}
                      <td className="py-2 px-2.5 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectOne(req.id)}
                          className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>

                      {/* Agente */}
                      <td className="py-2 px-2.5">
                        <div className="font-bold text-slate-900 leading-tight">{req.agentName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Leg. {req.employeeNumber} • DNI {req.agentDni}
                        </div>
                      </td>

                      {/* Licencia */}
                      <td className="py-2 px-2.5">
                        <div className="font-semibold text-blue-700 leading-tight">
                          {req.licenseTypeCode} - {req.licenseTypeName}
                        </div>
                        {req.postDescription && (
                          <div className="text-[10px] text-slate-400 truncate max-w-[180px]" title={req.postDescription}>
                            {req.postDescription}
                          </div>
                        )}
                      </td>

                      {/* Período: Desde / Hasta */}
                      <td className="py-2 px-2.5 whitespace-nowrap">
                        <div className="font-mono text-slate-800 font-semibold leading-tight text-xs">
                          {formatDMY(req.dateFrom)} al {formatDMY(req.dateTo)}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {totalDays} día{totalDays > 1 ? 's' : ''}
                        </div>
                      </td>

                      {/* Articulación */}
                      <td className="py-2 px-2 text-center">
                        {req.isArticulation ? (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                            SÍ
                          </span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>

                      {/* Cantidad de obligaciones */}
                      <td className="py-2 px-2 text-center">
                        {req.cantidadObligaciones !== undefined && req.cantidadObligaciones > 0 ? (
                          <span className="px-1.5 py-0.2 rounded text-[11px] font-mono font-bold bg-slate-100 text-slate-700" title={req.obligaciones}>
                            {req.cantidadObligaciones}
                          </span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>

                      {/* Estado */}
                      <td className="py-2 px-2.5">
                        <button
                          type="button"
                          onClick={() => handleOpenStatusChange(req)}
                          className="hover:opacity-80 transition-opacity cursor-pointer text-left"
                          title="Click para cambiar estado"
                        >
                          {getStatusBadge(req.status)}
                        </button>
                      </td>

                      {/* Adjunto */}
                      <td className="py-2 px-2 text-center">
                        {req.justificationName ? (
                          <button
                            type="button"
                            onClick={() => setViewingRequest(req)}
                            className="inline-flex items-center gap-0.5 text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200"
                            title={req.justificationName}
                          >
                            <Paperclip className="w-3 h-3" />
                            <span>Ver</span>
                          </button>
                        ) : (
                          <span className="text-slate-300 text-xs">-</span>
                        )}
                      </td>

                      {/* Acciones */}
                      <td className="py-2 px-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {req.status === 'Pendiente' && (
                            <button
                              type="button"
                              onClick={() => {
                                dataService.updateRequestStatus(
                                  req.id,
                                  'Autorizada',
                                  currentUser?.email || 'cpem25oficial@gmail.com',
                                  'Solicitud autorizada por secretaría. A la espera de que el agente adjunte comprobante de justificación.'
                                );
                                refreshRequests();
                              }}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg shadow-2xs transition-colors"
                              title="Autorizar solicitud directamente"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Autorizar</span>
                            </button>
                          )}
                          <button
                            onClick={() => setViewingRequest(req)}
                            className="p-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver detalle completo"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenStatusChange(req)}
                            className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Modificar estado y dictamen"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SINGLE STATUS CHANGE MODAL WITH OBSERVATION (Section 9 & 16) */}
      {statusChangeReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900">
                <Edit3 className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base">Modificar Estado de Solicitud</h3>
              </div>
              <button
                onClick={() => setStatusChangeReq(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
              <div className="font-bold text-slate-800">{statusChangeReq.agentName}</div>
              <div className="text-slate-500">
                {statusChangeReq.licenseTypeCode} - {statusChangeReq.licenseTypeName} ({statusChangeReq.id})
              </div>
              <div className="text-slate-500 font-mono">
                Del {formatDMY(statusChangeReq.dateFrom)} al {formatDMY(statusChangeReq.dateTo)}
              </div>
            </div>

            <form onSubmit={handleConfirmStatusChange} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nuevo Estado <span className="text-red-500">*</span>
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as LicenseStatus)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-bold"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Autorizada">Autorizada</option>
                  <option value="Justificada">Justificada</option>
                  <option value="Completada">Completada</option>
                  <option value="Rechazada">Rechazada</option>
                  <option value="Injustificada">Injustificada</option>
                  <option value="Descuento">Descuento</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Detalle / Observación del cambio <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ingrese el dictamen, número de resolución o motivo de la modificación..."
                  value={statusObservation}
                  onChange={(e) => setStatusObservation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStatusChangeReq(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-colors"
                >
                  Guardar Dictamen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK STATUS CHANGE MODAL (Section 18) */}
      {/* "El listado de solicitudes debe permitir seleccionar varias filas mediante checkbox.
          Acción: Modificar estado seleccionado.
          El administrador podrá seleccionar múltiples solicitudes y cambiar su estado en una sola operación.
          Antes de ejecutar la modificación, mostrar confirmación.
          Registrar cada cambio individualmente en el historial." */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-indigo-100 p-6 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900">
                <CheckSquare className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base">Modificación Masiva de Estado</h3>
              </div>
              <button
                onClick={() => setShowBulkModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Está a punto de modificar en lote el estado de <strong>{selectedIds.length} solicitudes seleccionadas</strong>.
            </p>

            <form onSubmit={handleExecuteBulkChange} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nuevo Estado para todas las solicitudes <span className="text-red-500">*</span>
                </label>
                <select
                  value={bulkStatus}
                  onChange={(e) => setBulkStatus(e.target.value as LicenseStatus)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-indigo-950 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                >
                  <option value="Autorizada">Autorizada</option>
                  <option value="Justificada">Justificada</option>
                  <option value="Completada">Completada</option>
                  <option value="Rechazada">Rechazada</option>
                  <option value="Injustificada">Injustificada</option>
                  <option value="Descuento">Descuento</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Observación para el historial de cada solicitud
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej: Aprobación masiva correspondiente a mesa de examen / junta médica..."
                  value={bulkObservation}
                  onChange={(e) => setBulkObservation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm"
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1">
                <span className="font-bold block">Confirmación requerida:</span>
                <p>Esta acción actualizará individualmente la trazabilidad de cada una de las {selectedIds.length} solicitudes.</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md"
                >
                  Confirmar Modificación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL & HISTORY MODAL (Section 9, 10, 12, 16) */}
      {viewingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">Trámite N°: {viewingRequest.id}</span>
                <h3 className="font-bold text-lg text-slate-900 mt-0.5 leading-tight">
                  {viewingRequest.agentName}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(viewingRequest.status)}
                <button
                  onClick={() => setViewingRequest(null)}
                  className="text-slate-400 hover:text-slate-600 p-1 ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Request Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Legajo / DNI:</span>
                <span className="font-mono font-bold text-slate-800">{viewingRequest.employeeNumber} • {viewingRequest.agentDni}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Licencia:</span>
                <span className="font-semibold text-blue-700">{viewingRequest.licenseTypeCode} - {viewingRequest.licenseTypeName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Período:</span>
                <span className="font-semibold text-slate-800">
                  {formatDMY(viewingRequest.dateFrom)} al {formatDMY(viewingRequest.dateTo)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Puesto:</span>
                <span className="font-medium text-slate-800">{viewingRequest.postDescription}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Articulación:</span>
                <span className="font-semibold text-slate-800">{viewingRequest.isArticulation ? 'SÍ' : 'NO'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Obligaciones:</span>
                <span className="font-semibold text-slate-800">
                  {viewingRequest.obligations || (viewingRequest.cantidadObligaciones ? `${viewingRequest.cantidadObligaciones} declaradas` : 'Ninguna')}
                </span>
              </div>
            </div>

            {/* Note & Detail */}
            {(viewingRequest.note || viewingRequest.detail || viewingRequest.obligaciones) && (
              <div className="space-y-2 text-xs">
                {viewingRequest.detail && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <strong className="text-slate-700 block">Motivo / Detalle de la solicitud:</strong>
                    <p className="text-slate-600 mt-0.5">{viewingRequest.detail}</p>
                  </div>
                )}
                {viewingRequest.note && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <strong className="text-slate-700 block">Nota del agente:</strong>
                    <p className="text-slate-600 mt-0.5">{viewingRequest.note}</p>
                  </div>
                )}
                {viewingRequest.obligaciones && (
                  <div className="bg-indigo-50/60 p-3 rounded-lg border border-indigo-100">
                    <strong className="text-indigo-900 block">Obligaciones pedagógicas:</strong>
                    <p className="text-indigo-800 mt-0.5">{viewingRequest.obligaciones}</p>
                  </div>
                )}
              </div>
            )}

            {/* Attached file (Section 10: JPG, JPEG, PDF con vista previa o descarga) */}
            {viewingRequest.justificationName && (
              <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-2">
                <span className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 text-emerald-600" />
                  Documentación Adjunta
                </span>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-900 truncate max-w-sm">
                    {viewingRequest.justificationName}
                  </span>
                  <div className="flex items-center gap-2">
                    {viewingRequest.justificationDriveUrl && (
                      <a
                        href={viewingRequest.justificationDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg border border-blue-300 transition-colors shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Ver en Drive ↗</span>
                      </a>
                    )}
                    <a
                      href={viewingRequest.justificationDataUrl || '#'}
                      download={viewingRequest.justificationName}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-800 font-semibold rounded-lg border border-emerald-300 transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Signature preview (Section 12) */}
            {viewingRequest.signatureDataUrl && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-700">
                    Firma manuscrita del solicitante:
                  </span>
                  {viewingRequest.signatureDriveUrl && (
                    <a
                      href={viewingRequest.signatureDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Ver firma en Drive ↗</span>
                    </a>
                  )}
                </div>
                <div className="h-20 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center p-2">
                  <img src={viewingRequest.signatureDataUrl} alt="Firma digital" className="max-h-full object-contain" />
                </div>
              </div>
            )}

            {/* Request State History (Section 9: Historial de cambios con anterior, nuevo, fecha, usuario, detalle) */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                <History className="w-4 h-4 text-indigo-600" />
                <span>Historial de Dictámenes y Cambios de Estado</span>
              </h4>

              {(!viewingRequest.historialEstados || viewingRequest.historialEstados.length === 0) ? (
                <p className="text-xs text-slate-400 italic">No registra cambios de estado posteriores a su creación.</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {viewingRequest.historialEstados.map((h) => (
                    <div key={h.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800">
                          De <span className="font-bold">{h.estadoAnterior}</span> a{' '}
                          <span className="font-bold text-blue-700">{h.estadoNuevo}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {formatDateTimeDMY(h.fecha)}
                        </span>
                      </div>
                      <p className="text-slate-600">{h.detalle}</p>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        Por: {h.usuario}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setViewingRequest(null)}
                className="py-2 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
