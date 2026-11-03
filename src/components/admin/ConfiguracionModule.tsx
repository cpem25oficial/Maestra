import React, { useState, useMemo } from 'react';
import { 
  Settings, 
  Layers, 
  Plus, 
  Edit3, 
  Check, 
  X, 
  AlertCircle, 
  FileText, 
  Clock, 
  Info,
  ShieldAlert,
  RotateCcw,
  Upload,
  Search,
  FileSpreadsheet,
  CheckCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { LicenseType } from '../../types';
import { dataService } from '../../services/dataService';

export const ConfiguracionModule: React.FC = () => {
  const [types, setTypes] = useState<LicenseType[]>(() => dataService.getAllLicenseTypes());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('TODOS');
  const [statusFilter, setStatusFilter] = useState<string>('TODOS');

  // Modals state
  const [editingType, setEditingType] = useState<LicenseType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [csvInput, setCsvInput] = useState('');
  const [csvMsg, setCsvMsg] = useState<{ text: string; error?: boolean } | null>(null);

  // Form state
  const [formData, setFormData] = useState<{
    code: string;
    name: string;
    category: 'Corta duración' | 'Larga duración' | 'Especial';
    sinLimite: boolean;
    diasTotales: number;
    diasMensuales: number;
    tipoDias: 'habiles' | 'continuos';
    maxDaysPerYear: number;
    maxConsecutiveDays: number;
    maxUsagePerYear: number;
    relacionadoConObligaciones: boolean;
    requiresJustification: boolean;
    justificationHelpText: string;
    requiresObligations: boolean;
    obligationsHelpText: string;
    description: string;
  }>({
    code: '',
    name: '',
    category: 'Corta duración',
    sinLimite: false,
    diasTotales: 6,
    diasMensuales: 2,
    tipoDias: 'habiles',
    maxDaysPerYear: 6,
    maxConsecutiveDays: 2,
    maxUsagePerYear: 6,
    relacionadoConObligaciones: false,
    requiresJustification: true,
    justificationHelpText: '',
    requiresObligations: false,
    obligationsHelpText: '',
    description: '',
  });

  const refreshTypes = () => {
    setTypes([...dataService.getAllLicenseTypes()]);
  };

  const handleOpenCreate = () => {
    setEditingType(null);
    setFormData({
      code: 'LIC-' + (types.length + 1),
      name: '',
      category: 'Corta duración',
      sinLimite: false,
      diasTotales: 10,
      diasMensuales: 2,
      tipoDias: 'habiles',
      maxDaysPerYear: 10,
      maxConsecutiveDays: 2,
      maxUsagePerYear: 5,
      relacionadoConObligaciones: false,
      requiresJustification: true,
      justificationHelpText: '',
      requiresObligations: false,
      obligationsHelpText: '',
      description: '',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (t: LicenseType) => {
    setEditingType(t);
    setFormData({
      code: t.code,
      name: t.name,
      category: t.category,
      sinLimite: t.sinLimite || false,
      diasTotales: t.diasTotales || t.maxDaysPerYear || 1,
      diasMensuales: t.diasMensuales || t.maxConsecutiveDays || 1,
      tipoDias: t.tipoDias || 'habiles',
      maxDaysPerYear: t.diasTotales || t.maxDaysPerYear || 1,
      maxConsecutiveDays: t.diasMensuales || t.maxConsecutiveDays || 1,
      maxUsagePerYear: t.maxUsagePerYear || 5,
      relacionadoConObligaciones: t.relacionadoConObligaciones || false,
      requiresJustification: t.requiresJustification,
      justificationHelpText: t.justificationHelpText || '',
      requiresObligations: t.requiresObligations,
      obligationsHelpText: t.obligationsHelpText || '',
      description: t.description,
    });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code.trim() || !formData.name.trim()) {
      alert('El código y nombre del tipo de licencia son requeridos.');
      return;
    }

    const payload = {
      ...formData,
      maxDaysPerYear: formData.diasTotales,
      maxConsecutiveDays: formData.diasMensuales,
      description: formData.description.trim() || 
        `Régimen: ${formData.diasTotales} días ${formData.tipoDias} anuales (máx. ${formData.diasMensuales} días por mes).`
    };

    if (editingType) {
      dataService.updateLicenseType(editingType.id, payload);
    } else {
      dataService.createLicenseType({ ...payload, active: true });
    }

    setShowModal(false);
    refreshTypes();
  };

  const handleToggleActive = (t: LicenseType) => {
    dataService.updateLicenseType(t.id, { active: !t.active });
    refreshTypes();
  };

  const handleResetToCsv = () => {
    if (window.confirm('¿Desea restablecer todas las licencias a los 28 tipos originales del CSV oficial?')) {
      dataService.resetLicenseTypesToCSVDefault();
      refreshTypes();
    }
  };

  const handleProcessCsvImport = () => {
    if (!csvInput.trim()) {
      setCsvMsg({ text: 'Por favor pegue o cargue las líneas del CSV.', error: true });
      return;
    }
    try {
      const res = dataService.importLicenseTypesFromCSV(csvInput);
      setCsvMsg({ 
        text: `¡Importación exitosa! Total procesadas: ${res.total} (Agregadas: ${res.added}, Actualizadas: ${res.updated})` 
      });
      refreshTypes();
      setTimeout(() => {
        setShowCsvModal(false);
        setCsvMsg(null);
        setCsvInput('');
      }, 1800);
    } catch (err: any) {
      setCsvMsg({ text: err.message || 'Error al procesar el CSV', error: true });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setCsvInput(text);
      }
    };
    reader.readAsText(file);
  };

  // Filtered list
  const filteredTypes = useMemo(() => {
    return types.filter((t) => {
      if (categoryFilter !== 'TODOS' && t.category !== categoryFilter) return false;
      if (statusFilter === 'ACTIVAS' && !t.active) return false;
      if (statusFilter === 'INACTIVAS' && t.active) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    });
  }, [types, searchQuery, categoryFilter, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600" />
            <span>Configuración de Tipos de Licencia y Reglas</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Régimen estatutario escolar: días totales, días mensuales, tipo de días (hábiles / continuos) y justificación.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          <button
            onClick={handleResetToCsv}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-xs transition-all"
            title="Restablece al catálogo original de 28 licencias del CSV"
          >
            <RotateCcw className="w-4 h-4 text-amber-600" />
            <span>Restablecer CSV Oficial</span>
          </button>

          <button
            onClick={() => {
              setCsvMsg(null);
              setShowCsvModal(true);
            }}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-xs transition-all"
          >
            <Upload className="w-4 h-4 text-blue-600" />
            <span>Importar CSV</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Tipo</span>
          </button>
        </div>
      </div>

      {/* Institutional Banner */}
      <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-900 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
            <CheckCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold">Catálogo Oficial de Licencias ({types.length} registradas):</span>{' '}
            <span className="text-blue-800">
              Datos importados del CSV institucional con <strong>días totales</strong>, <strong>días mensuales</strong>, <strong>tipo de días (hábiles / continuos)</strong> y estado de activación.
            </span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-blue-700 text-[11px] font-bold border border-blue-200 shrink-0 self-start sm:self-auto">
          ✓ {types.filter((t) => t.active).length} Activas para Solicitud
        </span>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Real-time search */}
          <div className="md:col-span-2 relative">
            <input
              type="text"
              placeholder="Buscar licencia por nombre, código o normativa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter by Category */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-medium text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            >
              <option value="TODOS">Todas las Categorías</option>
              <option value="Corta duración">Corta duración</option>
              <option value="Larga duración">Larga duración</option>
              <option value="Especial">Especiales</option>
            </select>
          </div>

          {/* Filter by Status */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-medium text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            >
              <option value="TODOS">Todos los Estados</option>
              <option value="ACTIVAS">Solo Activas (Habilitadas)</option>
              <option value="INACTIVAS">Solo Inactivas</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Mostrando <strong>{filteredTypes.length}</strong> de {types.length} licencias</span>
          <span className="text-blue-600 font-medium">Todas disponibles en el formulario de solicitud de licencias</span>
        </div>
      </div>

      {/* License Types Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTypes.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
            No se encontraron tipos de licencia con los filtros aplicados.
          </div>
        ) : (
          filteredTypes.map((type) => {
            const diasTotalesVal = type.diasTotales ?? type.maxDaysPerYear ?? 0;
            const diasMensualesVal = type.diasMensuales ?? type.maxConsecutiveDays ?? 0;
            const tipoDiasVal = type.tipoDias || 'habiles';

            return (
              <div
                key={type.id}
                className={`bg-white rounded-2xl border p-4 sm:p-5 flex flex-col justify-between space-y-3 shadow-xs transition-all ${
                  type.active 
                    ? 'border-slate-200 hover:border-blue-300 hover:shadow-md' 
                    : 'border-slate-200 opacity-60 bg-slate-50'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200">
                          {type.code}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {type.category}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mt-1.5 leading-snug">
                        {type.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenEdit(type)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar parámetros"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(type)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-colors ${
                          type.active 
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300' 
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                      >
                        {type.active ? 'Activa' : 'Inactiva'}
                      </button>
                    </div>
                  </div>

                  {/* PROMINENT CSV RULES HIGHLIGHTS */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {/* Días Totales */}
                    <div className="p-2 rounded-xl bg-blue-50/70 border border-blue-200/80">
                      <span className="text-[10px] uppercase font-bold text-blue-600 block">Días Totales</span>
                      <span className="font-black text-sm text-blue-950 font-mono">
                        {type.sinLimite ? 'Sin límite' : `${diasTotalesVal} días`}
                      </span>
                    </div>

                    {/* Días Mensuales */}
                    <div className="p-2 rounded-xl bg-purple-50/70 border border-purple-200/80">
                      <span className="text-[10px] uppercase font-bold text-purple-600 block">Días Mensuales</span>
                      <span className="font-black text-sm text-purple-950 font-mono">
                        {diasMensualesVal} al mes
                      </span>
                    </div>
                  </div>

                  {/* Tipo de días badge & Justification indicator */}
                  <div className="flex items-center gap-2 flex-wrap text-[11px]">
                    <span className={`px-2 py-0.5 rounded-md font-bold uppercase ${
                      tipoDiasVal === 'habiles' 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      Días {tipoDiasVal}
                    </span>

                    <span className={`px-2 py-0.5 rounded-md font-medium ${
                      type.requiresJustification 
                        ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {type.requiresJustification ? 'Requiere comprobante' : 'Sin comprobante'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {type.description}
                  </p>
                </div>

                {type.justificationHelpText && (
                  <div className="text-[11px] text-amber-800 bg-amber-50/80 p-2 rounded-xl border border-amber-200/70">
                    <span className="font-bold">Comprobante:</span> {type.justificationHelpText}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* EDIT / CREATE RULES MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 my-8 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900">
                <Settings className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base">
                  {editingType ? 'Configurar Parámetros de Licencia' : 'Nuevo Tipo de Licencia'}
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Código (ej: Art. 8D)</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Corta duración">Corta duración</option>
                    <option value="Larga duración">Larga duración</option>
                    <option value="Especial">Especial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre Completo de la Licencia</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: RAZONES PARTICULARES ARTICULO 8D *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              {/* CSV Parameters: Días Totales, Días Mensuales, Tipo de días */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-800 block text-xs">Parámetros del Régimen Estatutario:</span>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Días Totales</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formData.diasTotales}
                      onChange={(e) => setFormData({ ...formData, diasTotales: parseInt(e.target.value) || 1 })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Días Mensuales</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formData.diasMensuales}
                      onChange={(e) => setFormData({ ...formData, diasMensuales: parseInt(e.target.value) || 1 })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Tipo de Días</label>
                    <select
                      value={formData.tipoDias}
                      onChange={(e) => setFormData({ ...formData, tipoDias: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-bold"
                    >
                      <option value="habiles">Hábiles</option>
                      <option value="continuos">Continuos</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                  <input
                    type="checkbox"
                    id="justifCheck"
                    checked={formData.requiresJustification}
                    onChange={(e) => setFormData({ ...formData, requiresJustification: e.target.checked })}
                    className="rounded text-blue-600 cursor-pointer"
                  />
                  <label htmlFor="justifCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Requiere comprobante / constancia médica o institucional
                  </label>
                </div>

                {formData.requiresJustification && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Ayuda de comprobante para el agente</label>
                    <input
                      type="text"
                      placeholder="Ej: Certificado médico oficial de atención espontánea o programada."
                      value={formData.justificationHelpText}
                      onChange={(e) => setFormData({ ...formData, justificationHelpText: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Descripción de la Reglamentación</label>
                <textarea
                  rows={2}
                  placeholder="Detalle reglamentario o informativo..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md"
                >
                  Guardar Configuración
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV IMPORT MODAL */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 my-8 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900">
                <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base">Importar CSV de Licencias</h3>
              </div>
              <button onClick={() => setShowCsvModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Cargue o pegue un archivo CSV con las columnas: <br/>
              <code className="text-blue-700 font-mono font-bold">licencia,dias_totales,tipo_dias,activa,dias_mensuales</code>
            </p>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">Subir archivo .csv:</label>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">O pegue el contenido CSV:</label>
                <textarea
                  rows={8}
                  placeholder={`licencia,dias_totales,tipo_dias,activa,dias_mensuales\nLICENCIA POR CONSULTA MEDICA...,6,habiles,SI,1`}
                  value={csvInput}
                  onChange={(e) => setCsvInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs"
                />
              </div>

              {csvMsg && (
                <div className={`p-3 rounded-xl text-xs font-semibold ${
                  csvMsg.error ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {csvMsg.text}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCsvModal(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleProcessCsvImport}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md"
                >
                  Procesar e Importar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
