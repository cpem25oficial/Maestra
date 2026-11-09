import React, { useState, useMemo, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Layers, 
  Network, 
  Printer, 
  RefreshCw, 
  BookOpen, 
  User, 
  SlidersHorizontal,
  ArrowRight,
  HelpCircle,
  CalendarDays,
  Grid3X3,
  ListFilter
} from 'lucide-react';
import { Cargo, Horario, DiaSemana, Puesto, Agent } from '../../types';
import { dataService } from '../../services/dataService';

const DIAS_SEMANA: DiaSemana[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// Presets escolares del CPEM N° 25 según turno
interface ModuloPreset {
  nombre: string;
  horaIngreso: string;
  horaSalida: string;
  duracionMin: number;
}

const MODULOS_MANANA: ModuloPreset[] = [
  { nombre: '1° Bloque (07:45 - 09:05)', horaIngreso: '07:45', horaSalida: '09:05', duracionMin: 80 },
  { nombre: '2° Bloque (09:15 - 10:35)', horaIngreso: '09:15', horaSalida: '10:35', duracionMin: 80 },
  { nombre: '3° Bloque (10:45 - 12:05)', horaIngreso: '10:45', horaSalida: '12:05', duracionMin: 80 },
  { nombre: '4° Bloque (12:15 - 13:35)', horaIngreso: '12:15', horaSalida: '13:35', duracionMin: 80 },
  { nombre: 'Mód. 1 (07:45 - 08:25)', horaIngreso: '07:45', horaSalida: '08:25', duracionMin: 40 },
  { nombre: 'Mód. 2 (08:25 - 09:05)', horaIngreso: '08:25', horaSalida: '09:05', duracionMin: 40 },
  { nombre: 'Mód. 3 (09:15 - 09:55)', horaIngreso: '09:15', horaSalida: '09:55', duracionMin: 40 },
  { nombre: 'Mód. 4 (09:55 - 10:35)', horaIngreso: '09:55', horaSalida: '10:35', duracionMin: 40 },
  { nombre: 'Mód. 5 (10:45 - 11:25)', horaIngreso: '10:45', horaSalida: '11:25', duracionMin: 40 },
  { nombre: 'Mód. 6 (11:25 - 12:05)', horaIngreso: '11:25', horaSalida: '12:05', duracionMin: 40 },
];

const MODULOS_TARDE: ModuloPreset[] = [
  { nombre: '1° Bloque (13:30 - 14:50)', horaIngreso: '13:30', horaSalida: '14:50', duracionMin: 80 },
  { nombre: '2° Bloque (15:00 - 16:20)', horaIngreso: '15:00', horaSalida: '16:20', duracionMin: 80 },
  { nombre: '3° Bloque (16:30 - 17:50)', horaIngreso: '16:30', horaSalida: '17:50', duracionMin: 80 },
  { nombre: '4° Bloque (18:00 - 19:20)', horaIngreso: '18:00', horaSalida: '19:20', duracionMin: 80 },
  { nombre: 'Mód. 1 (13:30 - 14:10)', horaIngreso: '13:30', horaSalida: '14:10', duracionMin: 40 },
  { nombre: 'Mód. 2 (14:10 - 14:50)', horaIngreso: '14:10', horaSalida: '14:50', duracionMin: 40 },
  { nombre: 'Mód. 3 (15:00 - 15:40)', horaIngreso: '15:00', horaSalida: '15:40', duracionMin: 40 },
  { nombre: 'Mód. 4 (15:40 - 16:20)', horaIngreso: '15:40', horaSalida: '16:20', duracionMin: 40 },
  { nombre: 'Mód. 5 (16:30 - 17:10)', horaIngreso: '16:30', horaSalida: '17:10', duracionMin: 40 },
  { nombre: 'Mód. 6 (17:10 - 17:50)', horaIngreso: '17:10', horaSalida: '17:50', duracionMin: 40 },
];

const MODULOS_VESPERTINO: ModuloPreset[] = [
  { nombre: '1° Bloque (18:00 - 19:20)', horaIngreso: '18:00', horaSalida: '19:20', duracionMin: 80 },
  { nombre: '2° Bloque (19:30 - 20:50)', horaIngreso: '19:30', horaSalida: '20:50', duracionMin: 80 },
  { nombre: '3° Bloque (21:00 - 22:20)', horaIngreso: '21:00', horaSalida: '22:20', duracionMin: 80 },
  { nombre: 'Mód. 1 (18:00 - 18:40)', horaIngreso: '18:00', horaSalida: '18:40', duracionMin: 40 },
  { nombre: 'Mód. 2 (18:40 - 19:20)', horaIngreso: '18:40', horaSalida: '19:20', duracionMin: 40 },
  { nombre: 'Mód. 3 (19:30 - 20:10)', horaIngreso: '19:30', horaSalida: '20:10', duracionMin: 40 },
  { nombre: 'Mód. 4 (20:10 - 20:50)', horaIngreso: '20:10', horaSalida: '20:50', duracionMin: 40 },
  { nombre: 'Mód. 5 (21:00 - 21:40)', horaIngreso: '21:00', horaSalida: '21:40', duracionMin: 40 },
  { nombre: 'Mód. 6 (21:40 - 22:20)', horaIngreso: '21:40', horaSalida: '22:20', duracionMin: 40 },
];

export const HorariosModule: React.FC = () => {
  const [cargos, setCargos] = useState<Cargo[]>(() => dataService.getCargos());
  const [puestos, setPuestos] = useState<Puesto[]>(() => dataService.getPuestos());
  const [agents, setAgents] = useState<Agent[]>(() => dataService.getAgents());

  // View mode: 'list' or 'grid' (Parrilla Semanal)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [turnoFilter, setTurnoFilter] = useState<string>('TODOS');
  const [cursoFilter, setCursoFilter] = useState<string>('TODOS');
  const [divisionFilter, setDivisionFilter] = useState<string>('TODOS');
  const [estadoFilter, setEstadoFilter] = useState<'TODOS' | 'SIN_HORARIO' | 'CON_HORARIO' | 'CON_ARTICULACION'>('TODOS');

  // Parrilla Semanal filter selection
  const [gridCurso, setGridCurso] = useState<string>('1°');
  const [gridDivision, setGridDivision] = useState<string>('Div. A');
  const [gridTurno, setGridTurno] = useState<string>('Mañana');

  // Pagination
  const [pageSize, setPageSize] = useState<number>(30);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Edit schedule modal state
  const [editingCargo, setEditingCargo] = useState<Cargo | null>(null);
  const [editHorarios, setEditHorarios] = useState<Horario[]>([]);
  const [editTieneArt, setEditTieneArt] = useState<boolean>(false);
  const [editHorarioArt, setEditHorarioArt] = useState<Horario>({
    id: 'temp-art',
    dia: 'Miércoles',
    horaIngreso: '11:00',
    horaSalida: '12:00',
    articulacion: true
  });
  const [modalFeedback, setModalFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [savingSchedule, setSavingSchedule] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync latest data
  const refreshData = () => {
    setCargos(dataService.getCargos());
    setPuestos(dataService.getPuestos());
    setAgents(dataService.getAgents());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Map of cargoId to assigned Docente info
  const docentesMap = useMemo(() => {
    const map = new Map<string, { nombre: string; legajo: string; situacion: string }>();
    for (const p of puestos) {
      if (p.agentesAsignados && p.agentesAsignados.length > 0) {
        const asig = p.agentesAsignados[0];
        const ag = agents.find((a) => a.id === asig.agenteId);
        if (ag) {
          map.set(p.cargoId, {
            nombre: `${ag.apellidos}, ${ag.nombres}`,
            legajo: String(ag.legajo || ag.employeeNumber || ''),
            situacion: asig.situacionRevista || 'Interino'
          });
        }
      }
    }
    return map;
  }, [puestos, agents]);

  // Distinct filter options
  const distinctCursos = useMemo(() => {
    const set = new Set<string>();
    cargos.forEach((c) => {
      if (c.curso) set.add(c.curso);
    });
    return Array.from(set).sort();
  }, [cargos]);

  const distinctDivisiones = useMemo(() => {
    const set = new Set<string>();
    cargos.forEach((c) => {
      if (c.seccion) set.add(c.seccion);
    });
    return Array.from(set).sort();
  }, [cargos]);

  // Overall Statistics
  const stats = useMemo(() => {
    const total = cargos.length;
    let conHorario = 0;
    let sinHorario = 0;
    let conArticulacion = 0;
    let totalBloques = 0;

    for (const c of cargos) {
      const cantH = c.horarios ? c.horarios.length : 0;
      if (cantH > 0) {
        conHorario++;
        totalBloques += cantH;
      } else {
        sinHorario++;
      }
      if (c.tieneArticulacion || c.tiene_art) {
        conArticulacion++;
      }
    }

    return { total, conHorario, sinHorario, conArticulacion, totalBloques };
  }, [cargos]);

  // Filtered cargos list
  const filteredCargos = useMemo(() => {
    return cargos.filter((c) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const doc = docentesMap.get(c.id)?.nombre.toLowerCase() || '';
        const matchDesc = c.descripcion?.toLowerCase().includes(q);
        const matchSec = String(c.secuencia || '').toLowerCase().includes(q);
        const matchCurso = c.curso?.toLowerCase().includes(q);
        const matchSecDiv = c.seccion?.toLowerCase().includes(q);
        const matchDoc = doc.includes(q);
        if (!matchDesc && !matchSec && !matchCurso && !matchSecDiv && !matchDoc) {
          return false;
        }
      }

      // Turno
      if (turnoFilter !== 'TODOS') {
        if (turnoFilter === 'Mañana' && c.turno !== 'Mañana' && c.turno_codigo !== 'M') return false;
        if (turnoFilter === 'Tarde' && c.turno !== 'Tarde' && c.turno_codigo !== 'T') return false;
        if (turnoFilter === 'Vespertino' && c.turno !== 'Vespertino' && c.turno_codigo !== 'V') return false;
        if (turnoFilter === 'Otros' && ['Mañana', 'Tarde', 'Vespertino'].includes(c.turno)) return false;
      }

      // Curso
      if (cursoFilter !== 'TODOS' && c.curso !== cursoFilter) return false;

      // Division
      if (divisionFilter !== 'TODOS' && c.seccion !== divisionFilter) return false;

      // Estado Horario
      const cantH = c.horarios ? c.horarios.length : 0;
      if (estadoFilter === 'SIN_HORARIO' && cantH > 0) return false;
      if (estadoFilter === 'CON_HORARIO' && cantH === 0) return false;
      if (estadoFilter === 'CON_ARTICULACION' && !c.tieneArticulacion && !c.tiene_art) return false;

      return true;
    });
  }, [cargos, searchQuery, turnoFilter, cursoFilter, divisionFilter, estadoFilter, docentesMap]);

  // Pagination slice
  const paginatedCargos = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCargos.slice(start, start + pageSize);
  }, [filteredCargos, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredCargos.length / pageSize) || 1;

  // Open Edit Schedule Modal
  const handleOpenEdit = (cargo: Cargo) => {
    setEditingCargo(cargo);
    setEditHorarios(cargo.horarios ? JSON.parse(JSON.stringify(cargo.horarios)) : []);
    setEditTieneArt(Boolean(cargo.tieneArticulacion || cargo.tiene_art));
    
    if (cargo.horarioArticulacion) {
      setEditHorarioArt(JSON.parse(JSON.stringify(cargo.horarioArticulacion)));
    } else {
      // Default articulation slot based on turno
      const defaultTime = cargo.turno === 'Tarde' ? '17:00' : cargo.turno === 'Vespertino' ? '20:00' : '11:00';
      const defaultEnd = cargo.turno === 'Tarde' ? '18:00' : cargo.turno === 'Vespertino' ? '21:00' : '12:00';
      setEditHorarioArt({
        id: `art-${cargo.id}`,
        dia: 'Miércoles',
        horaIngreso: defaultTime,
        horaSalida: defaultEnd,
        articulacion: true
      });
    }
    setModalFeedback(null);
  };

  // Add a regular schedule block
  const handleAddHorarioBlock = (defaultDia: DiaSemana = 'Lunes', horaIngreso = '07:45', horaSalida = '09:05') => {
    const newBlock: Horario = {
      id: `h-temp-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      dia: defaultDia,
      horaIngreso,
      horaSalida,
      articulacion: false
    };
    setEditHorarios([...editHorarios, newBlock]);
  };

  // Remove a schedule block
  const handleRemoveHorarioBlock = (index: number) => {
    const updated = [...editHorarios];
    updated.splice(index, 1);
    setEditHorarios(updated);
  };

  // Quick preset apply for regular schedule
  const handleApplyPreset = (preset: ModuloPreset, targetDia: DiaSemana = 'Lunes') => {
    handleAddHorarioBlock(targetDia, preset.horaIngreso, preset.horaSalida);
  };

  // Save Modal Changes
  const handleSaveHorarios = async () => {
    if (!editingCargo) return;

    // Requirement: Todos los cargos tienen un horario regular
    if (editHorarios.length === 0) {
      setModalFeedback({
        type: 'error',
        message: 'Requisito: Todos los cargos deben tener al menos un horario regular asignado.'
      });
      return;
    }

    // Validate times
    for (const h of editHorarios) {
      if (!h.horaIngreso || !h.horaSalida) {
        setModalFeedback({
          type: 'error',
          message: 'Por favor complete la hora de ingreso y salida en todos los bloques.'
        });
        return;
      }
      if (h.horaIngreso >= h.horaSalida) {
        setModalFeedback({
          type: 'error',
          message: `Horario inválido en ${h.dia}: la hora de salida (${h.horaSalida}) debe ser posterior a la de ingreso (${h.horaIngreso}).`
        });
        return;
      }
    }

    if (editTieneArt) {
      if (!editHorarioArt.horaIngreso || !editHorarioArt.horaSalida) {
        setModalFeedback({
          type: 'error',
          message: 'Debe especificar el día y horario de la articulación pedagógica.'
        });
        return;
      }
    }

    setSavingSchedule(true);
    setModalFeedback(null);

    try {
      const result = await dataService.saveCargoHorarios(
        editingCargo.id,
        editHorarios,
        editTieneArt,
        editTieneArt ? editHorarioArt : null
      );

      if (result.success) {
        refreshData();
        setToastMessage(`Horarios actualizados exitosamente para ${editingCargo.descripcion} (${editingCargo.secuencia}).`);
        setTimeout(() => setToastMessage(null), 4000);
        setEditingCargo(null);
      } else {
        setModalFeedback({
          type: 'error',
          message: result.error || 'Ocurrió un error al persistir los horarios.'
        });
      }
    } catch (e: any) {
      setModalFeedback({
        type: 'error',
        message: e?.message || 'Error inesperado al guardar los horarios.'
      });
    } finally {
      setSavingSchedule(false);
    }
  };

  // Presets available according to editing cargo turno
  const currentTurnoPresets = useMemo(() => {
    if (!editingCargo) return MODULOS_MANANA;
    if (editingCargo.turno === 'Tarde' || editingCargo.turno_codigo === 'T') return MODULOS_TARDE;
    if (editingCargo.turno === 'Vespertino' || editingCargo.turno_codigo === 'V') return MODULOS_VESPERTINO;
    return MODULOS_MANANA;
  }, [editingCargo]);

  // Timetable grid data calculation
  const gridData = useMemo(() => {
    // Cargos matching selected curso and division
    const matchingCargos = cargos.filter((c) => {
      const matchCurso = c.curso === gridCurso || c.curso_raw === gridCurso.replace('°', '');
      const matchDiv = c.seccion === gridDivision || c.seccion_raw === gridDivision.replace('Div. ', '');
      return matchCurso && matchDiv;
    });

    const isTarde = gridTurno === 'Tarde';
    const isVesper = gridTurno === 'Vespertino';
    const timeSlots = isTarde ? MODULOS_TARDE.slice(0, 4) : isVesper ? MODULOS_VESPERTINO.slice(0, 3) : MODULOS_MANANA.slice(0, 4);
    const dias = DIAS_SEMANA.slice(0, 5); // Lunes a Viernes

    // Build matrix: [slotIndex][diaIndex] -> Cargo & Horario block
    const matrix: Array<Array<{ cargo: Cargo; horario: Horario; isArt: boolean } | null>> = [];

    timeSlots.forEach((slot) => {
      const row: Array<{ cargo: Cargo; horario: Horario; isArt: boolean } | null> = [];
      dias.forEach((dia) => {
        let found: { cargo: Cargo; horario: Horario; isArt: boolean } | null = null;
        for (const c of matchingCargos) {
          // Regular schedules
          if (c.horarios) {
            const hMatch = c.horarios.find((h) => h.dia === dia && h.horaIngreso === slot.horaIngreso);
            if (hMatch) {
              found = { cargo: c, horario: hMatch, isArt: false };
              break;
            }
          }
          // Articulation schedules
          if ((c.tieneArticulacion || c.tiene_art) && c.horarioArticulacion) {
            if (c.horarioArticulacion.dia === dia && c.horarioArticulacion.horaIngreso === slot.horaIngreso) {
              found = { cargo: c, horario: c.horarioArticulacion, isArt: true };
              break;
            }
          }
        }
        row.push(found);
      });
      matrix.push(row);
    });

    return { timeSlots, dias, matrix, matchingCargos };
  }, [cargos, gridCurso, gridDivision, gridTurno]);

  return (
    <div className="space-y-6 max-w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl animate-fade-in border border-emerald-500">
          <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER & TITLE */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>Gestión Curricular e Institucional CPEM N° 25</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Asignación de Horarios de Cargos
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Todos los cargos tienen un horario regular. Opcionalmente pueden contar con horarios de articulación pedagógica.
          </p>
        </div>

        {/* View Switcher buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start md:self-center">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'list'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListFilter className="w-4 h-4" />
            <span>Listado de Cargos</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
            <span>Parrilla Semanal por Curso</span>
          </button>
        </div>
      </div>

      {/* METRICS OVERVIEW BANNER */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Cargos</span>
            <Layers className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.total}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Planta de cargos del CPEM</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-emerald-200 bg-emerald-50/20 shadow-xs">
          <div className="flex items-center justify-between text-emerald-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Con Horario</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{stats.conHorario}</div>
          <div className="text-[11px] text-emerald-600/80 mt-0.5">
            {Math.round((stats.conHorario / (stats.total || 1)) * 100)}% de cobertura regular
          </div>
        </div>

        <div 
          onClick={() => { setEstadoFilter('SIN_HORARIO'); setCurrentPage(1); }}
          className="bg-white rounded-xl p-4 border border-amber-300 bg-amber-50/30 shadow-xs cursor-pointer hover:border-amber-400 transition-colors"
          title="Click para filtrar cargos sin horario"
        >
          <div className="flex items-center justify-between text-amber-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Sin Horario</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">{stats.sinHorario}</div>
          <div className="text-[11px] text-amber-700 font-medium mt-0.5 flex items-center gap-1">
            <span>Pendientes de asignación</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        <div 
          onClick={() => { setEstadoFilter('CON_ARTICULACION'); setCurrentPage(1); }}
          className="bg-white rounded-xl p-4 border border-purple-200 bg-purple-50/20 shadow-xs cursor-pointer hover:border-purple-300 transition-colors"
          title="Click para filtrar cargos con articulación"
        >
          <div className="flex items-center justify-between text-purple-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Con Articulación</span>
            <Network className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-700">{stats.conArticulacion}</div>
          <div className="text-[11px] text-purple-600/80 mt-0.5">Espacios pedagógicos integrados</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Bloques Semanales</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-800">{stats.totalBloques}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Módulos de clase asignados</div>
        </div>
      </div>

      {/* VIEW 1: LISTADO DE CARGOS Y ASIGNACIÓN */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por materia, secuencia, curso, división o docente asignado..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Turno Filter */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Turno:</span>
                <select
                  value={turnoFilter}
                  onChange={(e) => { setTurnoFilter(e.target.value); setCurrentPage(1); }}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="TODOS">Todos los turnos</option>
                  <option value="Mañana">Mañana (M)</option>
                  <option value="Tarde">Tarde (T)</option>
                  <option value="Vespertino">Vespertino (V)</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>

              {/* Curso Filter */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Curso:</span>
                <select
                  value={cursoFilter}
                  onChange={(e) => { setCursoFilter(e.target.value); setCurrentPage(1); }}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="TODOS">Todos los cursos</option>
                  {distinctCursos.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Division Filter */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-xs font-semibold text-slate-500 hidden sm:inline">División:</span>
                <select
                  value={divisionFilter}
                  onChange={(e) => { setDivisionFilter(e.target.value); setCurrentPage(1); }}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="TODOS">Todas las divisiones</option>
                  {distinctDivisiones.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Filter Badges by Estado */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-400 font-medium mr-1">Filtrar estado:</span>
                <button
                  onClick={() => { setEstadoFilter('TODOS'); setCurrentPage(1); }}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    estadoFilter === 'TODOS'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Todos ({cargos.length})
                </button>
                <button
                  onClick={() => { setEstadoFilter('SIN_HORARIO'); setCurrentPage(1); }}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    estadoFilter === 'SIN_HORARIO'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-100/70 text-amber-800 hover:bg-amber-200'
                  }`}
                >
                  ⚠️ Sin Horario ({stats.sinHorario})
                </button>
                <button
                  onClick={() => { setEstadoFilter('CON_HORARIO'); setCurrentPage(1); }}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    estadoFilter === 'CON_HORARIO'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-100/70 text-emerald-800 hover:bg-emerald-200'
                  }`}
                >
                  ✅ Con Horario ({stats.conHorario})
                </button>
                <button
                  onClick={() => { setEstadoFilter('CON_ARTICULACION'); setCurrentPage(1); }}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    estadoFilter === 'CON_ARTICULACION'
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100/70 text-purple-800 hover:bg-purple-200'
                  }`}
                >
                  🎯 Con Articulación ({stats.conArticulacion})
                </button>
              </div>

              <div className="text-slate-500 font-medium">
                Mostrando <span className="font-bold text-slate-800">{filteredCargos.length}</span> cargos
              </div>
            </div>
          </div>

          {/* Cargos List Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
            {paginatedCargos.length === 0 ? (
              <div className="p-12 text-center">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No se encontraron cargos con estos filtros</h3>
                <p className="text-xs text-slate-500 mt-1">Pruebe ajustando la búsqueda o eliminando los filtros activos.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setTurnoFilter('TODOS');
                    setCursoFilter('TODOS');
                    setDivisionFilter('TODOS');
                    setEstadoFilter('TODOS');
                    setCurrentPage(1);
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {paginatedCargos.map((cargo) => {
                  const docente = docentesMap.get(cargo.id);
                  const tieneHorarios = cargo.horarios && cargo.horarios.length > 0;
                  const tieneArt = Boolean(cargo.tieneArticulacion || cargo.tiene_art);

                  return (
                    <div
                      key={cargo.id}
                      className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      {/* Left: Cargo info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          {/* Secuencia Badge */}
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-black font-mono bg-slate-900 text-white">
                            SEC. {cargo.secuencia}
                          </span>

                          {/* Curso y División */}
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            {cargo.curso} {cargo.seccion}
                          </span>

                          {/* Turno */}
                          <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                            cargo.turno === 'Mañana' || cargo.turno_codigo === 'M'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : cargo.turno === 'Tarde' || cargo.turno_codigo === 'T'
                              ? 'bg-orange-50 text-orange-800 border border-orange-200'
                              : 'bg-purple-50 text-purple-800 border border-purple-200'
                          }`}>
                            Turno {cargo.turno}
                          </span>

                          {/* Obligaciones / Horas */}
                          <span className="text-[11px] text-slate-500 font-medium">
                            {cargo.obligaciones} hs/oblg.
                          </span>
                        </div>

                        {/* Cargo / Materia Title */}
                        <h4 className="text-base font-bold text-slate-900 truncate">
                          {cargo.descripcion}
                        </h4>

                        {/* Docente Asignado */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          {docente ? (
                            <span>
                              Docente: <strong className="text-slate-700">{docente.nombre}</strong> ({docente.situacion})
                              {docente.legajo && <span className="font-mono text-[10px] ml-1">Leg. {docente.legajo}</span>}
                            </span>
                          ) : (
                            <span className="italic text-slate-400">Sin docente asignado actualmente</span>
                          )}
                        </div>

                        {/* Current Schedule Chips */}
                        <div className="flex flex-wrap items-center gap-2 mt-2.5">
                          {tieneHorarios ? (
                            cargo.horarios.map((h, i) => (
                              <span
                                key={h.id || i}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold shadow-2xs"
                              >
                                <Clock className="w-3 h-3 text-emerald-600" />
                                <span>{h.dia}:</span>
                                <span className="font-mono font-bold">{h.horaIngreso} - {h.horaSalida}</span>
                              </span>
                            ))
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                              <span>Sin horario regular asignado</span>
                            </span>
                          )}

                          {/* Articulation Badge */}
                          {tieneArt && cargo.horarioArticulacion ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold shadow-2xs">
                              <Network className="w-3 h-3 text-purple-600" />
                              <span>Articulación: {cargo.horarioArticulacion.dia} ({cargo.horarioArticulacion.horaIngreso} - {cargo.horarioArticulacion.horaSalida})</span>
                            </span>
                          ) : tieneArt ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 text-xs font-medium">
                              <Network className="w-3 h-3 text-purple-600" />
                              <span>Posee articulación (horario a definir)</span>
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400">
                              Sin articulación
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                        <button
                          onClick={() => handleOpenEdit(cargo)}
                          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>{tieneHorarios ? 'Modificar Horarios' : 'Asignar Horarios'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="text-slate-500 font-medium">
                  Página <span className="font-bold text-slate-800">{currentPage}</span> de <span className="font-bold text-slate-800">{totalPages}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Anterior
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
                    let pageNum = currentPage - 2 + idx;
                    if (pageNum < 1) pageNum = idx + 1;
                    if (pageNum > totalPages) return null;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg font-bold transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: PARRILLA SEMANAL POR CURSO / DIVISIÓN */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          {/* Grid Selector Controls */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                Parrilla Horaria:
              </span>

              {/* Turno */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-medium">Turno:</span>
                <select
                  value={gridTurno}
                  onChange={(e) => setGridTurno(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Mañana">Mañana (07:45 - 13:35)</option>
                  <option value="Tarde">Tarde (13:30 - 19:20)</option>
                  <option value="Vespertino">Vespertino (18:00 - 22:20)</option>
                </select>
              </div>

              {/* Curso */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-medium">Curso:</span>
                <select
                  value={gridCurso}
                  onChange={(e) => setGridCurso(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {distinctCursos.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Division */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-medium">División:</span>
                <select
                  value={gridDivision}
                  onChange={(e) => setGridDivision(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {distinctDivisiones.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Parrilla</span>
              </button>
            </div>
          </div>

          {/* Timetable Matrix */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-400 font-bold uppercase tracking-wider block">Horario Semanal Escolar</span>
                <h3 className="text-lg font-black tracking-tight">
                  {gridCurso} {gridDivision} - Turno {gridTurno}
                </h3>
              </div>
              <span className="text-xs font-medium text-slate-400">
                {gridData.matchingCargos.length} materias en este curso y división
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    <th className="py-3 px-4 w-36 border-r border-slate-200">Módulo / Horario</th>
                    {gridData.dias.map((dia) => (
                      <th key={dia} className="py-3 px-4 text-center border-r border-slate-200 last:border-r-0">
                        {dia}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {gridData.timeSlots.map((slot, slotIdx) => (
                    <tr key={slot.nombre} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-4 bg-slate-50/70 border-r border-slate-200 font-mono text-slate-700 font-bold">
                        <div className="text-[11px] text-slate-900 leading-tight">{slot.nombre}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{slot.horaIngreso} a {slot.horaSalida}</div>
                      </td>
                      {gridData.dias.map((dia, diaIdx) => {
                        const cell = gridData.matrix[slotIdx][diaIdx];
                        if (cell) {
                          const doc = docentesMap.get(cell.cargo.id);
                          return (
                            <td
                              key={dia}
                              className={`p-2.5 border-r border-slate-200 last:border-r-0 transition-colors ${
                                cell.isArt ? 'bg-purple-50/60' : 'bg-blue-50/40'
                              }`}
                            >
                              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-slate-900 text-white">
                                    {cell.cargo.secuencia}
                                  </span>
                                  {cell.isArt && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800">
                                      Articulación
                                    </span>
                                  )}
                                </div>
                                <div className="font-bold text-slate-900 leading-snug line-clamp-2">
                                  {cell.cargo.descripcion}
                                </div>
                                {doc && (
                                  <div className="text-[10px] text-slate-500 truncate">
                                    {doc.nombre}
                                  </div>
                                )}
                                <button
                                  onClick={() => handleOpenEdit(cell.cargo)}
                                  className="text-[10px] font-bold text-blue-600 hover:text-blue-800 block pt-0.5"
                                >
                                  Editar horario
                                </button>
                              </div>
                            </td>
                          );
                        }
                        return (
                          <td
                            key={dia}
                            className="p-3 border-r border-slate-200 last:border-r-0 text-center text-slate-300 italic"
                          >
                            <span className="text-[11px] text-slate-300 block mb-1">Libre</span>
                            {gridData.matchingCargos.length > 0 && (
                              <button
                                onClick={() => {
                                  // Open first cargo without schedule in this division
                                  const pending = gridData.matchingCargos.find((c) => !c.horarios || c.horarios.length === 0) || gridData.matchingCargos[0];
                                  handleOpenEdit(pending);
                                }}
                                className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-0.5"
                              >
                                <Plus className="w-3 h-3" /> Asignar
                              </button>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ASIGNAR / EDITAR HORARIOS AL CARGO */}
      {editingCargo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full my-auto overflow-hidden animate-scale-up max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-start justify-between gap-4 shrink-0">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-black bg-blue-600 text-white">
                    SEC. {editingCargo.secuencia}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-300">
                    {editingCargo.curso} {editingCargo.seccion}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-300">
                    Turno {editingCargo.turno}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {editingCargo.obligaciones} obligaciones
                  </span>
                </div>
                <h3 className="text-xl font-black text-white truncate">
                  {editingCargo.descripcion}
                </h3>
                {docentesMap.get(editingCargo.id) && (
                  <p className="text-xs text-slate-400 mt-1">
                    Docente asignado: <strong className="text-slate-200">{docentesMap.get(editingCargo.id)?.nombre}</strong>
                  </p>
                )}
              </div>
              <button
                onClick={() => setEditingCargo(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
              {/* Feedback Alert */}
              {modalFeedback && (
                <div className={`p-4 rounded-xl text-xs font-semibold flex items-start gap-2.5 ${
                  modalFeedback.type === 'error'
                    ? 'bg-rose-50 text-rose-800 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {modalFeedback.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  <span>{modalFeedback.message}</span>
                </div>
              )}

              {/* Requirement Rule Notice */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Requisitos de asignación de horarios:</strong>
                  <span>Todos los cargos deben tener al menos un horario regular establecido. Opcionalmente pueden tener horario de articulación inter-área.</span>
                </div>
              </div>

              {/* SECTION 1: HORARIOS REGULARES */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Horarios Regulares de Clase (Obligatorio)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddHorarioBlock('Lunes')}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Bloque</span>
                  </button>
                </div>

                {/* Quick Presets for current Turno */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Atajos de módulos para Turno {editingCargo.turno}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentTurnoPresets.slice(0, 4).map((preset) => (
                      <button
                        key={preset.nombre}
                        type="button"
                        onClick={() => handleApplyPreset(preset, editHorarios[0]?.dia || 'Lunes')}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 text-xs font-semibold shadow-2xs transition-colors"
                        title={`Agregar ${preset.nombre}`}
                      >
                        + {preset.nombre}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Blocks List */}
                {editHorarios.length === 0 ? (
                  <div className="p-5 border-2 border-dashed border-amber-300 rounded-2xl bg-amber-50/40 text-center">
                    <AlertCircle className="w-6 h-6 text-amber-600 mx-auto mb-1.5" />
                    <p className="text-xs font-bold text-amber-800">
                      Sin horarios regulares asignados
                    </p>
                    <p className="text-[11px] text-amber-700 mt-0.5 mb-3">
                      Haga clic en un atajo arriba o en "Agregar Bloque" para definir los días y horas de este cargo.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleAddHorarioBlock('Lunes')}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                    >
                      + Agregar Horario Regular
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {editHorarios.map((h, idx) => (
                      <div
                        key={h.id || idx}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-wrap items-center gap-2.5"
                      >
                        {/* Day selector */}
                        <div className="flex-1 min-w-[130px]">
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">Día</label>
                          <select
                            value={h.dia}
                            onChange={(e) => {
                              const updated = [...editHorarios];
                              updated[idx].dia = e.target.value as DiaSemana;
                              setEditHorarios(updated);
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {DIAS_SEMANA.map((d) => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>

                        {/* Start time */}
                        <div className="w-28">
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">Hora Ingreso</label>
                          <input
                            type="time"
                            value={h.horaIngreso}
                            onChange={(e) => {
                              const updated = [...editHorarios];
                              updated[idx].horaIngreso = e.target.value;
                              setEditHorarios(updated);
                            }}
                            className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* End time */}
                        <div className="w-28">
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">Hora Salida</label>
                          <input
                            type="time"
                            value={h.horaSalida}
                            onChange={(e) => {
                              const updated = [...editHorarios];
                              updated[idx].horaSalida = e.target.value;
                              setEditHorarios(updated);
                            }}
                            className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Remove block */}
                        <div className="pt-4">
                          <button
                            type="button"
                            onClick={() => handleRemoveHorarioBlock(idx)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Eliminar este bloque"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 2: HORARIO DE ARTICULACIÓN */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Network className="w-4 h-4 text-purple-600" />
                      <span>Horario de Articulación (Opcional)</span>
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Espacio inter-área de articulación y planificación pedagógica.
                    </p>
                  </div>

                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editTieneArt}
                      onChange={(e) => setEditTieneArt(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                {editTieneArt && (
                  <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3 animate-fade-in">
                    <span className="text-xs font-bold text-purple-900 block">
                      Definir bloque de articulación para este cargo:
                    </span>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Día de articulación */}
                      <div className="flex-1 min-w-[130px]">
                        <label className="text-[10px] font-bold text-purple-700 block mb-1">Día de Articulación</label>
                        <select
                          value={editHorarioArt.dia}
                          onChange={(e) => setEditHorarioArt({ ...editHorarioArt, dia: e.target.value as DiaSemana })}
                          className="w-full px-2.5 py-1.5 bg-white border border-purple-200 rounded-lg text-xs font-bold text-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {DIAS_SEMANA.slice(0, 5).map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>

                      {/* Hora ingreso */}
                      <div className="w-32">
                        <label className="text-[10px] font-bold text-purple-700 block mb-1">Hora Inicio</label>
                        <input
                          type="time"
                          value={editHorarioArt.horaIngreso}
                          onChange={(e) => setEditHorarioArt({ ...editHorarioArt, horaIngreso: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-purple-200 rounded-lg text-xs font-mono font-bold text-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      {/* Hora salida */}
                      <div className="w-32">
                        <label className="text-[10px] font-bold text-purple-700 block mb-1">Hora Fin</label>
                        <input
                          type="time"
                          value={editHorarioArt.horaSalida}
                          onChange={(e) => setEditHorarioArt({ ...editHorarioArt, horaSalida: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-purple-200 rounded-lg text-xs font-mono font-bold text-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setEditingCargo(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-xs text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={savingSchedule}
                onClick={handleSaveHorarios}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                {savingSchedule ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Guardando en base de datos...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Guardar Horarios</span>
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
