import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserPlus, 
  Edit3, 
  Trash2, 
  Lock, 
  Mail, 
  AlertCircle, 
  Check, 
  X, 
  Users,
  ShieldAlert
} from 'lucide-react';
import { SystemUser, UserRole } from '../../types';
import { authService } from '../../services/authService';

export const UsuariosModule: React.FC = () => {
  const [users, setUsers] = useState<SystemUser[]>(() => authService.getUsers());
  const currentUser = authService.getCurrentUser();
  const [showModal, setShowModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    displayName: '',
    role: 'admin' as UserRole,
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const refreshList = () => {
    setUsers(authService.getUsers());
  };

  const handleOpenCreate = () => {
    setEditingUserId(null);
    setFormData({
      email: '',
      displayName: '',
      role: 'admin',
      password: '',
    });
    setErrorMsg(null);
    setShowModal(true);
  };

  const handleOpenEdit = (user: SystemUser) => {
    setEditingUserId(user.id);
    setFormData({
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      password: '',
    });
    setErrorMsg(null);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      if (editingUserId) {
        authService.updateUser(editingUserId, {
          displayName: formData.displayName,
          role: formData.role,
          ...(formData.password.trim() ? { password: formData.password } : {}),
        });
      } else {
        authService.createUser({
          email: formData.email,
          displayName: formData.displayName,
          role: formData.role,
          password: formData.password || 'admin123',
        });
      }
      setShowModal(false);
      refreshList();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al guardar el usuario.');
    }
  };

  const handleDelete = (user: SystemUser) => {
    if (user.id === currentUser?.id) {
      alert('No puede eliminar su propia cuenta activa.');
      return;
    }
    if (window.confirm(`¿Está seguro de que desea eliminar la cuenta de ${user.displayName}?`)) {
      try {
        authService.deleteUser(user.id);
        refreshList();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleToggleActive = (user: SystemUser) => {
    if (user.id === currentUser?.id) {
      alert('No puede desactivar su propia cuenta.');
      return;
    }
    authService.updateUser(user.id, { active: !user.active });
    refreshList();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
            <span>Usuarios y Permisos Administrativos</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Gestión de roles: Superadmin (acceso total), Admin (gestión institucional) y Visitante (portal público).
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">NOMBRE / USUARIO</th>
                <th className="py-3 px-4">EMAIL</th>
                <th className="py-3 px-4">ROL ASIGNADO</th>
                <th className="py-3 px-4">ESTADO</th>
                <th className="py-3 px-4 text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                        {u.displayName.charAt(0)}
                      </div>
                      <span>{u.displayName}</span>
                      {u.id === currentUser?.id && (
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                          (Su sesión)
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {u.email}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        u.role === 'superadmin'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : u.role === 'admin'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleActive(u)}
                      disabled={u.id === currentUser?.id}
                      className={`text-xs px-2 py-0.5 rounded-md font-semibold transition-colors ${
                        u.active
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {u.active ? 'Activo' : 'Desactivado'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(u)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"
                        title="Modificar permisos o contraseña"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(u)}
                        disabled={u.id === currentUser?.id}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Eliminar usuario"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT USER MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base">
                  {editingUserId ? 'Modificar Usuario / Permisos' : 'Crear Usuario'}
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre Completo / Sector</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Secretaría CPEM"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email / Usuario</label>
                <input
                  type="email"
                  required
                  disabled={!!editingUserId}
                  placeholder="usuario@cpem.edu.ar"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 disabled:bg-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rol en el Sistema (Sección 2)</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800"
                >
                  <option value="superadmin">Superadmin (Acceso Total y Configuración)</option>
                  <option value="admin">Admin (Gestión Escolar, Cargos y Solicitudes)</option>
                  <option value="visitante">Visitante (Solo Consulta de Frontend Público)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {editingUserId ? 'Nueva Contraseña (dejar en blanco para no cambiar)' : 'Contraseña inicial'}
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
