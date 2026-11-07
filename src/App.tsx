import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { SolicitarLicencia } from './components/SolicitarLicencia';
import { MisSolicitudes } from './components/MisSolicitudes';
import { AdminLayout } from './components/admin/AdminLayout';
import { dataService } from './services/dataService';
import { authService } from './services/authService';
import { driveSyncCronService } from './services/driveSyncCronService';
import { SystemUser } from './types';
import { Lock, Mail, School, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';

const isAdminPath = (pathname: string, hash: string): boolean => {
  const p = (pathname || '').toLowerCase();
  const h = (hash || '').toLowerCase();
  return (
    p === '/admin' ||
    p === '/dashboard' ||
    p.startsWith('/admin/') ||
    p.startsWith('/dashboard/') ||
    h === '#admin' ||
    h === '#/admin' ||
    h === '#dashboard' ||
    h === '#/dashboard'
  );
};

export default function App() {
  const [viewMode, setViewMode] = useState<'public' | 'admin'>(() => 
    typeof window !== 'undefined' && isAdminPath(window.location.pathname, window.location.hash) ? 'admin' : 'public'
  );
  const [publicTab, setPublicTab] = useState<ActiveTab>('solicitar');
  const [currentEmployeeNumber, setCurrentEmployeeNumber] = useState<string>('1042');
  const [currentUser, setCurrentUser] = useState<SystemUser | null>(() => authService.getCurrentUser());

  // Private login form state for /admin or /dashboard
  const [adminEmail, setAdminEmail] = useState('cpem25oficial@gmail.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);
  const [isAdminLoggingIn, setIsAdminLoggingIn] = useState(false);

  useEffect(() => {
    // Initialize data service & Firestore collections
    dataService.initialize();

    // Initialize automatic 1-hour Drive synchronization cron
    driveSyncCronService.init();

    // Listen to browser URL changes (back/forward and hash changes)
    const handleLocationChange = () => {
      const isAdm = isAdminPath(window.location.pathname, window.location.hash);
      setViewMode(isAdm ? 'admin' : 'public');
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToAdmin = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/admin');
    }
    setViewMode('admin');
  };

  const navigateToPublic = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/');
    }
    setViewMode('public');
  };

  const handleNavigateToMisSolicitudes = (empNum: string) => {
    setCurrentEmployeeNumber(empNum);
    setPublicTab('mis-solicitudes');
  };

  const handleNavigateToSolicitar = (empNum?: string) => {
    if (empNum) setCurrentEmployeeNumber(empNum);
    setPublicTab('solicitar');
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdminLoggingIn(true);
    setAdminLoginError(null);

    const res = authService.login(adminEmail, adminPassword);
    setIsAdminLoggingIn(false);

    if (res.success && res.user) {
      setCurrentUser(res.user);
      if (res.user.role === 'visitante') {
        alert('Rol Visitante: Solo posee acceso al Frontend Público.');
        navigateToPublic();
      } else {
        setViewMode('admin');
      }
    } else {
      setAdminLoginError(res.error || 'Credenciales administrativas inválidas.');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigateToPublic();
  };

  // 1. PRIVATE ADMIN / DASHBOARD VIEW (/admin o /dashboard)
  if (viewMode === 'admin') {
    // If authenticated as admin or superadmin, render AdminLayout
    if (authService.isAdminOrSuperadmin()) {
      return (
        <AdminLayout
          onSwitchToPublicPortal={navigateToPublic}
          onLogout={handleLogout}
        />
      );
    }

    // Otherwise, render dedicated private login screen for /admin or /dashboard
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 selection:bg-blue-600 selection:text-white">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-scale-up">
          {/* Institution Brand */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
              <School className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Acceso Privado al Dashboard</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Secretaría y Dirección CPEM 25
            </h1>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Ingrese sus credenciales administrativas para acceder a la gestión escolar y auditoría documental.
            </p>
          </div>

          {adminLoginError && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{adminLoginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Correo Electrónico / Usuario
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="cpem25oficial@gmail.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm font-mono transition-all"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm font-mono transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isAdminLoggingIn}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isAdminLoggingIn ? (
                <span>Verificando credenciales...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Ingresar al Dashboard Privado</span>
                </>
              )}
            </button>
          </form>

          {/* Return to public portal button */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={navigateToPublic}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al Portal Público de Agentes</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. PUBLIC FRONTEND FOR AGENTS (Only "Solicitar Licencia" and "Mis Solicitudes")
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Institutional Top Navbar with ONLY the 2 requested tabs */}
      <Navbar
        activeTab={publicTab}
        onSelectTab={setPublicTab}
        onNavigateToAdmin={navigateToAdmin}
      />

      {/* Main Container: Strictly Formulario de Solicitar Licencia y Mis Solicitudes */}
      <main className="flex-1 pb-24 sm:pb-12">
        {publicTab === 'solicitar' && (
          <SolicitarLicencia
            initialEmployeeNumber={currentEmployeeNumber}
            onGoToMisSolicitudes={handleNavigateToMisSolicitudes}
          />
        )}

        {publicTab === 'mis-solicitudes' && (
          <MisSolicitudes
            initialEmployeeNumber={currentEmployeeNumber}
            onGoToSolicitar={handleNavigateToSolicitar}
          />
        )}
      </main>

      {/* Institutional Clean Footer with discreet link to private /admin */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 hidden sm:block">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2026 CPEM N° 25 — Sistema Oficial de Licencias Docentes
          </span>
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                navigateToAdmin();
              }}
              className="hover:text-blue-600 font-semibold flex items-center gap-1 transition-colors"
              title="Acceso restringido para Secretaría y Dirección"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Acceso Administrativo (/admin)</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
