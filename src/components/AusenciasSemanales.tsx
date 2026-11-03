import React, { useState, useEffect, useMemo } from 'react';
import { 
  CalendarDays, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  AlertCircle, 
  ShieldAlert, 
  Lock, 
  ArrowUpDown, 
  Clock, 
  Filter, 
  Layers, 
  FileSpreadsheet, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Agent, WeeklyAbsenceRow, LongLicenseItem } from '../types';
import { 
  dataService, 
  getMonday, 
  formatYMD, 
  formatDM,
  formatDMY, 
  calculateDaysBetween 
} from '../services/dataService';

interface AusenciasSemanalesProps {
  initialEmployeeNumber?: string;
  onGoToSolicitar?: () => void;
}

export const AusenciasSemanales: React.FC<AusenciasSemanalesProps> = ({
  initialEmployeeNumber = '',
  onGoToSolicitar,
}) => {
  // Gate authentication: Agent Employee Number verification (Section 32)
  const [employeeInput, setEmployeeInput] = useState(initialEmployeeNumber);
  const [authorizedAgent, setAuthorizedAgent] = useState<Agent | null>(null);
  const [gateError, setGateError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Active Week State (Monday)
  const [currentMonday, setCurrentMonday] = useState<Date>(() => getMonday(new Date()));

  // Search filter by Docente name/surname (Section 37)
  const [searchDocente, setSearchDocente] = useState('');

  // Long licenses sorting state (Section 38)
  const [longSortBy, setLongSortBy] = useState<'DATE_ASC' | 'DAYS_DESC'>('DATE_ASC');

  // Auto-verify if initial employee number provided
  useEffect(() => {
    if (initialEmployeeNumber && !authorizedAgent) {
      verifyAndAuthenticate(initialEmployeeNumber);
    }
  }, [initialEmployeeNumber]);

  // Section 32: Employee verification
  const verifyAndAuthenticate = async (empNum?: string) => {
    const num = empNum || employeeInput;
    if (!num.trim()) {
      setGateError('Por favor ingrese su número de empleado para consultar las ausencias.');
      return;
    }

    setIsVerifying(true);
    setGateError(null);

    try {
      const agent = await dataService.verifyAgent(num);
      if (!agent) {
        setGateError('No se encontró ningún agente con el número de empleado ingresado.');
        setAuthorizedAgent(null);
        return;
      }

      // Section 32 Critical Rule:
      // "El sistema debe verificar que el número de empleado corresponda a un agente que tenga al menos un puesto actualmente asignado por un administrador.
      // Si no tiene ningún puesto asignado, no permitir el acceso a esta página."
      if (!agent.hasAssignedPost || !agent.posts || agent.posts.length === 0) {
        setGateError('ACCESO DENEGADO: El agente no posee ningún puesto de trabajo actualmente asignado por un administrador en la institución. No está autorizado a consultar el cronograma institucional de ausencias.');
        setAuthorizedAgent(null);
        return;
      }

      setAuthorizedAgent(agent);
    } catch (err) {
      setGateError('Error al validar credenciales del agente.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogoutGate = () => {
    setAuthorizedAgent(null);
    setEmployeeInput('');
    setGateError(null);
  };

  // Week Dates Calculation (Section 36)
  const weekDays = useMemo(() => {
    const days: { key: 'lun' | 'mar' | 'mie' | 'jue' | 'vie'; name: string; dateStr: string; formatted: string }[] = [];
    const names = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE'] as const;
    const keys = ['lun', 'mar', 'mie', 'jue', 'vie'] as const;

    for (let i = 0; i < 5; i++) {
      const d = new Date(currentMonday);
      d.setDate(currentMonday.getDate() + i);
      days.push({
        key: keys[i],
        name: names[i],
        dateStr: formatYMD(d),
        formatted: formatDM(d),
      });
    }
    return days;
  }, [currentMonday]);

  const weekHeaderLabel = useMemo(() => {
    const mon = weekDays[0];
    const fri = weekDays[4];
    return `SEMANA DEL ${formatDMY(mon.dateStr)} AL ${formatDMY(fri.dateStr)}`;
  }, [weekDays]);

  // Week Navigation handlers (Section 36)
  const handlePrevWeek = () => {
    setCurrentMonday((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() - 7);
      return next;
    });
  };

  const handleCurrentWeek = () => {
    setCurrentMonday(getMonday(new Date()));
  };

  const handleNextWeek = () => {
    setCurrentMonday((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + 7);
      return next;
    });
  };

  // Absence Data
  const rawAbsences = useMemo(() => {
    return dataService.getWeeklyAbsences(currentMonday);
  }, [currentMonday, authorizedAgent]);

  // Filter by Docente (Section 37: Real-time search)
  const filteredAbsences = useMemo(() => {
    if (!searchDocente.trim()) return rawAbsences;
    const q = searchDocente.toLowerCase().trim();
    return rawAbsences.filter((row) => row.agentName.toLowerCase().includes(q));
  }, [rawAbsences, searchDocente]);

  // Long Licenses (Section 38: > 15 days)
  const longLicenses = useMemo(() => {
    const list = dataService.getLongLicenses();
    if (longSortBy === 'DATE_ASC') {
      return [...list].sort((a, b) => a.dateFrom.localeCompare(b.dateFrom));
    } else {
      return [...list].sort((a, b) => b.totalDays - a.totalDays);
    }
  }, [authorizedAgent, longSortBy]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* Title & Introduction */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-blue-600" />
          Ausencias Semanales y Licencias
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Cronograma semanal de ausencias efectivas (Lunes a Viernes) y seguimiento de licencias de larga duración.
        </p>
      </div>

      {/* GATE ACCESS (Section 32) */}
      {!authorizedAgent ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 space-y-5 max-w-xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Consulta de Ausencias Semanales
              </h2>
              <p className="text-xs text-slate-500">
                Para acceder a este cronograma, el sistema debe verificar que sea un agente con al menos un puesto asignado por la institución.
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              verifyAndAuthenticate();
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="gateEmpNumber" className="block text-sm font-semibold text-slate-800 mb-1">
                Número de empleado <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="gateEmpNumber"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ej: 1042 o 2045"
                  value={employeeInput}
                  onChange={(e) => {
                    setEmployeeInput(e.target.value);
                    if (gateError) setGateError(null);
                  }}
                  className="w-full pl-4 pr-11 py-3 text-base rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-mono"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isVerifying || !employeeInput.trim()}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors"
                >
                  {isVerifying ? (
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

            {gateError && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                <span>{gateError}</span>
              </div>
            )}

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs text-slate-600 space-y-2">
              <span className="font-semibold text-slate-700 block">Demostración de permisos:</span>
              <div className="flex flex-col gap-1.5 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => { setEmployeeInput('1042'); verifyAndAuthenticate('1042'); }}
                  className="text-left px-2.5 py-1.5 bg-white hover:bg-emerald-50 text-slate-800 border border-slate-200 rounded-md"
                >
                  <strong className="text-emerald-700">Legajo 1042</strong> (González M. - Con puestos asignados: <strong>ACCESO PERMITIDO</strong>)
                </button>
                <button
                  type="button"
                  onClick={() => { setEmployeeInput('9999'); verifyAndAuthenticate('9999'); }}
                  className="text-left px-2.5 py-1.5 bg-white hover:bg-red-50 text-slate-800 border border-slate-200 rounded-md"
                >
                  <strong className="text-red-700">Legajo 9999</strong> (Sin Asignación, Roberto - 0 cargos: <strong>ACCESO DENEGADO</strong>)
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        /* AUTHORIZED CONTENT: Table & Long Licenses */
        <div className="space-y-8 animate-fade-in">
          {/* Top Auth Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <div className="text-xs">
                <span className="text-slate-500 block">Sesión autorizada:</span>
                <span className="font-bold text-slate-900">{authorizedAgent.fullName} (Legajo: {authorizedAgent.employeeNumber})</span>
              </div>
            </div>

            <button
              onClick={handleLogoutGate}
              className="text-xs text-slate-500 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 rounded-lg px-2.5 py-1 transition-colors"
            >
              Cerrar consulta
            </button>
          </div>

          {/* Section 1: WEEKLY ABSENCES TABLE (Sections 33, 34, 35, 36, 37, 39, 40) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-4 sm:p-6">
            {/* Header: Week navigation and Filter */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              {/* Week Title & Navigation Buttons (Section 36) */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                  Planificación semanal
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {weekHeaderLabel}
                  </h2>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={handlePrevWeek}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Semana anterior</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCurrentWeek}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors"
                  >
                    Semana actual
                  </button>

                  <button
                    type="button"
                    onClick={handleNextWeek}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
                  >
                    <span>Semana siguiente</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Section 37: Real-time Teacher Search Filter */}
              <div className="w-full lg:w-72">
                <label htmlFor="searchTeacher" className="block text-xs font-semibold text-slate-600 mb-1">
                  Buscar por apellido o nombre
                </label>
                <div className="relative">
                  <input
                    id="searchTeacher"
                    type="text"
                    placeholder="Ej: González..."
                    value={searchDocente}
                    onChange={(e) => setSearchDocente(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  {searchDocente && (
                    <button
                      onClick={() => setSearchDocente('')}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Filtrado instantáneo en tiempo real
                </span>
              </div>
            </div>

            {/* Absence rules note (Section 34 & 35) */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Se computan ausencias con licencias <strong>Autorizadas, Justificadas, Completadas o con Descuento</strong>.</span>
              </span>
              <span className="font-mono text-slate-600 font-semibold">
                Registros activos: {filteredAbsences.length}
              </span>
            </div>

            {/* TABLA SEMANAL DE AUSENCIAS (Section 33, 35, 36, 40) */}
            {/* Mobile optimized horizontal scroll container with sticky week headers */}
            <div className="relative overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[750px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200 sticky top-0 z-10 shadow-xs">
                    <th scope="col" className="py-3 px-3.5 bg-slate-100 sticky left-0 z-20 shadow-xs">
                      DOCENTES
                    </th>
                    <th scope="col" className="py-3 px-3">
                      CARGO / CURSO / SISO
                    </th>
                    <th scope="col" className="py-3 px-3">
                      LICENCIA
                    </th>
                    <th scope="col" className="py-3 px-2.5 text-center">
                      DESDE
                    </th>
                    <th scope="col" className="py-3 px-2.5 text-center">
                      HASTA
                    </th>
                    {weekDays.map((d) => (
                      <th
                        key={d.key}
                        scope="col"
                        className="py-3 px-3 text-center border-l border-slate-200/80 bg-slate-100/90 min-w-[70px]"
                      >
                        <span className="block text-[10px] text-slate-500">{d.name}</span>
                        <span className="text-xs font-mono font-bold text-slate-900">{d.formatted}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredAbsences.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-400">
                        {searchDocente ? (
                          <span>No se encontraron ausencias para el docente "{searchDocente}".</span>
                        ) : (
                          <span>No hay ausencias programadas para esta semana.</span>
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredAbsences.map((row) => (
                      <tr 
                        key={row.uniqueKey} 
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        {/* DOCENTES (Sticky on mobile scroll) */}
                        <td className="py-3 px-3.5 font-bold text-slate-900 bg-white sticky left-0 z-10 whitespace-nowrap shadow-xs">
                          <div>
                            <span>{row.agentName}</span>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              Leg: {row.employeeNumber}
                            </span>
                          </div>
                        </td>

                        {/* CARGO / CURSO / SISO (Section 35) */}
                        <td className="py-3 px-3 text-xs text-slate-700 max-w-[220px]">
                          {row.cargoCursoSiso.includes('[SISO]') ? (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded">
                                SISO
                              </span>
                              <span className="font-semibold text-slate-800">
                                {row.cargoCursoSiso.replace('[SISO]', '').trim()}
                              </span>
                            </div>
                          ) : row.cargoCursoSiso.includes('[SISO / Solicitud]') ? (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-300 px-1.5 py-0.5 rounded">
                                SISO / Solicitud
                              </span>
                              <span className="font-semibold text-slate-800">
                                {row.cargoCursoSiso.replace('[SISO / Solicitud]', '').trim()}
                              </span>
                            </div>
                          ) : (
                            <span className="font-semibold text-slate-800">
                              {row.cargoCursoSiso}
                            </span>
                          )}
                        </td>

                        {/* LICENCIA */}
                        <td className="py-3 px-3 text-xs font-medium text-slate-800 whitespace-nowrap">
                          {row.licenseType}
                        </td>

                        {/* DESDE */}
                        <td className="py-3 px-2.5 text-center font-mono text-xs text-slate-600 whitespace-nowrap">
                          {formatDMY(row.dateFrom)}
                        </td>

                        {/* HASTA */}
                        <td className="py-3 px-2.5 text-center font-mono text-xs text-slate-600 whitespace-nowrap">
                          {formatDMY(row.dateTo)}
                        </td>

                        {/* LUN A VIE (Section 33: "En los días en los que corresponda la ausencia, mostrar una ✓ verde") */}
                        {(['lun', 'mar', 'mie', 'jue', 'vie'] as const).map((dayKey) => {
                          const isAbsent = row.days[dayKey];
                          return (
                            <td
                              key={dayKey}
                              className={`py-3 px-3 text-center border-l border-slate-100 ${
                                isAbsent ? 'bg-emerald-50/50' : ''
                              }`}
                            >
                              {isAbsent ? (
                                <span 
                                  className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm shadow-xs border border-emerald-300"
                                  title="Ausencia registrada"
                                >
                                  ✓
                                </span>
                              ) : (
                                <span className="text-slate-200 select-none">-</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: LICENCIAS LARGAS (Section 38: > 15 days) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
                  LICENCIAS LARGAS
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Licencias de personal con una duración mayor a 15 días continuos.
                </p>
              </div>

              {/* Sorting Toggle (Section 38) */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setLongSortBy('DATE_ASC')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    longSortBy === 'DATE_ASC'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Fecha inicio (ascendente)
                </button>
                <button
                  type="button"
                  onClick={() => setLongSortBy('DAYS_DESC')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    longSortBy === 'DAYS_DESC'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Por duración (días)
                </button>
              </div>
            </div>

            {/* List / Table of Long Licenses */}
            {longLicenses.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                No hay licencias prolongadas registradas en el período activo.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                      <th className="py-2.5 px-3">AGENTE</th>
                      <th className="py-2.5 px-3">LEGAJO</th>
                      <th className="py-2.5 px-3">CARGO / CURSO</th>
                      <th className="py-2.5 px-3">LICENCIA</th>
                      <th className="py-2.5 px-2.5 text-center">DESDE</th>
                      <th className="py-2.5 px-2.5 text-center">HASTA</th>
                      <th className="py-2.5 px-3 text-center">DÍAS</th>
                      <th className="py-2.5 px-3 text-center">FUENTE</th>
                      <th className="py-2.5 px-3 text-center">ESTADO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {longLicenses.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                          {item.agentName}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-600">
                          {item.employeeNumber}
                        </td>
                        <td className="py-3 px-3 text-slate-700 max-w-[200px] truncate" title={`${item.cargo} - ${item.curso}`}>
                          <span className="font-semibold block">{item.cargo}</span>
                          <span className="text-[11px] text-slate-500">{item.curso}</span>
                        </td>
                        <td className="py-3 px-3 font-medium text-slate-800">
                          {item.licenseType}
                        </td>
                        <td className="py-3 px-2.5 text-center font-mono text-xs text-slate-600 whitespace-nowrap">
                          {formatDMY(item.dateFrom)}
                        </td>
                        <td className="py-3 px-2.5 text-center font-mono text-xs text-slate-600 whitespace-nowrap">
                          {formatDMY(item.dateTo)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="inline-block px-2.5 py-0.5 bg-indigo-100 text-indigo-800 font-bold font-mono text-xs rounded-full border border-indigo-200">
                            {item.totalDays} días
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            item.source === 'SISO' 
                              ? 'bg-amber-100 text-amber-900 border-amber-300' 
                              : 'bg-blue-100 text-blue-900 border-blue-200'
                          }`}>
                            {item.source}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
