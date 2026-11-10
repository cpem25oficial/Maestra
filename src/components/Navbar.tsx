import React from 'react';
import { FileEdit, FolderClock, Lock } from 'lucide-react';

export type ActiveTab = 'solicitar' | 'mis-solicitudes';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onNavigateToAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  onSelectTab,
  onNavigateToAdmin
}) => {
  return (
    <div className="w-full">
      {/* HEADER EXACTO SEGÚN IMAGEN 1 (Fondo #2B3E4C, Color secundario #87b867) */}
      <header className="max-w-4xl mx-auto px-4 pt-4 sm:pt-6">
        <div className="bg-[#2B3E4C] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg border border-slate-700/40 relative overflow-hidden">
          
          {/* Fila superior: Logo oficial + Título */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center sm:text-left">
            <img 
              src="https://cpem25.wordpress.com/wp-content/uploads/2024/11/logo-png.png?w=240&h=216" 
              onError={(e) => { e.currentTarget.src = "/logo-cpem25.png"; }}
              alt="Logo CPEM 25" 
              className="h-14 sm:h-16 w-auto object-contain shrink-0" 
            />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Sistema de Gestión de Licencias
              </h1>
              <span className="text-sm sm:text-base font-semibold text-white/90 block mt-0.5">
                CPEM Nº 25
              </span>
            </div>
          </div>

          {/* Subtítulo: Complete los formularios según corresponda */}
          <p className="text-slate-200 text-xs sm:text-sm font-medium text-center mt-3 sm:mt-4">
            Complete los formularios según corresponda
          </p>

          {/* Enlace al Régimen de Licencias con icono informativo (i) */}
          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-center mt-2.5">
            <span className="w-4 h-4 rounded-full bg-white text-[#2B3E4C] inline-flex items-center justify-center font-bold text-[10px] shrink-0 font-serif shadow-2xs">
              i
            </span>
            <a 
              href="https://www.neuquen.edu.ar/wp-content/uploads/2022/07/RegimenLicenciasJustificacionesFranquicias.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-2 hover:text-[#87b867] transition-colors"
            >
              Régimen de Licencias, Justificaciones y Franquicias Decreto Nº 1.429/73
            </a>
          </div>

          {/* Acceso administrativo discreto en la esquina superior para preservar funcionalidad */}
          {onNavigateToAdmin && (
            <button
              type="button"
              onClick={onNavigateToAdmin}
              className="absolute top-3 right-3 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Acceso Administrativo"
              aria-label="Acceso Administrativo"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Pestañas de navegación pública: Solicitar Licencia y Consultar Licencias */}
        <div className="flex justify-center mt-4 sm:mt-5">
          <nav className="inline-flex p-1 bg-white rounded-2xl shadow-xs border border-slate-200 gap-1.5">
            <button
              onClick={() => onSelectTab('solicitar')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'solicitar'
                  ? 'bg-[#87b867] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#2B3E4C] hover:bg-slate-50'
              }`}
            >
              <FileEdit className="w-4 h-4" />
              <span>Solicitar licencia</span>
            </button>

            <button
              onClick={() => onSelectTab('mis-solicitudes')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'mis-solicitudes'
                  ? 'bg-[#87b867] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#2B3E4C] hover:bg-slate-50'
              }`}
            >
              <FolderClock className="w-4 h-4" />
              <span>Consultar licencias</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Barra de navegación inferior móvil */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#2B3E4C]/95 backdrop-blur-md border-t border-slate-700/60 px-3 py-1.5 shadow-xl pb-safe">
        <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
          <button
            onClick={() => onSelectTab('solicitar')}
            className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'solicitar'
                ? 'text-white bg-[#87b867] font-bold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileEdit className="w-5 h-5 mb-0.5" />
            <span>Solicitar licencia</span>
          </button>

          <button
            onClick={() => onSelectTab('mis-solicitudes')}
            className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'mis-solicitudes'
                ? 'text-white bg-[#87b867] font-bold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <FolderClock className="w-5 h-5 mb-0.5" />
            <span>Consultar licencias</span>
          </button>
        </div>
      </div>
    </div>
  );
};
