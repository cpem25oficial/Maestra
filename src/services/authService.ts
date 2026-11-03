import { SystemUser, UserRole } from '../types';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const STORAGE_KEY_AUTH_USER = 'cpem_auth_current_user_v1';
const STORAGE_KEY_USERS_LIST = 'cpem_system_users_v1';

export const INITIAL_SYSTEM_USERS: (SystemUser & { passwordHash: string })[] = [
  {
    id: '1',
    email: 'cpem25oficial@gmail.com',
    displayName: 'Superadmin CPEM 25',
    role: 'superadmin',
    active: true,
    createdAt: '2026-01-01T08:00:00.000Z',
    passwordHash: '123123',
  },
];

class AuthService {
  private currentUser: SystemUser | null = null;
  private users: (SystemUser & { passwordHash: string })[] = [];

  constructor() {
    this.loadUsers();
    this.loadSession();
    this.syncUsersWithFirestore();
  }

  private async syncUsersWithFirestore() {
    try {
      const snap = await getDocs(collection(db, 'users'));
      if (!snap.empty) {
        snap.forEach((d) => {
          const u = d.data() as SystemUser & { passwordHash?: string };
          const idx = this.users.findIndex((local) => local.id === u.id || local.email.toLowerCase() === u.email.toLowerCase());
          if (idx >= 0) {
            this.users[idx] = { ...this.users[idx], ...u };
          } else {
            this.users.push({
              ...u,
              passwordHash: u.passwordHash || '123123',
            });
          }
        });
        // Garantizar que superadmin tenga la clave actualizada 123123
        const superIdx = this.users.findIndex(u => u.email.toLowerCase() === 'cpem25oficial@gmail.com');
        if (superIdx >= 0) {
          this.users[superIdx].passwordHash = '123123';
          this.users[superIdx].active = true;
          this.users[superIdx].role = 'superadmin';
        }
        this.saveUsers();
      } else {
        // Seed default superadmin in Firestore
        const superadmin = INITIAL_SYSTEM_USERS[0];
        setDoc(doc(db, 'users', superadmin.id), superadmin).catch(() => {});
      }
    } catch (e) {
      console.warn('Firestore users sync notice:', e);
    }
  }

  private loadUsers() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USERS_LIST);
      if (stored) {
        const parsed: (SystemUser & { passwordHash: string })[] = JSON.parse(stored);
        // Quitar usuarios de ejemplo
        const filtered = Array.isArray(parsed) 
          ? parsed.filter(u => u.email !== 'secretaria@cpem.edu.ar' && u.email !== 'personal@cpem.edu.ar' && u.email !== 'visitante@cpem.edu.ar')
          : [];
        // Garantizar que superadmin exista
        if (!filtered.some(u => u.email === 'cpem25oficial@gmail.com')) {
          filtered.unshift(INITIAL_SYSTEM_USERS[0]);
        }
        this.users = filtered;
        this.saveUsers();
      } else {
        this.users = [...INITIAL_SYSTEM_USERS];
        this.saveUsers();
      }
    } catch {
      this.users = [...INITIAL_SYSTEM_USERS];
    }
  }

  private saveUsers() {
    try {
      localStorage.setItem(STORAGE_KEY_USERS_LIST, JSON.stringify(this.users));
    } catch (e) {
      console.warn('Could not save users to storage:', e);
    }
  }

  private loadSession() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_AUTH_USER);
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    } catch {
      this.currentUser = null;
    }
  }

  public getCurrentUser(): SystemUser | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null && this.currentUser.active;
  }

  public isSuperadmin(): boolean {
    return this.currentUser?.role === 'superadmin' && this.currentUser.active;
  }

  public isAdminOrSuperadmin(): boolean {
    if (!this.currentUser || !this.currentUser.active) return false;
    return this.currentUser.role === 'admin' || this.currentUser.role === 'superadmin';
  }

  public canManageUsers(): boolean {
    return this.isSuperadmin();
  }

  public login(email: string, password: string): { success: boolean; error?: string; user?: SystemUser } {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedEmail || !trimmedPass) {
      return { success: false, error: 'Por favor ingrese su usuario/email y contraseña.' };
    }

    const found = this.users.find(
      (u) => u.email.toLowerCase() === trimmedEmail && u.passwordHash === trimmedPass
    );

    if (!found) {
      return { success: false, error: 'Credenciales inválidas. Verifique su email y contraseña.' };
    }

    if (!found.active) {
      return { success: false, error: 'El usuario se encuentra desactivado. Comuníquese con la Dirección.' };
    }

    const sessionUser: SystemUser = {
      id: found.id,
      email: found.email,
      displayName: found.displayName,
      role: found.role,
      active: found.active,
      createdAt: found.createdAt,
      lastLogin: new Date().toISOString(),
    };

    this.currentUser = sessionUser;
    try {
      localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(sessionUser));
    } catch (e) {
      console.warn('Session save failed:', e);
    }

    return { success: true, user: sessionUser };
  }

  public logout() {
    this.currentUser = null;
    try {
      localStorage.removeItem(STORAGE_KEY_AUTH_USER);
    } catch (e) {
      console.warn('Session remove failed:', e);
    }
  }

  // Users management (Superadmin only)
  public getUsers(): SystemUser[] {
    return this.users.map(({ passwordHash, ...user }) => user);
  }

  public createUser(userData: { email: string; displayName: string; role: UserRole; password: string }): SystemUser {
    if (!this.isSuperadmin()) {
      throw new Error('Solo el rol Superadmin tiene permisos para crear usuarios.');
    }

    const exists = this.users.some((u) => u.email.toLowerCase() === userData.email.trim().toLowerCase());
    if (exists) {
      throw new Error('Ya existe un usuario registrado con ese email.');
    }

    const newUser: SystemUser & { passwordHash: string } = {
      id: 'user-' + Date.now(),
      email: userData.email.trim().toLowerCase(),
      displayName: userData.displayName.trim(),
      role: userData.role,
      active: true,
      createdAt: new Date().toISOString(),
      passwordHash: userData.password.trim() || 'cpem2026',
    };

    this.users.push(newUser);
    this.saveUsers();

    const { passwordHash, ...safeUser } = newUser;
    setDoc(doc(db, 'users', newUser.id), safeUser).catch((e) =>
      console.warn('Firestore createUser sync failed:', e)
    );
    return safeUser;
  }

  public updateUser(userId: string, updates: Partial<SystemUser> & { password?: string }): SystemUser {
    if (!this.isSuperadmin()) {
      throw new Error('Solo el rol Superadmin tiene permisos para editar usuarios.');
    }

    const index = this.users.findIndex((u) => u.id === userId);
    if (index === -1) {
      throw new Error('Usuario no encontrado.');
    }

    const current = this.users[index];
    this.users[index] = {
      ...current,
      ...updates,
      passwordHash: updates.password ? updates.password.trim() : current.passwordHash,
    };

    this.saveUsers();

    const { passwordHash, ...safeUser } = this.users[index];
    setDoc(doc(db, 'users', userId), safeUser, { merge: true }).catch((e) =>
      console.warn('Firestore updateUser sync failed:', e)
    );
    return safeUser;
  }

  public deleteUser(userId: string) {
    if (!this.isSuperadmin()) {
      throw new Error('Solo el rol Superadmin tiene permisos para eliminar usuarios.');
    }

    if (userId === this.currentUser?.id) {
      throw new Error('No es posible eliminar su propio usuario activo.');
    }

    this.users = this.users.filter((u) => u.id !== userId);
    this.saveUsers();
    deleteDoc(doc(db, 'users', userId)).catch((e) =>
      console.warn('Firestore deleteUser sync failed:', e)
    );
  }
}

export const authService = new AuthService();
