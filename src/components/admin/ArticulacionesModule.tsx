import React, { useState, useMemo } from 'react';
import { 
  Network, 
  Calendar, 
  Clock, 
  BookOpen, 
  Layers, 
  Search, 
  Filter, 
  Info, 
  Sparkles, 
  Users, 
  ChevronRight,
  GraduationCap,
  School,
  CheckCircle2,
  CalendarClock
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import { Cargo, Agent, Puesto } from '../../types';

interface AreaCurricular {
  id: string;
  nombre: string;
  descripcion: string;
  color: string;
  bgLight: string;
  materiasBase: string[];
}

const AREAS_CURRICULARES: AreaCurricular[] = [
  {
    id: 'ciencias-naturales',
    nombre: 'Ciencias Naturales',
    descripcion: 'Biología, Físico Química, Química y Educación Científica.',
    color: 'text-emerald-700 border-emerald-300',
    bgLight: 'bg-emerald-50/70',
    materiasBase: ['Biología', 'Físico Química', 'Química', 'Ciencias Biológicas', 'Física', 'Merceología'],
  },
  {
    id: 'ciencias-sociales',
    nombre: 'Ciencias Sociales, Políticas y Económicas',
    descripcion: 'Historia, Geografía, Economía, Filosofía y Construcción de Ciudadanías.',
    color: 'text-amber-700 border-amber-300',
    bgLight: 'bg-amber-50/70',
    materiasBase: ['Historia', 'Geografía', 'Economía', 'Construcción de Ciudadanías', 'Filosofía', 'Economías', 'Estado, Políticas Y Legislaciones', 'Sistemas De Información Contable', 'Derecho Administrativo', 'Derecho Comercial', 'Economía Politica'],
  },
  {
    id: 'lenguajes-produccion',
    nombre: 'Lenguajes y Producción Cultural',
    descripcion: 'Lengua, Literatura, Lenguas Otras (Inglés), Artes Visuales, Música, Teatro y Danza.',
    color: 'text-purple-700 border-purple-300',
    bgLight: 'bg-purple-50/70',
    materiasBase: ['Lengua', 'Literatura', 'Lengua Y Literatura', 'Lenguas Otras', 'Inglés', 'Artes Visuales', 'Música', 'Teatro', 'Danza', 'Arte', 'Apreciación Musical', 'Comunicación y Medios'],
  },
  {
    id: 'matematica-informatica',
    nombre: 'Matemática e Informática',
    descripcion: 'Matemática, Informática, Integración Tecnológica y Análisis de Proyectos.',
    color: 'text-blue-700 border-blue-300',
    bgLight: 'bg-blue-50/70',
    materiasBase: ['Matemática', 'Informática', 'Integración Tecnológica', 'Matemática Financiera', 'Organizacion Y Procesamientos De La Informacion'],
  },
  {
    id: 'educacion-fisica',
    nombre: 'Educación Física Integral',
    descripcion: 'Prácticas corporales, motricidad y deportes escolares.',
    color: 'text-rose-700 border-rose-300',
    bgLight: 'bg-rose-50/70',
    materiasBase: ['Educación Física Integral', 'Educación Física'],
  },
  {
    id: 'orientacion-interareas',
    nombre: 'Espacios de Orientación e Interáreas',
    descripcion: 'Investigación de Orientaciones, Integración Curricular y Proyectos.',
    color: 'text-indigo-700 border-indigo-300',
    bgLight: 'bg-indigo-50/70',
    materiasBase: ['Investigación de las Orientaciones', 'Integración Curricular', 'Introducción A Las Pedagogías', 'Sujetos Y Construcción De Subjetividades', 'Psicología Educacional'],
  },
];

export const ArticulacionesModule: React.FC = () => {
  const [selectedCurso, setSelectedCurso] = useState<string>('TODOS');
  const [selectedAreaId, setSelectedAreaId] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState('');

  const cargos = useMemo(() => dataService.getCargos(), []);
  const puestos = useMemo(() => dataService.getPuestos(), []);
  const agentes = useMemo(() => dataService.getAgents(), []);

  // Map cargoId to docente assigned
  const puestosMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of puestos) {
      if (p.agentesAsignados.length > 0) {
        const agId = p.agentesAsignados[0].agenteId;
        const ag = agentes.find((a) => a.id === agId);
        if (ag) {
          map.set(p.cargoId, `${ag.apellidos}, ${ag.nombres}`);
        }
      }
    }
    return map;
  }, [puestos, agentes]);

  // Clasificar cada cargo en su área curricular
  const cargosConArea = useMemo(() => {
    return cargos.map((c) => {
      const descLower = c.descripcion.toLowerCase();
      let matchedArea = AREAS_CURRICULARES.find((area) =>
        area.materiasBase.some((m) => descLower.includes(m.toLowerCase()))
      );

      if (!matchedArea) {
        matchedArea = {
          id: 'otras-areas',
          nombre: 'Cargos Institucionales / Otros',
          descripcion: 'Cargos de apoyo, preceptoría y servicios generales.',
          color: 'text-slate-700 border-slate-300',
          bgLight: 'bg-slate-50',
          materiasBase: [],
        };
      }

      return {
        ...c,
        areaCurricular: matchedArea,
        docenteAsignado: puestosMap.get(c.id) || 'Vacante',
      };
    });
  }, [cargos, puestosMap]);

  // Filtrado
  const filteredCargos = useMemo(() => {
    return cargosConArea.filter((c) => {
      if (selectedCurso !== 'TODOS' && c.curso !== selectedCurso) return false;
      if (selectedAreaId !== 'TODOS' && c.areaCurricular.id !== selectedAreaId) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchDesc = c.descripcion.toLowerCase().includes(q);
        const matchSec = c.secuencia.toLowerCase().includes(q);
        const matchDoc = c.docenteAsignado.toLowerCase().includes(q);
        const matchArea = c.areaCurricular.nombre.toLowerCase().includes(q);
        return matchDesc || matchSec || matchDoc || matchArea;
      }

      return true;
    });
  }, [cargosConArea, selectedCurso, selectedAreaId, searchQuery]);

  // Agrupamiento por Curso y Área
  const groupedByAreaAndCurso = useMemo(() => {
    const groups: Record<string, typeof filteredCargos> = {};
    for (const c of filteredCargos) {
      const key = `${c.curso}_${c.areaCurricular.id}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(c);
    }
    return groups;
  }, [filteredCargos]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Network className="w-6 h-6 text-indigo-700" />
              <span>Articulaciones Curriculares</span>
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
              Interáreas e Interdepartamental
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Listado de áreas por curso para consultar horarios y espacios de articulación curricular.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold">
            <CalendarClock className="w-4 h-4 text-slate-500" />
            <span>Módulo preparatorio (se armará a futuro)</span>
          </span>
        </div>
      </div>

      {/* Banner Informativo Oficial */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-indigo-950">
              Cronograma de Horarios de Articulación (En desarrollo)
            </h3>
            <p className="text-xs text-indigo-800/90 mt-0.5 leading-relaxed">
              Este espacio organiza las áreas curriculares por curso y turno del CPEM N° 25 para planificar la articulación pedagógica. Los bloques horarios específicos de cada área se integrarán a medida que se completen las definiciones departamentales.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por materia, docente, área o curso..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Quick Course Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
            {['TODOS', '1°', '2°', '3°', '4°', '5°'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCurso(c)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  selectedCurso === c
                    ? 'bg-white text-indigo-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c === 'TODOS' ? 'Todos los Cursos' : `${c} Año`}
              </button>
            ))}
          </div>
        </div>

        {/* Filter by Area Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Área:</span>
          </span>
          <button
            onClick={() => setSelectedAreaId('TODOS')}
            className={`px-2.5 py-1 text-[11px] rounded-lg transition-colors cursor-pointer ${
              selectedAreaId === 'TODOS'
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas las áreas
          </button>
          {AREAS_CURRICULARES.map((area) => (
            <button
              key={area.id}
              onClick={() => setSelectedAreaId(area.id)}
              className={`px-2.5 py-1 text-[11px] rounded-lg transition-colors cursor-pointer border ${
                selectedAreaId === area.id
                  ? `${area.bgLight} ${area.color} font-bold shadow-xs`
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {area.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Areas per Course */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AREAS_CURRICULARES.filter((a) => selectedAreaId === 'TODOS' || a.id === selectedAreaId).map((area) => {
          // Cargos de esta área que cumplen el filtro
          const areaCargos = filteredCargos.filter((c) => c.areaCurricular.id === area.id);

          return (
            <div
              key={area.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col"
            >
              {/* Area Card Header */}
              <div className={`p-4 border-b border-slate-100 ${area.bgLight}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 border ${area.color}`}>
                    Área Curricular
                  </span>
                  <span className="text-xs font-bold text-slate-600">
                    {areaCargos.length} espacios
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900 mt-2">
                  {area.nombre}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                  {area.descripcion}
                </p>
              </div>

              {/* Horarios de Articulación (A futuro) */}
              <div className="p-3 bg-slate-50/70 border-b border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Horario de Articulación:</span>
                </span>
                <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                  A programar
                </span>
              </div>

              {/* List of Subjects and Teachers */}
              <div className="p-3 flex-1 overflow-y-auto max-h-72 space-y-2">
                {areaCargos.length === 0 ? (
                  <p className="text-center py-6 text-xs text-slate-400 italic">
                    No hay espacios para este curso/filtro.
                  </p>
                ) : (
                  areaCargos.map((cargo) => (
                    <div
                      key={cargo.id}
                      className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 truncate">
                            {cargo.descripcion}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500 shrink-0">
                            ({cargo.curso} {cargo.seccion})
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span className="font-semibold text-slate-700 truncate">
                            {cargo.docenteAsignado}
                          </span>
                          <span>·</span>
                          <span className="text-slate-400 shrink-0">{cargo.turno}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-mono font-bold text-slate-600 block">
                          {cargo.obligaciones} hs
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Sec {cargo.secuencia}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Card Footer */}
              <div className="p-3 bg-white border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                <span>CPEM N° 25</span>
                <span className="font-medium text-slate-600">
                  {new Set(areaCargos.map((c) => c.curso)).size} cursos involucrados
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
