import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Plus, 
  Edit3, 
  Trash2, 
  Clock, 
  Calendar, 
  Layers, 
  Copy, 
  Check, 
  X, 
  AlertCircle, 
  ChevronRight, 
  Info,
  UserPlus,
  Users,
  Search,
  Sparkles,
  Filter,
  CheckCheck,
  GripVertical
} from 'lucide-react';
import { Cargo, Puesto, Agent, Horario, DiaSemana } from '../../types';
import { dataService, formatDMY } from '../../services/dataService';

export const CargosPuestosModule: React.FC = () => {
  const [cargos, setCargos] = useState<Cargo[]>(() => dataService.getCargos());
  const [puestos, setPuestos] = useState<Puesto[]>(() => dataService.getPuestos());
  const [agents, setAgents] = useState<Agent[]>(() => dataService.getAgents());
  const [activeLicensesMap, setActiveLicensesMap] = useState(() => dataService.getActiveLicensesMap());
  const [searchQuery, setSearchQuery] = useState('');

  // Drag-and-drop reordering state
  const [draggedCargoId, setDraggedCargoId] = useState<string | null>(null);
  const [dragOverCargoId, setDragOverCargoId] = useState<string | null>(null);

  // Filtering & Pagination State
  const [cursoFilter, setCursoFilter] = useState<string>('TODOS');
  const [turnoFilter, setTurnoFilter] = useState<string>('TODOS');
  const [pageSize, setPageSize] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modals state
  const [selectedCargoDetail, setSelectedCargoDetail] = useState<Cargo | null>(null);
  const [showCargoFormModal, setShowCargoFormModal] = useState(false);
  const [editingCargo, setEditingCargo] = useState<Cargo | null>(null);

  // Assign agent modal state (Section 6 & 14: Botón "+")
  const [assigningPuesto, setAssigningPuesto] = useState<Puesto | null>(null);
  const [assignAgentId, setAssignAgentId] = useState('');
  const [assignSituacion, setAssignSituacion] = useState<'Titular' | 'Interino' | 'Suplente'>('Titular');
  const [assignError, setAssignError] = useState<string | null>(null);

  // Tooltip & Copy state (Section 14: Hover tooltip with Email + copy to clipboard)
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [hoveredAgentInfo, setHoveredAgentInfo] = useState<{
    agent: Agent;
    x: number;
    y: number;
  } | null>(null);

  // Cargo Form fields
  const [cargoForm, setCargoForm] = useState<{
    secuencia: string;
    turno: Cargo['turno'];
    curso: string;
    seccion: string;
    descripcion: string;
    obligaciones: string;
    area: string;
    horarios: Horario[];
    tieneArticulacion: boolean;
    horarioArticulacion?: Horario;
  }>({
    secuencia: '',
    turno: 'Mañana',
    curso: '1°',
    seccion: '1°',
    descripcion: '',
    obligaciones: '',
    area: '',
    horarios: [],
    tieneArticulacion: false,
  });

  const refreshData = () => {
    setCargos(dataService.getCargos());
    setPuestos(dataService.getPuestos());
    setAgents(dataService.getAgents());
    setActiveLicensesMap(dataService.getActiveLicensesMap());
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

  // Open Assign Agent to Post Modal
  const handleOpenAssign = (e: React.MouseEvent, puesto: Puesto) => {
    e.stopPropagation();
    setAssigningPuesto(puesto);
    setAssignAgentId('');
    setAssignSituacion('Titular');
    setAssignError(null);
  };

  const handleConfirmAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigningPuesto || !assignAgentId) {
      setAssignError('Por favor seleccione un agente.');
      return;
    }

    try {
      dataService.assignAgentToPuesto(assigningPuesto.id, assignAgentId, assignSituacion);
      setAssigningPuesto(null);
      refreshData();
    } catch (err: any) {
      setAssignError(err.message || 'Error al asignar el agente.');
    }
  };

  const handleRemoveAgent = (puestoId: string, agenteId: string) => {
    if (window.confirm('¿Desea desasignar este agente del puesto?')) {
      dataService.removeAgentFromPuesto(puestoId, agenteId);
      refreshData();
    }
  };

  // Cargo Create / Edit
  const handleOpenCreateCargo = () => {
    setEditingCargo(null);
    setCargoForm({
      secuencia: `SEC-${Math.floor(100 + Math.random() * 900)}`,
      turno: 'Mañana',
      curso: '1°',
      seccion: '1°',
      descripcion: '',
      obligaciones: '',
      area: 'Exactas y Naturales',
      horarios: [
        { id: 'h-' + Date.now(), dia: 'Lunes', horaIngreso: '08:00', horaSalida: '09:20' },
      ],
      tieneArticulacion: false,
    });
    setShowCargoFormModal(true);
  };

  const handleOpenEditCargo = (cargo: Cargo) => {
    setEditingCargo(cargo);
    setCargoForm({
      secuencia: cargo.secuencia,
      turno: cargo.turno,
      curso: cargo.curso,
      seccion: cargo.seccion,
      descripcion: cargo.descripcion,
      obligaciones: cargo.obligaciones || '',
      area: cargo.area,
      horarios: cargo.horarios ? [...cargo.horarios] : [],
      tieneArticulacion: cargo.tieneArticulacion,
      horarioArticulacion: cargo.horarioArticulacion,
    });
    setShowCargoFormModal(true);
  };

  const handleAddHorario = () => {
    const newH: Horario = {
      id: 'h-' + Date.now(),
      dia: 'Martes',
      horaIngreso: '09:30',
      horaSalida: '10:50',
    };
    setCargoForm({
      ...cargoForm,
      horarios: [...cargoForm.horarios, newH],
    });
  };

  const handleRemoveHorario = (id: string) => {
    setCargoForm({
      ...cargoForm,
      horarios: cargoForm.horarios.filter((h) => h.id !== id),
    });
  };

  const handleSaveCargo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cargoForm.descripcion.trim()) {
      alert('La descripción del cargo es obligatoria.');
      return;
    }

    if (editingCargo) {
      dataService.updateCargo(editingCargo.id, cargoForm);
    } else {
      dataService.createCargo({ ...cargoForm, activo: true });
    }

    setShowCargoFormModal(false);
    refreshData();
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, cargoId: string) => {
    e.dataTransfer.setData('text/plain', cargoId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedCargoId(cargoId);
  };

  const handleDragOver = (e: React.DragEvent, cargoId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCargoId !== cargoId) {
      setDragOverCargoId(cargoId);
    }
  };

  const handleDrop = (e: React.DragEvent, targetCargoId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain') || draggedCargoId;
    if (sourceId && sourceId !== targetCargoId) {
      const targetIndex = cargos.findIndex((c) => c.id === targetCargoId);
      if (targetIndex !== -1) {
        const targetPos = targetIndex + 1;
        const updated = dataService.moveCargoToPosition(sourceId, targetPos);
        setCargos(updated);
      }
    }
    setDraggedCargoId(null);
    setDragOverCargoId(null);
  };

  const handleDragEnd = () => {
    setDraggedCargoId(null);
    setDragOverCargoId(null);
  };

  // Filtered cargos
  const filteredCargos = useMemo(() => {
    return cargos.filter((c) => {
      if (turnoFilter !== 'TODOS' && c.turno !== turnoFilter) return false;
      if (cursoFilter !== 'TODOS' && !c.curso.includes(cursoFilter)) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.descripcion.toLowerCase().includes(q) ||
        c.secuencia.toLowerCase().includes(q) ||
        c.curso.toLowerCase().includes(q) ||
        c.seccion.toLowerCase().includes(q) ||
        c.area.toLowerCase().includes(q)
      );
    });
  }, [cargos, turnoFilter, cursoFilter, searchQuery]);

  const totalPages = pageSize === 9999 ? 1 : Math.ceil(filteredCargos.length / pageSize) || 1;
  const paginatedCargos = useMemo(() => {
    if (pageSize === 9999) return filteredCargos;
    const start = (currentPage - 1) * pageSize;
    return filteredCargos.slice(start, start + pageSize);
  }, [filteredCargos, currentPage, pageSize]);

  const getTurnoShort = (turno: string): string => {
    if (!turno) return '';
    const t = turno.toLowerCase();
    if (t.includes('mañ') || t === 'mañana') return 'TM';
    if (t.includes('tard') || t === 'tarde') return 'TT';
    if (t.includes('cent') || t === 'central') return 'TC';
    if (t.includes('vesp') || t === 'vespertino') return 'TV';
    if (t.includes('ext') || t === 'extendido') return 'TE';
    if (t.includes('inter') || t === 'intermedio') return 'TI';
    return turno.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <span>Cargos y Puestos</span>
          </h1>
        </div>

        <button
          onClick={handleOpenCreateCargo}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Cargo</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-2.5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
          {/* Real-time search */}
          <div className="md:col-span-2 relative">
            <input
              type="text"
              placeholder="Buscar por nombre, secuencia, curso o sección..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
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

          {/* Filter by Curso */}
          <div>
            <select
              value={cursoFilter}
              onChange={(e) => {
                setCursoFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-medium text-slate-700 focus:border-blue-500 transition-all"
            >
              <option value="TODOS">Todos los Cursos</option>
              <option value="1°">1° Año</option>
              <option value="2°">2° Año</option>
              <option value="3°">3° Año</option>
              <option value="4°">4° Año</option>
              <option value="5°">5° Año</option>
              <option value="Institucional">Institucionales / No áulicos</option>
            </select>
          </div>

          {/* Filter by Turno */}
          <div>
            <select
              value={turnoFilter}
              onChange={(e) => {
                setTurnoFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-medium text-slate-700 focus:border-blue-500 transition-all"
            >
              <option value="TODOS">Todos los Turnos</option>
              <option value="Mañana">Turno Mañana (TM)</option>
              <option value="Tarde">Turno Tarde (TT)</option>
              <option value="Central">Turno Central (TC)</option>
              <option value="Extendido">Turno Extendido (TE)</option>
              <option value="Intermedio">Turno Intermedio (TI)</option>
              <option value="Vespertino">Disponibilidad / Vespertino (TV)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div>
            <span>Total: <strong>{filteredCargos.length}</strong> de {cargos.length} cargos</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Por pág:</span>
            {[25, 50, 100, 9999].map((size) => (
              <button
                key={size}
                onClick={() => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                  pageSize === size
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {size === 9999 ? 'Todos' : size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LISTADO PRINCIPAL DE CARGOS Y PUESTOS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200 select-none">
                <th className="py-2.5 px-2.5 w-9 text-center">
                  <GripVertical className="w-3.5 h-3.5 mx-auto text-slate-400" />
                </th>
                <th className="py-2.5 px-3">CARGO</th>
                <th className="py-2.5 px-3">AGENTES ASIGNADOS</th>
                <th className="py-2.5 px-3 text-right w-12">+</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {paginatedCargos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    No se encontraron cargos coincidentes con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                paginatedCargos.map((cargo) => {
                  const puesto = puestos.find((p) => p.cargoId === cargo.id);
                  const assignedList = puesto?.agentesAsignados || [];

                  const cursoClean = cargo.curso ? cargo.curso.replace('° Año', '').replace('°', '').trim() : '';
                  const seccionClean = cargo.seccion ? cargo.seccion.replace('°', '').trim() : '';
                  const turnoShort = getTurnoShort(cargo.turno);
                  const obligShort = cargo.obligaciones ? cargo.obligaciones.replace(/horas?|cátedras?/gi, '').trim() : '';

                  return (
                    <tr
                      key={cargo.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, cargo.id)}
                      onDragOver={(e) => handleDragOver(e, cargo.id)}
                      onDrop={(e) => handleDrop(e, cargo.id)}
                      onDragEnd={handleDragEnd}
                      onClick={() => setSelectedCargoDetail(cargo)}
                      className={`transition-all cursor-pointer group ${
                        dragOverCargoId === cargo.id
                          ? 'bg-blue-100/90 ring-2 ring-inset ring-blue-500 shadow-md'
                          : draggedCargoId === cargo.id
                          ? 'opacity-40 bg-slate-100'
                          : 'hover:bg-blue-50/40'
                      }`}
                    >
                      {/* Column 1: Order only (6 dots drag handle) */}
                      <td
                        className="py-2 px-2.5 align-middle text-center w-9 shrink-0 select-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-grab active:cursor-grabbing inline-flex items-center justify-center transition-colors"
                          title="Arrastrar para ordenar"
                        >
                          <GripVertical className="w-4 h-4" />
                        </div>
                      </td>

                      {/* Column 2: Minimal Cargo Details e.g. Artes Visuales |1|A|TM|4|220| */}
                      <td className="py-2 px-3 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="font-mono text-slate-600">{cargo.secuencia || '-'}</span>
                          <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {cargo.descripcion}
                          </span>
                          <span className="text-slate-300 font-bold select-none">|</span>
                          <span className="font-semibold text-slate-700">{cursoClean || '-'}</span>
                          <span className="text-slate-300 font-bold select-none">|</span>
                          <span className="font-semibold text-slate-700">{seccionClean || '-'}</span>
                          <span className="text-slate-300 font-bold select-none">|</span>
                          <span className="font-bold text-blue-700">{turnoShort}</span>
                          {obligShort && (
                            <>
                              <span className="text-slate-300 font-bold select-none">|</span>
                              <span className="text-slate-600">{obligShort}</span>
                            </>
                          )}
                          <span className="text-slate-300 font-bold select-none">|</span>
                          <span className="text-slate-300 font-bold select-none">|</span>
                        </div>
                      </td>

                      {/* Column 3: Agentes asignados con indicación clara de licencias activas */}
                      <td className="py-2 px-3 align-middle">
                        {assignedList.length === 0 ? (
                          <span className="text-slate-400 italic text-xs">
                            (Vacante)
                          </span>
                        ) : (
                          <div className="flex flex-wrap items-center gap-1.5 text-xs">
                            {assignedList.map((asig, idx) => {
                              const ag = agents.find((a) => a.id === asig.agenteId);
                              const isSpecialNote = asig.notaEspecial || (!ag && asig.observacion);
                              const noteText = asig.notaEspecial || asig.observacion || '';

                              // Check if agent has active license
                              const activeLic = ag ? (
                                (ag.employeeNumber && activeLicensesMap.get(ag.employeeNumber.trim().toLowerCase())) ||
                                (ag.dni && activeLicensesMap.get(ag.dni.replace(/\D/g, ''))) ||
                                (ag.id && activeLicensesMap.get(ag.id))
                              ) : null;

                              return (
                                <React.Fragment key={`asig-${cargo.id}-${asig.agenteId || idx}-${idx}`}>
                                  {idx > 0 && (
                                    <span className="text-slate-300 font-bold select-none">/</span>
                                  )}

                                  {ag ? (
                                    <div
                                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border transition-all ${
                                        activeLic
                                          ? 'bg-rose-50 border-rose-200 text-rose-900'
                                          : 'bg-slate-50 border-slate-200 text-slate-800'
                                      }`}
                                      onMouseEnter={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        setHoveredAgentInfo({
                                          agent: ag,
                                          x: rect.left,
                                          y: rect.top,
                                        });
                                      }}
                                      onMouseLeave={() => setHoveredAgentInfo(null)}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {/* Agent Name & Legajo */}
                                      <span className="font-mono text-[10px] text-slate-500 font-semibold">
                                        {ag.employeeNumber}
                                      </span>
                                      <span className={`font-semibold ${activeLic ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                                        {ag.fullName}
                                      </span>
                                      <span className="text-[10px] text-slate-400">
                                        ({asig.situacionRevista || (idx === 0 ? 'Titular' : 'Suplente')})
                                      </span>

                                      {/* License indicator if active */}
                                      {activeLic ? (
                                        <span
                                          className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 border border-rose-300"
                                          title={`Licencia: ${activeLic.licenseType} (${formatDMY(activeLic.dateFrom)} al ${formatDMY(activeLic.dateTo)})`}
                                        >
                                          🔴 Licencia (hasta {formatDMY(activeLic.dateTo)})
                                        </span>
                                      ) : (
                                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded border border-emerald-200">
                                          🟢 Activo
                                        </span>
                                      )}

                                      {/* Quick remove button */}
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (puesto) handleRemoveAgent(puesto.id, ag.id);
                                        }}
                                        className="text-slate-400 hover:text-red-600 p-0.5 transition-colors ml-0.5"
                                        title="Desasignar del puesto"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ) : isSpecialNote ? (
                                    <span
                                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold border ${
                                        noteText.includes('ASAMBLEA')
                                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                                          : noteText.includes('SP')
                                          ? 'bg-slate-100 text-slate-600 border-slate-300'
                                          : 'bg-rose-50 text-rose-800 border-rose-200'
                                      }`}
                                    >
                                      {noteText.includes('ASAMBLEA')
                                        ? 'En Asamblea'
                                        : noteText.includes('SP')
                                        ? 'Sin Proveer'
                                        : noteText}
                                    </span>
                                  ) : null}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        )}
                      </td>

                      {/* Column 4: Assign button */}
                      <td className="py-2 px-3 text-right align-middle w-12">
                        <button
                          type="button"
                          onClick={(e) => puesto && handleOpenAssign(e, puesto)}
                          className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 transition-colors font-bold text-sm"
                          title="Asignar agente al puesto"
                        >
                          +
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {pageSize !== 9999 && totalPages > 1 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="text-slate-500">
              Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong> (Total: {filteredCargos.length} cargos)
            </div>

            <div className="flex items-center gap-1 self-center">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 disabled:opacity-40 hover:bg-slate-50 font-bold"
              >
                « Primera
              </button>
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 disabled:opacity-40 hover:bg-slate-50 font-bold"
              >
                ‹ Anterior
              </button>

              <span className="px-3 py-1.5 font-bold text-blue-700 bg-blue-50 rounded-lg border border-blue-200">
                {currentPage}
              </span>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 disabled:opacity-40 hover:bg-slate-50 font-bold"
              >
                Siguiente ›
              </button>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 disabled:opacity-40 hover:bg-slate-50 font-bold"
              >
                Última »
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FLOATING HOVER TOOLTIP FOR AGENT EMAIL (Section 14) */}
      {hoveredAgentInfo && (
        <div
          className="fixed z-50 pointer-events-auto bg-slate-900 text-white rounded-xl shadow-xl p-3 text-xs space-y-1.5 animate-fade-in border border-slate-700"
          style={{
            top: Math.max(10, hoveredAgentInfo.y - 75),
            left: Math.max(10, hoveredAgentInfo.x - 20),
          }}
          onMouseEnter={() => {}}
          onMouseLeave={() => setHoveredAgentInfo(null)}
        >
          <div className="font-bold text-slate-200 flex items-center justify-between gap-3">
            <span>{hoveredAgentInfo.agent.fullName}</span>
            <span className="font-mono text-[10px] text-blue-400">Leg: {hoveredAgentInfo.agent.employeeNumber}</span>
          </div>
          <div className="flex items-center justify-between gap-3 bg-slate-800/90 px-2.5 py-1.5 rounded-lg border border-slate-700">
            <span className="font-mono text-[11px] text-slate-300">
              {hoveredAgentInfo.agent.email || 'Sin email registrado'}
            </span>
            {hoveredAgentInfo.agent.email && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyEmail(hoveredAgentInfo.agent.email);
                }}
                className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors flex items-center gap-1"
                title="Copiar al portapapeles"
              >
                {copiedEmail === hoveredAgentInfo.agent.email ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] text-emerald-400 font-bold">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Copiar</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ASSIGN AGENT MODAL (Section 6 & 14) */}
      {assigningPuesto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base">Asignar Agente al Puesto</h3>
              </div>
              <button
                onClick={() => setAssigningPuesto(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              {assigningPuesto.descripcion || 'Puesto institucional'}. Puede asignar múltiples agentes que conservarán su orden de designación.
            </p>

            {assignError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <span>{assignError}</span>
              </div>
            )}

            <form onSubmit={handleConfirmAssign} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Seleccionar Agente <span className="text-red-500">*</span>
                </label>
                <select
                  value={assignAgentId}
                  onChange={(e) => setAssignAgentId(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">-- Seleccionar agente --</option>
                  {agents.filter((a) => a.activo).map((ag) => (
                    <option key={ag.id} value={ag.id}>
                      {ag.fullName} (Legajo {ag.employeeNumber} - DNI {ag.dni})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Situación de Revista
                </label>
                <select
                  value={assignSituacion}
                  onChange={(e) => setAssignSituacion(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="Titular">Titular</option>
                  <option value="Interino">Interino</option>
                  <option value="Suplente">Suplente</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAssigningPuesto(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md"
                >
                  Asignar Agente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETALLE DEL CARGO MODAL (Section 15) */}
      {/* "Al hacer click sobre un cargo, mostrar un panel/modal con:
          - Información completa del cargo
          - Secuencia, Turno, Curso, Sección, Descripción, Obligaciones, Área
          - Todos sus horarios
          - Horario de articulación, si existe (separado)
          - Puestos
          - Agentes asignados" */}
      {selectedCargoDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                  {selectedCargoDetail.secuencia}
                </span>
                <h3 className="font-bold text-lg text-slate-900 mt-1 leading-tight">
                  {selectedCargoDetail.descripcion}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const c = selectedCargoDetail;
                    setSelectedCargoDetail(null);
                    handleOpenEditCargo(c);
                  }}
                  className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                  title="Editar cargo"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedCargoDetail(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Turno:</span>
                <span className="font-semibold text-slate-800">{selectedCargoDetail.turno}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Curso / Sección:</span>
                <span className="font-semibold text-slate-800">{selectedCargoDetail.curso} {selectedCargoDetail.seccion}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Área:</span>
                <span className="font-semibold text-slate-800">{selectedCargoDetail.area}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Estado:</span>
                <span className="font-semibold text-emerald-700">Activo</span>
              </div>
            </div>

            {/* Obligaciones */}
            {selectedCargoDetail.obligaciones && (
              <div className="text-xs bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
                <span className="font-bold text-blue-900 block mb-0.5">Obligaciones asignadas:</span>
                <p className="text-blue-800">{selectedCargoDetail.obligaciones}</p>
              </div>
            )}

            {/* Structured Horarios (Section 7 & 15: ordenados y claros) */}
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Horarios Regulares Estructurados</span>
              </h4>

              {(!selectedCargoDetail.horarios || selectedCargoDetail.horarios.length === 0) ? (
                <p className="text-xs text-slate-400 italic">No hay horarios regulares cargados.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedCargoDetail.horarios.map((h, i) => (
                    <div key={`cargo-detail-h-${selectedCargoDetail.id}-${i}`} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between font-mono">
                      <span className="font-bold text-slate-800">{h.dia}</span>
                      <span className="text-blue-700 font-semibold">{h.horaIngreso} a {h.horaSalida}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Horario de Articulación (Section 7 & 15: visualizado separado) */}
            {(selectedCargoDetail.tieneArticulacion || selectedCargoDetail.tiene_art) && (
              <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  Horario Especial de Articulación:
                </span>
                {selectedCargoDetail.horarioArticulacion ? (
                  <p className="font-mono text-indigo-900 pl-5">
                    {selectedCargoDetail.horarioArticulacion.dia} de {selectedCargoDetail.horarioArticulacion.horaIngreso} a {selectedCargoDetail.horarioArticulacion.horaSalida}
                  </p>
                ) : (
                  <p className="text-indigo-700 pl-5 italic">Posee articulación (horario a convenir).</p>
                )}
              </div>
            )}

            {/* Puestos y Agentes asignados (Section 15) */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Agentes Asignados al Puesto</span>
                </h4>
              </div>

              {(() => {
                const puesto = puestos.find((p) => p.cargoId === selectedCargoDetail.id);
                if (!puesto || puesto.agentesAsignados.length === 0) {
                  return (
                    <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                      Puesto actualmente sin agentes designados.
                    </p>
                  );
                }

                return (
                  <div className="space-y-2">
                    {puesto.agentesAsignados.map((asig, idx) => {
                      const ag = agents.find((a) => a.id === asig.agenteId);
                      if (!ag) return null;

                      return (
                        <div key={`puesto-asig-${asig.agenteId}-${idx}`} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs sm:text-sm">
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center font-mono">
                              {asig.orden}
                            </span>
                            <div>
                              <span className="font-bold text-slate-900 block">{ag.fullName}</span>
                              <span className="text-xs text-slate-500 font-mono">
                                Legajo: {ag.employeeNumber} • DNI: {ag.dni} • {ag.email}
                              </span>
                            </div>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white border border-slate-200 text-slate-700">
                            {asig.situacionRevista || 'Titular'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedCargoDetail(null)}
                className="py-2 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT CARGO MODAL (Section 5, 7) */}
      {showCargoFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-lg">
                  {editingCargo ? 'Editar Cargo Institucional' : 'Crear Nuevo Cargo'}
                </h3>
              </div>
              <button
                onClick={() => setShowCargoFormModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCargo} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Secuencia <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="SEC-101"
                    value={cargoForm.secuencia}
                    onChange={(e) => setCargoForm({ ...cargoForm, secuencia: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Turno <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={cargoForm.turno}
                    onChange={(e) => setCargoForm({ ...cargoForm, turno: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Mañana">Mañana</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Vespertino">Vespertino</option>
                    <option value="Noche">Noche</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Curso y Sección <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Curso (ej: 1°)"
                      value={cargoForm.curso}
                      onChange={(e) => setCargoForm({ ...cargoForm, curso: e.target.value })}
                      className="w-1/2 px-2.5 py-2.5 rounded-xl border border-slate-300"
                    />
                    <input
                      type="text"
                      placeholder="Sec (1°)"
                      value={cargoForm.seccion}
                      onChange={(e) => setCargoForm({ ...cargoForm, seccion: e.target.value })}
                      className="w-1/2 px-2.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Descripción del Cargo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Profesor de Matemática"
                  value={cargoForm.descripcion}
                  onChange={(e) => setCargoForm({ ...cargoForm, descripcion: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Área Disciplinar
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Exactas y Naturales"
                    value={cargoForm.area}
                    onChange={(e) => setCargoForm({ ...cargoForm, area: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Obligaciones
                  </label>
                  <input
                    type="text"
                    placeholder="Planificaciones, mesas..."
                    value={cargoForm.obligaciones}
                    onChange={(e) => setCargoForm({ ...cargoForm, obligaciones: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              {/* Horarios estructurados builder (Section 5 & 7) */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Horarios estructurados del cargo</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddHorario}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar horario</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {cargoForm.horarios.map((h, index) => (
                    <div key={h.id || index} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <select
                        value={h.dia}
                        onChange={(e) => {
                          const updated = [...cargoForm.horarios];
                          updated[index].dia = e.target.value as DiaSemana;
                          setCargoForm({ ...cargoForm, horarios: updated });
                        }}
                        className="px-2 py-1.5 bg-white rounded-lg border border-slate-300 text-xs font-semibold"
                      >
                        {(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'] as DiaSemana[]).map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>

                      <input
                        type="time"
                        value={h.horaIngreso}
                        onChange={(e) => {
                          const updated = [...cargoForm.horarios];
                          updated[index].horaIngreso = e.target.value;
                          setCargoForm({ ...cargoForm, horarios: updated });
                        }}
                        className="px-2 py-1.5 bg-white rounded-lg border border-slate-300 font-mono text-xs"
                      />
                      <span className="text-slate-400">a</span>
                      <input
                        type="time"
                        value={h.horaSalida}
                        onChange={(e) => {
                          const updated = [...cargoForm.horarios];
                          updated[index].horaSalida = e.target.value;
                          setCargoForm({ ...cargoForm, horarios: updated });
                        }}
                        className="px-2 py-1.5 bg-white rounded-lg border border-slate-300 font-mono text-xs"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveHorario(h.id)}
                        className="text-slate-400 hover:text-red-600 p-1 ml-auto"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Articulación toggle & Horario (Section 7) */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 block">¿Tiene horario de articulación?</span>
                    <span className="text-slate-400 text-xs">Horario especial separado del horario normal</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cargoForm.tieneArticulacion}
                      onChange={(e) => setCargoForm({ ...cargoForm, tieneArticulacion: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {cargoForm.tieneArticulacion && (
                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-2">
                    <span className="font-semibold text-indigo-900 text-xs block">Definir horario de articulación:</span>
                    <div className="flex items-center gap-2">
                      <select
                        value={cargoForm.horarioArticulacion?.dia || 'Miércoles'}
                        onChange={(e) =>
                          setCargoForm({
                            ...cargoForm,
                            horarioArticulacion: {
                              id: 'ha-' + Date.now(),
                              dia: e.target.value as DiaSemana,
                              horaIngreso: cargoForm.horarioArticulacion?.horaIngreso || '11:00',
                              horaSalida: cargoForm.horarioArticulacion?.horaSalida || '12:00',
                            },
                          })
                        }
                        className="px-2.5 py-1.5 bg-white rounded-lg border border-slate-300 text-xs font-semibold"
                      >
                        {(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'] as DiaSemana[]).map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      <input
                        type="time"
                        value={cargoForm.horarioArticulacion?.horaIngreso || '11:00'}
                        onChange={(e) =>
                          setCargoForm({
                            ...cargoForm,
                            horarioArticulacion: {
                              id: 'ha-' + Date.now(),
                              dia: cargoForm.horarioArticulacion?.dia || 'Miércoles',
                              horaIngreso: e.target.value,
                              horaSalida: cargoForm.horarioArticulacion?.horaSalida || '12:00',
                            },
                          })
                        }
                        className="px-2 py-1.5 bg-white rounded-lg border border-slate-300 font-mono text-xs"
                      />
                      <span className="text-slate-400 text-xs">a</span>
                      <input
                        type="time"
                        value={cargoForm.horarioArticulacion?.horaSalida || '12:00'}
                        onChange={(e) =>
                          setCargoForm({
                            ...cargoForm,
                            horarioArticulacion: {
                              id: 'ha-' + Date.now(),
                              dia: cargoForm.horarioArticulacion?.dia || 'Miércoles',
                              horaIngreso: cargoForm.horarioArticulacion?.horaIngreso || '11:00',
                              horaSalida: e.target.value,
                            },
                          })
                        }
                        className="px-2 py-1.5 bg-white rounded-lg border border-slate-300 font-mono text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCargoFormModal(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-colors"
                >
                  {editingCargo ? 'Guardar Cambios' : 'Crear Cargo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
