import React, { useState, useMemo } from 'react';
import { 
  Users2, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  Briefcase, 
  ChevronRight, 
  Building2, 
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Eye,
  Info,
  X
} from 'lucide-react';
import { dataService, calculateDaysBetween, formatDMY } from '../../services/dataService';
import { Cargo, Puesto, Agent, LicenseRequest } from '../../types';

export interface AsambleaItem {
  id: string;
  cargoId: string;
  cargo_id: number;
  secuencia: string;
  turno: string;
  curso: string;
  seccion: string;
  descripcion: string;
  obligaciones: string;
  tipoDisponibilidad: 'VACANTE' | 'LICENCIA_LARGA';
  motivoDetalle: string;
  docenteTitular?: string;
  docenteLegajo?: string;
  docenteDni?: string;
  licenciaDesde?: string;
  licenciaHasta?: string;
  licenciaDias?: number;
  licenciaCodigo?: string;
  licenciaTipo?: string;
}

export const AsambleaModule: React.FC = () => {
  const [filterTipo, setFilterTipo] = useState<'TODOS' | 'VACANTE' | 'LICENCIA_LARGA'>('TODOS');
  const [filterTurno, setFilterTurno] = useState<string>('TODOS');
  const [filterCurso, setFilterCurso] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemDetail, setSelectedItemDetail] = useState<AsambleaItem | null>(null);

  // Recolectar datos en tiempo real de cargos, puestos y licencias
  const asambleaItems = useMemo<AsambleaItem[]>(() => {
    const cargos = dataService.getCargos();
    const puestos = dataService.getPuestos();
    const agentes = dataService.getAgents();
    const requests = dataService.getRequests();
    const sisoLicenses = dataService.getSisoLicenses();

    const items: AsambleaItem[] = [];

    // Map puestos by cargoId
    const puestoByCargoId = new Map<string, Puesto>();
    for (const p of puestos) {
      puestoByCargoId.set(p.cargoId, p);
    }

    // Map agentes by id, legajo y dni
    const agenteById = new Map<string, Agent>();
    const agenteByLegajo = new Map<string, Agent>();
    const agenteByDni = new Map<string, Agent>();
    for (const a of agentes) {
      agenteById.set(a.id, a);
      if (a.employeeNumber) agenteByLegajo.set(a.employeeNumber.trim().toLowerCase(), a);
      if (a.legajo) agenteByLegajo.set(String(a.legajo).trim().toLowerCase(), a);
      if (a.dni) agenteByDni.set(a.dni.replace(/\D/g, ''), a);
    }

    // 1. Cargos Vacantes (sin docentes o con motivos de cese/renuncia)
    for (const c of cargos) {
      const puesto = puestoByCargoId.get(c.id);
      const isVacant = !puesto || puesto.agentesAsignados.length === 0;

      if (isVacant) {
        let motivo = 'Puesto vacante sin docente asignado';
        if (c.secuencia === '98' && c.curso === '2°' && c.seccion.includes('A')) {
          motivo = 'Vacante por Renuncia';
        } else if (c.secuencia === '277' && c.curso === '3°' && c.seccion.includes('B')) {
          motivo = 'Vacante por Cesar de Planta';
        } else if (c.secuencia === '359' && c.curso === '3°' && c.seccion.includes('C')) {
          motivo = 'Vacante disponible para asamblea';
        }

        items.push({
          id: `asamblea-vac-${c.id}`,
          cargoId: c.id,
          cargo_id: c.cargo_id || 0,
          secuencia: c.secuencia,
          turno: c.turno,
          curso: c.curso,
          seccion: c.seccion,
          descripcion: c.descripcion,
          obligaciones: c.obligaciones || '0',
          tipoDisponibilidad: 'VACANTE',
          motivoDetalle: motivo,
        });
      }
    }

    // 2. Cargos con Docentes con Licencias Largas (> 15 días)
    // A) Solicitudes del sistema
    const today = new Date().toISOString().split('T')[0];
    const longRequests = requests.filter((r) => {
      if (r.status === 'Eliminada' || r.status === 'Rechazada') return false;
      const days = calculateDaysBetween(r.dateFrom, r.dateTo);
      return days > 15;
    });

    for (const lr of longRequests) {
      // Buscar el agente y sus puestos asignados
      const ag = agenteByLegajo.get(lr.employeeNumber.toLowerCase()) || agenteByDni.get(lr.agentDni.replace(/\D/g, ''));
      if (ag && ag.posts) {
        for (const post of ag.posts) {
          const puesto = puestos.find((p) => p.id === post.id);
          const cargo = puesto ? cargos.find((c) => c.id === puesto.cargoId) : null;
          if (cargo) {
            const days = calculateDaysBetween(lr.dateFrom, lr.dateTo);
            items.push({
              id: `asamblea-req-${cargo.id}-${lr.id}`,
              cargoId: cargo.id,
              cargo_id: cargo.cargo_id || 0,
              secuencia: cargo.secuencia,
              turno: cargo.turno,
              curso: cargo.curso,
              seccion: cargo.seccion,
              descripcion: cargo.descripcion,
              obligaciones: cargo.obligaciones || '0',
              tipoDisponibilidad: 'LICENCIA_LARGA',
              motivoDetalle: `Licencia de larga duración (${days} días)`,
              docenteTitular: lr.agentName,
              docenteLegajo: lr.employeeNumber,
              docenteDni: lr.agentDni,
              licenciaDesde: lr.dateFrom,
              licenciaHasta: lr.dateTo,
              licenciaDias: days,
              licenciaCodigo: lr.licenseTypeCode,
              licenciaTipo: lr.licenseTypeName,
            });
          }
        }
      }
    }

    // B) Licencias Médicas de Larga Duración en SISO (para cargos donde el docente titular tiene licencia vigente >15 días)
    for (const s of sisoLicenses) {
      const sDias = parseInt(String(s.dias), 10);
      if (!isNaN(sDias) && sDias >= 15) {
        // Verificar si la licencia está vigente o próxima
        const desde = s.desde || s.fecha_desde || '';
        const hasta = s.hasta || s.fecha_hasta || '';
        if (hasta >= today) {
          const ag = (s.nroEmpleado && agenteByLegajo.get(s.nroEmpleado.toLowerCase())) || 
                     (s.dni && agenteByDni.get(s.dni.replace(/\D/g, '')));
          
          if (ag && ag.posts && ag.posts.length > 0) {
            for (const post of ag.posts) {
              const puesto = puestos.find((p) => p.id === post.id);
              const cargo = puesto ? cargos.find((c) => c.id === puesto.cargoId) : null;
              if (cargo) {
                const uniqueKey = `asamblea-siso-${cargo.id}-${s.id}`;
                if (!items.some((it) => it.id === uniqueKey)) {
                  items.push({
                    id: uniqueKey,
                    cargoId: cargo.id,
                    cargo_id: cargo.cargo_id || 0,
                    secuencia: cargo.secuencia,
                    turno: cargo.turno,
                    curso: cargo.curso,
                    seccion: cargo.seccion,
                    descripcion: cargo.descripcion,
                    obligaciones: cargo.obligaciones || '0',
                    tipoDisponibilidad: 'LICENCIA_LARGA',
                    motivoDetalle: `Licencia Médica SISO (${sDias} días - ${s.tipo})`,
                    docenteTitular: s.nombre,
                    docenteLegajo: s.nroEmpleado,
                    docenteDni: s.dni,
                    licenciaDesde: desde,
                    licenciaHasta: hasta,
                    licenciaDias: sDias,
                    licenciaCodigo: String(s.codLicencia || s.cod_licencia || 'SISO'),
                    licenciaTipo: s.tipo,
                  });
                }
              }
            }
          }
        }
      }
    }

    return items.sort((a, b) => {
      // Vacantes primero, luego por curso y secuencia
      if (a.tipoDisponibilidad !== b.tipoDisponibilidad) {
        return a.tipoDisponibilidad === 'VACANTE' ? -1 : 1;
      }
      return a.cargo_id - b.cargo_id;
    });
  }, []);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return asambleaItems.filter((item) => {
      if (filterTipo !== 'TODOS' && item.tipoDisponibilidad !== filterTipo) return false;
      if (filterTurno !== 'TODOS' && item.turno !== filterTurno) return false;
      if (filterCurso !== 'TODOS' && item.curso !== filterCurso) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchSec = item.secuencia.toLowerCase().includes(q);
        const matchDesc = item.descripcion.toLowerCase().includes(q);
        const matchDoc = (item.docenteTitular || '').toLowerCase().includes(q);
        const matchLeg = (item.docenteLegajo || '').toLowerCase().includes(q);
        const matchCurso = item.curso.toLowerCase().includes(q);
        const matchSec2 = item.seccion.toLowerCase().includes(q);
        return matchSec || matchDesc || matchDoc || matchLeg || matchCurso || matchSec2;
      }

      return true;
    });
  }, [asambleaItems, filterTipo, filterTurno, filterCurso, searchQuery]);

  // Totales para métricas
  const totalVacantes = asambleaItems.filter((i) => i.tipoDisponibilidad === 'VACANTE').length;
  const totalLicenciasLargas = asambleaItems.filter((i) => i.tipoDisponibilidad === 'LICENCIA_LARGA').length;
  const totalHoras = asambleaItems.reduce((acc, i) => acc + (parseInt(i.obligaciones, 10) || 0), 0);

  // Exportar a CSV para el acta de asamblea
  const handleExportCSV = () => {
    const headers = [
      'SECUENCIA',
      'TURNO',
      'CURSO',
      'DIVISION',
      'MATERIA_CARGO',
      'HORAS_OBLIGACIONES',
      'TIPO_DISPONIBILIDAD',
      'ESTADO_MOTIVO',
      'DOCENTE_TITULAR',
      'LEGAJO',
      'DNI',
      'DESDE',
      'HASTA',
      'DIAS',
    ];

    const rows = filteredItems.map((i) => [
      i.secuencia,
      i.turno,
      i.curso,
      i.seccion,
      `"${i.descripcion}"`,
      i.obligaciones,
      i.tipoDisponibilidad === 'VACANTE' ? 'VACANTE' : 'SUPLENCIA POR LICENCIA LARGA',
      `"${i.motivoDetalle}"`,
      `"${i.docenteTitular || 'VACANTE'}"`,
      i.docenteLegajo || '',
      i.docenteDni || '',
      i.licenciaDesde || '',
      i.licenciaHasta || '',
      i.licenciaDias || '',
    ]);

    const csvContent = [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Asamblea_CPEM25_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Users2 className="w-6 h-6 text-blue-700" />
              <span>Listado para Asamblea</span>
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Ofrecimiento Oficial
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Cargos vacantes y suplencias generadas por docentes en licencias de larga duración (&gt;15 días) para designación en asamblea.
          </p>
        </div>

        {/* Actions: Export & Print */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all cursor-pointer"
            title="Exportar listado a archivo CSV"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
            title="Imprimir listado para la mesa de asamblea"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Listado</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Total a Ofrecer
          </span>
          <span className="text-2xl font-black text-slate-900 block mt-1">
            {asambleaItems.length}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            Cargos en asamblea
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Vacantes Puras</span>
          </span>
          <span className="text-2xl font-black text-amber-900 block mt-1">
            {totalVacantes}
          </span>
          <span className="text-[11px] text-amber-700/80 mt-0.5 block">
            Sin designación interina
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/20 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Licencias Largas</span>
          </span>
          <span className="text-2xl font-black text-blue-900 block mt-1">
            {totalLicenciasLargas}
          </span>
          <span className="text-[11px] text-blue-700/80 mt-0.5 block">
            Suplencias a cubrir (&gt;15d)
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Horas Cátedra
          </span>
          <span className="text-2xl font-black text-slate-900 block mt-1">
            {totalHoras}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            Obligaciones a designar
          </span>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por materia, secuencia, docente, curso o división..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Quick Segmented Control for Tipo */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
            <button
              onClick={() => setFilterTipo('TODOS')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filterTipo === 'TODOS'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({asambleaItems.length})
            </button>
            <button
              onClick={() => setFilterTipo('VACANTE')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filterTipo === 'VACANTE'
                  ? 'bg-amber-100 text-amber-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vacantes ({totalVacantes})
            </button>
            <button
              onClick={() => setFilterTipo('LICENCIA_LARGA')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filterTipo === 'LICENCIA_LARGA'
                  ? 'bg-blue-100 text-blue-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Licencias Largas ({totalLicenciasLargas})
            </button>
          </div>
        </div>

        {/* Dropdowns row */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Turno:</span>
            <select
              value={filterTurno}
              onChange={(e) => setFilterTurno(e.target.value)}
              className="py-1 px-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white"
            >
              <option value="TODOS">Todos los turnos</option>
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
              <option value="Vespertino">Vespertino</option>
              <option value="Central">Central</option>
              <option value="Extendido">Extendido</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Curso:</span>
            <select
              value={filterCurso}
              onChange={(e) => setFilterCurso(e.target.value)}
              className="py-1 px-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white"
            >
              <option value="TODOS">Todos los cursos</option>
              <option value="1°">1° Año</option>
              <option value="2°">2° Año</option>
              <option value="3°">3° Año</option>
              <option value="4°">4° Año</option>
              <option value="5°">5° Año</option>
            </select>
          </div>

          <div className="ml-auto text-[11px] text-slate-400">
            Mostrando <span className="font-bold text-slate-700">{filteredItems.length}</span> de{' '}
            <span className="font-bold text-slate-700">{asambleaItems.length}</span> cargos para asamblea
          </div>
        </div>
      </div>

      {/* Table of Positions for Assembly */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Secuencia</th>
                <th className="py-3 px-4">Turno</th>
                <th className="py-3 px-4">Curso / Div</th>
                <th className="py-3 px-4">Materia / Cargo</th>
                <th className="py-3 px-4 text-center">Horas</th>
                <th className="py-3 px-4">Disponibilidad</th>
                <th className="py-3 px-4">Docente Titular / Motivo</th>
                <th className="py-3 px-4">Período / Días</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <Users2 className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">No se encontraron cargos para los filtros seleccionados.</p>
                    <p className="text-[11px] mt-1 text-slate-400">Pruebe modificando los filtros de curso, turno o búsqueda.</p>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Secuencia */}
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {item.secuencia}
                    </td>

                    {/* Turno */}
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      {item.turno}
                    </td>

                    {/* Curso / Div */}
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-800">{item.curso}</span>{' '}
                      <span className="text-slate-500">{item.seccion}</span>
                    </td>

                    {/* Materia / Cargo */}
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{item.descripcion}</span>
                      <span className="text-[10px] text-slate-400">Cargo ID #{item.cargo_id}</span>
                    </td>

                    {/* Horas */}
                    <td className="py-3 px-4 text-center font-bold text-slate-800">
                      {item.obligaciones}
                    </td>

                    {/* Tipo de Disponibilidad */}
                    <td className="py-3 px-4">
                      {item.tipoDisponibilidad === 'VACANTE' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          <AlertTriangle className="w-3 h-3 text-amber-700" />
                          <span>VACANTE</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                          <Clock className="w-3 h-3 text-blue-700" />
                          <span>SUPLENCIA</span>
                        </span>
                      )}
                    </td>

                    {/* Docente Titular / Motivo */}
                    <td className="py-3 px-4">
                      {item.tipoDisponibilidad === 'VACANTE' ? (
                        <div>
                          <span className="text-amber-800 font-bold block">{item.motivoDetalle}</span>
                          <span className="text-[10px] text-slate-400">A designar en asamblea</span>
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold text-slate-900 block">{item.docenteTitular}</span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <span>Leg: {item.docenteLegajo || 'S/D'}</span>
                            <span>·</span>
                            <span>{item.motivoDetalle}</span>
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Período / Días */}
                    <td className="py-3 px-4">
                      {item.tipoDisponibilidad === 'VACANTE' ? (
                        <span className="text-slate-400 italic">Ciclo Lectivo Completo</span>
                      ) : (
                        <div>
                          <span className="font-semibold text-slate-800 block text-[11px]">
                            {item.licenciaDesde ? formatDMY(item.licenciaDesde) : ''} al{' '}
                            {item.licenciaHasta ? formatDMY(item.licenciaHasta) : ''}
                          </span>
                          <span className="text-[10px] font-bold text-blue-700">
                            {item.licenciaDias} días ({item.licenciaCodigo})
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Acción */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedItemDetail(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver Ficha</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Ficha Detallada para Asamblea */}
      {selectedItemDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Ficha de Cargo para Asamblea
                  </h3>
                  <span className="text-xs text-slate-500">
                    Secuencia {selectedItemDetail.secuencia} · Cargo #{selectedItemDetail.cargo_id}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedItemDetail(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              {/* Información General del Cargo */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Materia / Cargo</span>
                  <span className="font-bold text-sm text-slate-900">{selectedItemDetail.descripcion}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Curso y Sección</span>
                  <span className="font-bold text-sm text-slate-900">{selectedItemDetail.curso} {selectedItemDetail.seccion}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Turno</span>
                  <span className="font-bold text-slate-800">{selectedItemDetail.turno}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Horas / Obligaciones</span>
                  <span className="font-bold text-slate-800">{selectedItemDetail.obligaciones} hs</span>
                </div>
              </div>

              {/* Estado de Asamblea */}
              <div>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                  Condición de Ofrecimiento en Asamblea
                </span>
                <div className={`p-3 rounded-xl border ${
                  selectedItemDetail.tipoDisponibilidad === 'VACANTE'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-blue-50 border-blue-200 text-blue-900'
                }`}>
                  <div className="font-bold text-sm">
                    {selectedItemDetail.tipoDisponibilidad === 'VACANTE' ? 'PUESTO VACANTE' : 'SUPLENCIA POR LICENCIA PROLONGADA'}
                  </div>
                  <div className="text-xs mt-0.5">{selectedItemDetail.motivoDetalle}</div>
                </div>
              </div>

              {/* Datos del docente si es suplencia */}
              {selectedItemDetail.tipoDisponibilidad === 'LICENCIA_LARGA' && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Docente Titular / Interino Licenciado
                  </span>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Nombre completo:</span>
                      <span className="font-bold text-slate-900">{selectedItemDetail.docenteTitular}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Legajo / Empleado:</span>
                      <span className="font-mono font-bold text-slate-800">{selectedItemDetail.docenteLegajo || 'S/D'}</span>
                    </div>
                    {selectedItemDetail.licenciaDesde && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Período de licencia:</span>
                        <span className="font-bold text-slate-800">
                          {formatDMY(selectedItemDetail.licenciaDesde)} al {formatDMY(selectedItemDetail.licenciaHasta || '')}
                        </span>
                      </div>
                    )}
                    {selectedItemDetail.licenciaDias && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Duración total:</span>
                        <span className="font-bold text-blue-700">{selectedItemDetail.licenciaDias} días</span>
                      </div>
                    )}
                    {selectedItemDetail.licenciaCodigo && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Código / Artículo:</span>
                        <span className="font-semibold text-slate-800">{selectedItemDetail.licenciaCodigo}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedItemDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
