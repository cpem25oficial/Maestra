import React from 'react';
import { FileEdit, FolderClock, School, Lock } from 'lucide-react';

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
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo & School Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <School className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight block leading-tight">
                PORTAL DE AGENTES
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                CPEM N° 25 — Gestión de Licencias
              </span>
            </div>
          </div>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-2">
            {/* Desktop Navigation Tabs: ONLY 2 REQUESTED TABS */}
            <nav className="hidden sm:flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => onSelectTab('solicitar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'solicitar'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileEdit className="w-4 h-4" />
                <span>Solicitar licencia</span>
              </button>

              <button
                onClick={() => onSelectTab('mis-solicitudes')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'mis-solicitudes'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FolderClock className="w-4 h-4" />
                <span>Consultar licencias</span>
              </button>
            </nav>

            {/* Mobile Admin Access Icon */}
            {onNavigateToAdmin && (
              <button
                type="button"
                onClick={onNavigateToAdmin}
                className="sm:hidden w-10 h-10 rounded-xl border border-slate-200 bg-slate-100/80 hover:bg-slate-200 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Ingresar al Panel de Administración"
                aria-label="Ingresar al Panel de Administración"
              >
                <Lock className="w-4 h-4 text-slate-700" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar: ONLY 2 TABS */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 shadow-lg pb-safe">
        <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
          <button
            onClick={() => onSelectTab('solicitar')}
            className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'solicitar'
                ? 'text-blue-600 bg-blue-50/80 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileEdit className="w-5 h-5 mb-0.5" />
            <span>Solicitar licencia</span>
          </button>

          <button
            onClick={() => onSelectTab('mis-solicitudes')}
            className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'mis-solicitudes'
                ? 'text-blue-600 bg-blue-50/80 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FolderClock className="w-5 h-5 mb-0.5" />
            <span>Consultar licencias</span>
          </button>
        </div>
      </div>
    </>
  );
};
