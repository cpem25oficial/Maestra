import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  CalendarCheck, 
  Clock, 
  FileSpreadsheet, 
  FileText, 
  ArrowRight, 
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  FolderArchive
} from 'lucide-react';
import { dataService, formatDMY } from '../../services/dataService';
import { authService } from '../../services/authService';
import { LicenseRequest, LicenseStatus } from '../../types';

interface AdminDashboardProps {
  onNavigateTab: (tabId: string) => void;
  onOpenRequestModal: (req: LicenseRequest) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateTab,
  onOpenRequestModal,
}) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsub = dataService.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsub;
  }, []);

  const metrics = dataService.getDashboardMetrics();
  const pendingRequests = dataService.getRequests().filter((r) => r.status === 'Pendiente');
  const longLicenses = dataService.getLongLicenses();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-2xl text-white p-6 sm:p-7 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-xs font-semibold uppercase tracking-wider border border-blue-400/30">
              Panel Administrativo
            </span>
            <span className="text-xs text-slate-300 font-mono">
              Año Escolar 2026
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            Sistema de Administración Escolar CPEM
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Control de planta funcional, asignación de puestos, seguimiento de licencias docentes y procesamiento de registros SISO.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigateTab('solicitudes')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            <span>Revisar Solicitudes ({metrics.pendingRequests})</span>
          </button>
        </div>
      </div>

      {/* Superadmin Special Banner */}
      {authService.isSuperadmin() && (
        <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 border border-purple-800/40 rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center shrink-0">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Herramienta de Superadmin
                </span>
                <span className="px-1.5 py-0.2 rounded bg-purple-500/30 text-purple-200 text-[10px] font-mono">
                  Auditoría
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Acceso al gestor de archivos de justificación adjuntados por agentes con selección rápida, por fecha y eliminación segura.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('archivos')}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all shrink-0 hover:scale-105 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <FolderArchive className="w-4 h-4" />
            <span>Gestionar Archivos de Justificación</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Card 1: Agentes Activos */}
        <div 
          onClick={() => onNavigateTab('agentes')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Agentes Activos</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">{metrics.activeAgents}</span>
            <span className="text-xs text-slate-400 font-medium">personal registrado</span>
          </div>
          <div className="mt-2 text-xs text-blue-600 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            <span>Gestionar agentes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Cargos Institucionales */}
        <div 
          onClick={() => onNavigateTab('cargos')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cargos y Puestos</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">{metrics.activeCargos}</span>
            <span className="text-xs text-slate-400 font-medium">cargos activos</span>
          </div>
          <div className="mt-2 text-xs text-indigo-600 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            <span>Ver planta funcional</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Solicitudes Pendientes */}
        <div 
          onClick={() => onNavigateTab('solicitudes')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pendientes Revisión</span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
              metrics.pendingRequests > 0 ? 'bg-amber-100 text-amber-700 animate-pulse' : 'bg-slate-100 text-slate-500'
            }`}>
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">{metrics.pendingRequests}</span>
            <span className="text-xs text-slate-400 font-medium">solicitudes</span>
          </div>
          <div className="mt-2 text-xs text-amber-600 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            <span>{metrics.pendingRequests > 0 ? 'Requieren dictamen' : 'Al día'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Licencias Vigentes Hoy */}
        <div 
          onClick={() => onNavigateTab('solicitudes')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ausencias Hoy</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">{metrics.activeLicensesToday}</span>
            <span className="text-xs text-slate-400 font-medium">agentes ausentes</span>
          </div>
          <div className="mt-2 text-xs text-emerald-600 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            <span>SISO + Solicitudes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Main Row: Pending Requests Attention & Long Licenses Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Pending Requests requiring Secretariat action */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <h2 className="font-bold text-base text-slate-900">
                Solicitudes Pendientes de Dictamen
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('solicitudes')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Ver todas ({metrics.totalRequests})
            </button>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />
              <p className="text-sm font-medium text-slate-700">No hay solicitudes pendientes de revisión.</p>
              <p className="text-xs text-slate-400">Todas las licencias han sido procesadas o dictaminadas.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {pendingRequests.slice(0, 5).map((req) => (
                <div key={req.id} className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/80 rounded-xl px-2 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-900">{req.agentName}</span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        Leg. {req.employeeNumber}
                      </span>
                    </div>
                    <p className="text-xs text-blue-700 font-semibold">
                      {req.licenseTypeCode} - {req.licenseTypeName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Período: {formatDMY(req.dateFrom)} al {formatDMY(req.dateTo)} • {req.postDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onOpenRequestModal(req)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors"
                    >
                      Evaluar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: SISO Import Status & Long Licenses Alert */}
        <div className="space-y-6">
          {/* SISO Quick Status */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Integración SISO</span>
              </h3>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Sincronizado
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Licencias médicas y justificaciones importadas directamente desde los reportes oficiales de SISO.
            </p>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Total registros SISO:</span>
                <span className="font-mono font-bold text-slate-800">{metrics.totalSisoLicenses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Última importación:</span>
                <span className="font-semibold text-slate-700">02/10/2026</span>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('siso')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Importar nuevo CSV de SISO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Long Licenses Quick Box */}
          <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-sm">Licencias de Larga Duración</h3>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Hay <strong>{metrics.longLicensesCount}</strong> licencias vigentes que superan los 15 días continuos de ausencia y requieren designación o seguimiento de suplentes.
            </p>
            <button
              onClick={() => onNavigateTab('solicitudes')}
              className="text-xs font-bold text-amber-900 underline underline-offset-2 hover:text-amber-950 block"
            >
              Ver nómina de licencias largas →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
