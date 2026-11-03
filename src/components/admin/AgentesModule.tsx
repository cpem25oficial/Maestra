import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Edit3, 
  UserX, 
  UserCheck, 
  Eye, 
  Briefcase, 
  Calendar, 
  FileText, 
  X, 
  Check, 
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Upload,
  FileSpreadsheet,
  CheckCheck
} from 'lucide-react';
import { Agent, AssignedPost, LicenseRequest, SisoLicense } from '../../types';
import { dataService, formatDMY } from '../../services/dataService';

export const AgentesModule: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(() => dataService.getAgents());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActivo, setFilterActivo] = useState<'TODOS' | 'ACTIVOS' | 'INACTIVOS'>('TODOS');

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [viewingAgent, setViewingAgent] = useState<Agent | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    apellidos: '',
    nombres: '',
    employeeNumber: '',
    dni: '',
    telefono: '',
    email: '',
    fechaNacimiento: '',
    lugarNacimiento: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const refreshAgents = () => {
    setAgents(dataService.getAgents());
  };

  // Filtered agents (Section 4: Buscar por apellido, nombre, DNI o número de empleado)
  const filteredAgents = useMemo(() => {
    let result = agents;
    if (filterActivo === 'ACTIVOS') result = result.filter((a) => a.activo);
    if (filterActivo === 'INACTIVOS') result = result.filter((a) => !a.activo);

    if (!searchQuery.trim()) return result;
    const q = searchQuery.toLowerCase().trim();

    return result.filter(
      (a) =>
        a.apellidos.toLowerCase().includes(q) ||
        a.nombres.toLowerCase().includes(q) ||
        a.fullName.toLowerCase().includes(q) ||
        a.dni.toLowerCase().includes(q) ||
        a.employeeNumber.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q)
    );
  }, [agents, searchQuery, filterActivo]);

  const handleOpenCreate = () => {
    setEditingAgent(null);
    setFormData({
      apellidos: '',
      nombres: '',
      employeeNumber: '',
      dni: '',
      telefono: '',
      email: '',
      fechaNacimiento: '',
      lugarNacimiento: '',
    });
    setFormError(null);
    setShowCreateModal(true);
  };

  const handleOpenEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setFormData({
      apellidos: agent.apellidos,
      nombres: agent.nombres,
      employeeNumber: agent.employeeNumber,
      dni: agent.dni,
      telefono: agent.telefono || '',
      email: agent.email || '',
      fechaNacimiento: agent.fechaNacimiento || '',
      lugarNacimiento: agent.lugarNacimiento || '',
    });
    setFormError(null);
    setShowCreateModal(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.apellidos.trim() || !formData.nombres.trim()) {
      setFormError('Apellidos y Nombres son obligatorios.');
      return;
    }
    if (!formData.employeeNumber.trim()) {
      setFormError('El Número de empleado es obligatorio.');
      return;
    }
    if (!formData.dni.trim()) {
      setFormError('El DNI es obligatorio.');
      return;
    }

    try {
      if (editingAgent) {
        dataService.updateAgent(editingAgent.id, {
          apellidos: formData.apellidos,
          nombres: formData.nombres,
          employeeNumber: formData.employeeNumber,
          dni: formData.dni,
          telefono: formData.telefono,
          email: formData.email,
          fechaNacimiento: formData.fechaNacimiento,
          lugarNacimiento: formData.lugarNacimiento,
        });
      } else {
        dataService.createAgent({
          apellidos: formData.apellidos,
          nombres: formData.nombres,
          employeeNumber: formData.employeeNumber,
          dni: formData.dni,
          telefono: formData.telefono,
          email: formData.email,
          fechaNacimiento: formData.fechaNacimiento,
          lugarNacimiento: formData.lugarNacimiento,
          activo: true,
        });
      }

      setShowCreateModal(false);
      refreshAgents();
    } catch (err: any) {
      setFormError(err.message || 'Error al guardar el agente.');
    }
  };

  // Section 4 & 21: "Desactivar agente sin eliminar su historial"
  const handleToggleActive = (agent: Agent) => {
    const actionVerb = agent.activo ? 'desactivar' : 'activar';
    const confirmMsg = `¿Está seguro de que desea ${actionVerb} al agente ${agent.fullName}? Su historial laboral y solicitudes permanecerán intactos en el sistema.`;
    if (window.confirm(confirmMsg)) {
      dataService.toggleAgentActive(agent.id, !agent.activo);
      refreshAgents();
      if (viewingAgent?.id === agent.id) {
        setViewingAgent({ ...agent, activo: !agent.activo });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            <span>Módulo de Agentes</span>
          </h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Agente</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Real-time search */}
          <div className="md:col-span-2 relative">
            <input
              type="text"
              placeholder="Buscar por apellido, nombre, DNI o número de empleado..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Active status filter */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            {(['TODOS', 'ACTIVOS', 'INACTIVOS'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterActivo(tab)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filterActivo === tab
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'TODOS' ? 'Todos' : tab === 'ACTIVOS' ? 'Activos' : 'Inactivos'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>Agentes encontrados: <strong>{filteredAgents.length}</strong></span>
          <span className="font-mono text-[11px] text-slate-400">Total registrados: {agents.length}</span>
        </div>
      </div>

      {/* Agents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">AGENTE (APELLIDO Y NOMBRE)</th>
                <th className="py-3 px-3">LEGAJO</th>
                <th className="py-3 px-3">DNI</th>
                <th className="py-3 px-3">CONTACTO</th>
                <th className="py-3 px-3">ESTADO</th>
                <th className="py-3 px-3">PUESTOS ASIGNADOS</th>
                <th className="py-3 px-4 text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredAgents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No se encontraron agentes con los criterios de búsqueda especificados.
                  </td>
                </tr>
              ) : (
                filteredAgents.map((ag) => (
                  <tr key={ag.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Apellido y Nombre */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 text-sm">
                        {ag.fullName}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{ag.lugarNacimiento || 'No especificado'}</span>
                        {ag.fechaNacimiento && (
                          <span>• Nac: {formatDMY(ag.fechaNacimiento)}</span>
                        )}
                      </div>
                    </td>

                    {/* Número de empleado */}
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">
                      {ag.employeeNumber}
                    </td>

                    {/* DNI */}
                    <td className="py-3 px-3 font-mono text-slate-700">
                      {ag.dni}
                    </td>

                    {/* Contacto */}
                    <td className="py-3 px-3 text-xs text-slate-600">
                      <div className="flex items-center gap-1 text-slate-700 truncate max-w-[180px]">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{ag.email}</span>
                      </div>
                      {ag.telefono && (
                        <div className="flex items-center gap-1 text-slate-500 mt-0.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{ag.telefono}</span>
                        </div>
                      )}
                    </td>

                    {/* Estado */}
                    <td className="py-3 px-3">
                      {ag.activo ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          Inactivo
                        </span>
                      )}
                    </td>

                    {/* Puestos Asignados */}
                    <td className="py-3 px-3">
                      {ag.posts && ag.posts.length > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                          <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                          <span>{ag.posts.length} cargo{ag.posts.length > 1 ? 's' : ''}</span>
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Sin cargos</span>
                      )}
                    </td>

                    {/* Acciones */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => setViewingAgent(ag)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver legajo completo y licencias"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(ag)}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Editar datos del agente"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(ag)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            ag.activo
                              ? 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                              : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={ag.activo ? 'Desactivar agente' : 'Activar agente'}
                        >
                          {ag.activo ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-lg">
                  {editingAgent ? 'Editar Datos del Agente' : 'Registrar Nuevo Agente'}
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Apellidos <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: González"
                    value={formData.apellidos}
                    onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nombres <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Martín Alberto"
                    value={formData.nombres}
                    onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Número de empleado / Legajo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: 1042"
                    value={formData.employeeNumber}
                    onChange={(e) => setFormData({ ...formData, employeeNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    DNI <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sin puntos, ej: 28475912"
                    value={formData.dni}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 299-4552190"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="agente@cpem.edu.ar"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Lugar de nacimiento
                  </label>
                  <input
                    type="text"
                    placeholder="Ciudad, Provincia"
                    value={formData.lugarNacimiento}
                    onChange={(e) => setFormData({ ...formData, lugarNacimiento: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-colors"
                >
                  {editingAgent ? 'Guardar Cambios' : 'Registrar Agente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW AGENT FULL PROFILE & HISTORY MODAL (Section 4: Ver los cargos/puestos que ocupa, ver sus licencias, ver sus solicitudes) */}
      {viewingAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                  {viewingAgent.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 leading-tight">
                    {viewingAgent.fullName}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mt-0.5 flex items-center gap-3">
                    <span>Legajo: {viewingAgent.employeeNumber}</span>
                    <span>DNI: {viewingAgent.dni}</span>
                    <span className={viewingAgent.activo ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
                      {viewingAgent.activo ? '● Activo' : '● Inactivo'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setViewingAgent(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* General Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Email:</span>
                <span className="font-semibold text-slate-800 break-all">{viewingAgent.email || '-'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Teléfono:</span>
                <span className="font-semibold text-slate-800">{viewingAgent.telefono || '-'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Nacimiento:</span>
                <span className="font-semibold text-slate-800">{formatDMY(viewingAgent.fechaNacimiento) || '-'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Lugar:</span>
                <span className="font-semibold text-slate-800">{viewingAgent.lugarNacimiento || '-'}</span>
              </div>
            </div>

            {/* Section 4: 1. Cargos y puestos que ocupa */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Cargos y Puestos Ocupados ({viewingAgent.posts?.length || 0})</span>
              </h4>

              {(!viewingAgent.posts || viewingAgent.posts.length === 0) ? (
                <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                  El agente no posee cargos asignados actualmente.
                </p>
              ) : (
                <div className="space-y-2">
                  {viewingAgent.posts.map((p, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs sm:text-sm">
                      <div>
                        <span className="font-bold text-slate-900 block">{p.cargo}</span>
                        <span className="text-slate-500 text-xs">Curso: {p.curso}</span>
                      </div>
                      <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 font-semibold text-xs rounded-md">
                        {p.situacionRevista}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section 4: 2. Solicitudes de licencias del agente */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Solicitudes de Licencias Realizadas</span>
              </h4>

              {(() => {
                const agentReqs = dataService.getRequests().filter(
                  (r) => r.employeeNumber.toLowerCase() === viewingAgent.employeeNumber.toLowerCase()
                );
                if (agentReqs.length === 0) {
                  return (
                    <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                      No hay solicitudes registradas para este agente.
                    </p>
                  );
                }
                return (
                  <div className="max-h-48 overflow-y-auto space-y-2 divide-y divide-slate-100">
                    {agentReqs.map((r) => (
                      <div key={r.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-slate-800">
                            {r.licenseTypeCode} - {r.licenseTypeName} ({r.id})
                          </div>
                          <div className="text-slate-500 text-[11px]">
                            {formatDMY(r.dateFrom)} al {formatDMY(r.dateTo)} • {r.postDescription}
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {r.status}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Section 4: 3. Licencias provenientes de SISO */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Licencias Registradas en SISO</span>
              </h4>

              {(() => {
                const sisoList = dataService.getSisoLicenses().filter(
                  (s) => s.nroEmpleado.toLowerCase() === viewingAgent.employeeNumber.toLowerCase() ||
                         s.dni === viewingAgent.dni
                );
                if (sisoList.length === 0) {
                  return (
                    <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                      No se registran licencias importadas de SISO para este agente.
                    </p>
                  );
                }
                return (
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {sisoList.map((s) => (
                      <div key={s.id} className="p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-emerald-950">
                            {s.codLicencia} - {s.tipo}
                          </div>
                          <div className="text-emerald-700 text-[11px]">
                            {formatDMY(s.desde)} al {formatDMY(s.hasta)} ({s.dias} días) • Auditor: {s.auditor || 'N/A'}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                          {s.id}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setViewingAgent(null)}
                className="py-2 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors"
              >
                Cerrar Legajo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
