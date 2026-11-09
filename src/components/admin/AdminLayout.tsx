import React, { useState, useEffect } from 'react';
import { 
  School, 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  FileSpreadsheet, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  ArrowLeft, 
  Menu, 
  X,
  ExternalLink,
  ChevronRight,
  Clock,
  PanelLeftClose,
  PanelLeftOpen,
  Maximize2,
  Minimize2,
  FolderArchive,
  ShieldAlert,
  Cloud,
  Check,
  Users2,
  Network
} from 'lucide-react';
import { authService } from '../../services/authService';
import { SystemUser, LicenseRequest } from '../../types';
import { isGoogleDriveConnected, subscribeToDriveAuth, connectGoogleAdminDrive } from '../../services/googleDriveService';
import { AdminDashboard } from './AdminDashboard';
import { AgentesModule } from './AgentesModule';
import { CargosPuestosModule } from './CargosPuestosModule';
import { SolicitudesAdminModule } from './SolicitudesAdminModule';
import { SisoImportModule } from './SisoImportModule';
import { ConfiguracionModule } from './ConfiguracionModule';
import { UsuariosModule } from './UsuariosModule';
import { SuperadminArchivosModule } from './SuperadminArchivosModule';
import { AsambleaModule } from './AsambleaModule';
import { ArticulacionesModule } from './ArticulacionesModule';
import { HorariosModule } from './HorariosModule';

interface AdminLayoutProps {
  onSwitchToPublicPortal: () => void;
  onLogout: () => void;
}

export type AdminTab = 
  | 'dashboard'
  | 'cargos'
  | 'horarios'
  | 'solicitudes'
  | 'agentes'
  | 'siso'
  | 'configuracion'
  | 'asamblea'
  | 'articulaciones'
  | 'usuarios'
  | 'archivos';

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  onSwitchToPublicPortal,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('cargos');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [initialRequestToEval, setInitialRequestToEval] = useState<LicenseRequest | null>(null);

  // Auto-hide panel: starts in icon-only mode to maximize screen space
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Google Drive session state
  const [driveConnected, setDriveConnected] = useState<boolean>(() => isGoogleDriveConnected());

  useEffect(() => {
    return subscribeToDriveAuth((connected) => {
      setDriveConnected(connected);
    });
  }, []);

  const handleQuickConnectDrive = async () => {
    try {
      await connectGoogleAdminDrive();
    } catch (e: any) {
      console.warn('Error connecting drive:', e);
      // Cambiar a la pestaña de archivos donde se muestra el panel de ayuda detallado
      setActiveTab('archivos');
    }
  };

  const currentUser = authService.getCurrentUser();
  const isSuperadmin = authService.isSuperadmin();

  // Sidebar is visually expanded if pinned OR hovered
  const isExpanded = isPinned || isHovered;

  const handleNavigateTab = (tabId: string) => {
    setActiveTab(tabId as AdminTab);
    setMobileMenuOpen(false);
  };

  const handleOpenEvaluateRequest = (req: LicenseRequest) => {
    setInitialRequestToEval(req);
    setActiveTab('solicitudes');
  };

  const generalNavItems: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5 shrink-0" /> },
    { id: 'cargos', label: 'Cargos y Puestos', icon: <Briefcase className="w-5 h-5 shrink-0" /> },
    { id: 'horarios', label: 'Asignar Horarios', icon: <Clock className="w-5 h-5 shrink-0" /> },
    { id: 'solicitudes', label: 'Solicitudes de Licencias', icon: <FileText className="w-5 h-5 shrink-0" /> },
    { id: 'agentes', label: 'Agentes', icon: <Users className="w-5 h-5 shrink-0" /> },
    { id: 'siso', label: 'SISO (Carga y Filtros)', icon: <FileSpreadsheet className="w-5 h-5 shrink-0" /> },
    { id: 'configuracion', label: 'Tipos de Licencias', icon: <Settings className="w-5 h-5 shrink-0" /> },
    { id: 'asamblea', label: 'Asamblea', icon: <Users2 className="w-5 h-5 shrink-0" /> },
    { id: 'articulaciones', label: 'Articulaciones', icon: <Network className="w-5 h-5 shrink-0" /> },
  ];

  const superadminNavItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { 
      id: 'archivos', 
      label: 'Archivos de Justificación', 
      icon: <FolderArchive className="w-5 h-5 shrink-0" />,
      badge: 'Archivos'
    },
    { 
      id: 'usuarios', 
      label: 'Usuarios y Permisos', 
      icon: <ShieldCheck className="w-5 h-5 shrink-0" />,
      badge: 'Seguridad'
    },
  ];

  const allNavItems = [...generalNavItems, ...superadminNavItems];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row antialiased">
      {/* DESKTOP SIDEBAR PLACEHOLDER (maintains layout spacing: w-16 when auto-hide, w-64 when pinned) */}
      <div 
        className={`hidden md:block shrink-0 transition-all duration-300 ease-in-out ${
          isPinned ? 'w-64' : 'w-16'
        }`} 
      />

      {/* SIDEBAR (Desktop - Auto-hiding / Floating Overlay on Hover) */}
      <aside 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`hidden md:flex flex-col fixed top-0 bottom-0 left-0 bg-slate-900 text-white z-40 border-r border-slate-800 transition-all duration-300 ease-in-out ${
          isExpanded 
            ? 'w-64 shadow-2xl shadow-slate-950/60' 
            : 'w-16 shadow-md'
        }`}
      >
        {/* Brand */}
        <div className={`border-b border-slate-800 flex items-center h-16 transition-all ${
          isExpanded ? 'px-4 gap-3 justify-between' : 'px-0 justify-center'
        }`}>
          <div className="flex items-center gap-3 min-w-0">
            <div 
              className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold shadow-md shrink-0 cursor-pointer"
              onClick={() => setIsPinned(!isPinned)}
              title={isPinned ? 'Desanclar (Auto-ocultar solo iconos)' : 'Fijar menú expandido'}
            >
              <School className="w-5 h-5 text-white" />
            </div>
            {isExpanded && (
              <div className="min-w-0 overflow-hidden animate-fade-in">
                <h2 className="font-black text-sm tracking-tight text-white leading-tight truncate">
                  APP CPEM
                </h2>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block truncate">
                  Administración
                </span>
              </div>
            )}
          </div>

          {isExpanded && (
            <button
              onClick={() => setIsPinned(!isPinned)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isPinned ? 'Auto-ocultar (Solo iconos)' : 'Fijar menú'}
            >
              {isPinned ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* User Profile Mini */}
        <div className={`bg-slate-800/60 border-b border-slate-800 flex items-center transition-all ${
          isExpanded ? 'p-3.5 gap-3' : 'p-3 justify-center'
        }`}>
          <div 
            className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-sm shrink-0"
            title={`${currentUser?.displayName} (${currentUser?.role})`}
          >
            {currentUser?.displayName.charAt(0) || 'A'}
          </div>
          {isExpanded && (
            <div className="min-w-0 flex-1 overflow-hidden animate-fade-in">
              <span className="font-bold text-xs text-white truncate block">
                {currentUser?.displayName}
              </span>
              <span className="text-[10px] uppercase font-bold text-blue-400 font-mono tracking-wider block truncate">
                {currentUser?.role}
              </span>
            </div>
          )}
        </div>

        {/* Navigation Items - Only icons visible when collapsed */}
        <nav className="flex-1 p-2 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {generalNavItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleNavigateTab(item.id)}
                  title={!isExpanded ? item.label : undefined}
                  className={`w-full flex items-center rounded-xl text-xs font-bold transition-all ${
                    isExpanded 
                      ? 'gap-3 px-3 py-2.5 text-left' 
                      : 'justify-center p-2.5 text-center'
                  } ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className="relative">
                    {item.icon}
                    {isActive && !isExpanded && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-300 ring-2 ring-slate-900" />
                    )}
                  </div>

                  {isExpanded && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />}
                    </>
                  )}
                </button>

                {/* Floating Tooltip when collapsed */}
                {!isExpanded && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-slate-950 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-slate-700">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}

          {/* SPECIAL SECTION FOR SUPERADMIN (Explicit User Requirement) */}
          {isSuperadmin && (
            <div className="pt-3 mt-3 border-t border-slate-800 space-y-1.5">
              <div className={`flex items-center ${isExpanded ? 'px-3 justify-between' : 'justify-center'} py-1 text-[10px] font-bold uppercase tracking-wider text-purple-400`}>
                {isExpanded ? (
                  <>
                    <span className="flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                      <span>Zona Superadmin</span>
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono text-[9px]">
                      Exclusivo
                    </span>
                  </>
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-400 ring-2 ring-purple-500/30" title="Zona Superadmin" />
                )}
              </div>

              {superadminNavItems.map((item) => {
                const isActive = activeTab === item.id;

                return (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => handleNavigateTab(item.id)}
                      title={!isExpanded ? `${item.label} (Superadmin)` : undefined}
                      className={`w-full flex items-center rounded-xl text-xs font-bold transition-all ${
                        isExpanded 
                          ? 'gap-3 px-3 py-2.5 text-left' 
                          : 'justify-center p-2.5 text-center'
                      } ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40 ring-1 ring-purple-400/50'
                          : 'text-purple-200/70 hover:text-white hover:bg-purple-950/40 border border-purple-900/40'
                      }`}
                    >
                      <div className="relative">
                        {item.icon}
                        {isActive && !isExpanded && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-300 ring-2 ring-slate-900" />
                        )}
                      </div>

                      {isExpanded && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />}
                        </>
                      )}
                    </button>

                    {/* Floating Tooltip when collapsed */}
                    {!isExpanded && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-purple-950 text-purple-100 text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-purple-700">
                        {item.label} (Superadmin)
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </nav>

        {/* Bottom Actions */}
        <div className={`border-t border-slate-800 transition-all ${
          isExpanded ? 'p-3 space-y-1.5' : 'p-2 space-y-2 flex flex-col items-center'
        }`}>
          {/* Public Frontend Link */}
          <div className="relative group w-full">
            <button
              onClick={onSwitchToPublicPortal}
              title={!isExpanded ? 'Ver Frontend Público' : undefined}
              className={`w-full flex items-center rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors ${
                isExpanded ? 'gap-2 px-3 py-2 text-left' : 'justify-center p-2 text-center'
              }`}
            >
              <ExternalLink className="w-4 h-4 text-blue-400 shrink-0" />
              {isExpanded && <span className="truncate">Frontend Público</span>}
            </button>
            {!isExpanded && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-slate-950 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-slate-700">
                Ver Frontend Público
              </div>
            )}
          </div>

          {/* Logout */}
          <div className="relative group w-full">
            <button
              onClick={onLogout}
              title={!isExpanded ? 'Cerrar Sesión' : undefined}
              className={`w-full flex items-center rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors ${
                isExpanded ? 'gap-2 px-3 py-2 text-left' : 'justify-center p-2 text-center'
              }`}
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {isExpanded && <span className="truncate">Cerrar Sesión</span>}
            </button>
            {!isExpanded && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-slate-950 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-slate-700">
                Cerrar Sesión
              </div>
            )}
          </div>

          {/* Auto-hide Status Indicator / Toggle */}
          <div className="pt-1 border-t border-slate-800/60 w-full">
            <button
              onClick={() => setIsPinned(!isPinned)}
              title={isPinned ? 'Desactivar modo fijo (Auto-ocultar solo iconos)' : 'Fijar menú lateral'}
              className={`w-full flex items-center text-[10px] text-slate-400 hover:text-slate-200 transition-colors py-1 ${
                isExpanded ? 'justify-between px-2' : 'justify-center px-0'
              }`}
            >
              {isExpanded ? (
                <>
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isPinned ? 'bg-amber-400' : 'bg-emerald-400 ring-2 ring-emerald-500/20'}`} />
                    <span>{isPinned ? 'Menú fijo' : 'Auto-ocultar activo'}</span>
                  </span>
                  <PanelLeftClose className="w-3.5 h-3.5" />
                </>
              ) : (
                <div className="relative group">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-500/20 block" />
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 bg-slate-950 text-white text-[11px] font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-slate-700">
                    Auto-ocultar activo (Solo iconos)
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE TOPBAR */}
      <header className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <School className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm block leading-tight">APP CPEM</span>
            <span className="text-[10px] text-slate-400 uppercase">Panel Administrativo</span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-white p-4 space-y-2 border-b border-slate-800 animate-fade-in max-h-[80vh] overflow-y-auto">
          {generalNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigateTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                  isActive ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Special Section for Superadmin in Mobile Drawer */}
          {isSuperadmin && (
            <div className="pt-2 mt-2 border-t border-slate-800 space-y-1.5">
              <span className="px-3 text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                Zona Superadmin
              </span>
              {superadminNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigateTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                      isActive ? 'bg-purple-600 text-white shadow-md' : 'text-purple-300 hover:bg-purple-950/60 border border-purple-900/40'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={onSwitchToPublicPortal}
              className="flex-1 py-2 text-xs font-bold text-center bg-slate-800 text-blue-400 rounded-xl"
            >
              Frontend Público
            </button>
            <button
              onClick={onLogout}
              className="flex-1 py-2 text-xs font-bold text-center bg-red-900/40 text-red-300 rounded-xl"
            >
              Salir
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA - MAXIMIZED FOR FULL SCREEN WIDTH */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top desktop utility bar */}
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200 px-6 lg:px-8 items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-4">
            {/* Quick Auto-hide Toggle Button */}
            <button
              onClick={() => setIsPinned(!isPinned)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-all shadow-2xs"
              title={isPinned ? 'Contraer panel a solo iconos' : 'Fijar panel expandido'}
            >
              {isPinned ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Auto-ocultar (Solo Iconos)</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="flex items-center gap-1.5">
                    <span>Pantalla Máxima</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </span>
                </>
              )}
            </button>

            <span className="text-slate-200">|</span>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Módulo:
              </span>
              <span className="text-sm font-bold text-slate-900 capitalize">
                {allNavItems.find((n) => n.id === activeTab)?.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Google Drive Status Indicator */}
            {driveConnected ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Google Drive Conectado</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleQuickConnectDrive}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 transition-colors cursor-pointer"
                title="Conectar cuenta institucional de Google Drive"
              >
                <Cloud className="w-3.5 h-3.5 text-amber-600" />
                <span>Conectar Google Drive</span>
              </button>
            )}

            <button
              onClick={onSwitchToPublicPortal}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Portal Público de Agentes</span>
            </button>

            <span className="text-slate-300">|</span>

            <div className="text-xs text-right">
              <span className="font-bold text-slate-800 block">{currentUser?.displayName}</span>
              <span className="text-[10px] text-slate-400 font-mono">{currentUser?.email}</span>
            </div>
          </div>
        </header>

        {/* Content body - Uses 100% of the maximized screen without max-w-7xl constraint */}
        <div className="p-3 sm:p-5 lg:p-6 flex-1 w-full max-w-none">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              onNavigateTab={handleNavigateTab}
              onOpenRequestModal={handleOpenEvaluateRequest}
            />
          )}

          {activeTab === 'agentes' && <AgentesModule />}

          {activeTab === 'cargos' && <CargosPuestosModule />}

          {activeTab === 'horarios' && <HorariosModule />}

          {activeTab === 'solicitudes' && (
            <SolicitudesAdminModule
              initialSelectedRequest={initialRequestToEval}
              onClearInitialSelected={() => setInitialRequestToEval(null)}
            />
          )}

          {activeTab === 'siso' && <SisoImportModule />}

          {activeTab === 'configuracion' && <ConfiguracionModule />}

          {activeTab === 'asamblea' && <AsambleaModule />}

          {activeTab === 'articulaciones' && <ArticulacionesModule />}

          {activeTab === 'usuarios' && <UsuariosModule />}

          {activeTab === 'archivos' && isSuperadmin && <SuperadminArchivosModule />}
        </div>
      </main>
    </div>
  );
};
