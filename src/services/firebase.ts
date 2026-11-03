import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
// Carga segura de firebase-applet-config.json si existe localmente,
// evitando que Vite falle al compilar en Netlify/GitHub cuando el archivo es ignorado por .gitignore.
const localConfigs = import.meta.glob<{ default: Record<string, string> }>('../../firebase-applet-config.json', { eager: true });
const rawFirebaseConfig = (localConfigs['../../firebase-applet-config.json']?.default || {}) as Record<string, string>;

// Configuración por defecto de Firebase para CPEM 25
const DEFAULT_FIREBASE_CONFIG = {
  projectId: 'gen-lang-client-0302919713',
  appId: '1:769743112053:web:dbcb5747ec96639df2b53c',
  apiKey: 'AIzaSyDx1bJ8JUk-rRyV2-U44-Fq4OwD_mwOGL8',
  authDomain: 'gen-lang-client-0302919713.firebaseapp.com',
  storageBucket: 'gen-lang-client-0302919713.firebasestorage.app',
  messagingSenderId: '769743112053',
  firestoreDatabaseId: 'ai-studio-d7258386-3f0d-4c10-bc1f-4315081542ab',
};

const resolvedConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || rawFirebaseConfig.apiKey || DEFAULT_FIREBASE_CONFIG.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || rawFirebaseConfig.authDomain || DEFAULT_FIREBASE_CONFIG.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || rawFirebaseConfig.projectId || DEFAULT_FIREBASE_CONFIG.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || rawFirebaseConfig.storageBucket || DEFAULT_FIREBASE_CONFIG.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || rawFirebaseConfig.messagingSenderId || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || rawFirebaseConfig.appId || DEFAULT_FIREBASE_CONFIG.appId,
};

const databaseId = 
  import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || 
  rawFirebaseConfig.firestoreDatabaseId || 
  DEFAULT_FIREBASE_CONFIG.firestoreDatabaseId;

const app = initializeApp(resolvedConfig);
export const db = getFirestore(app, databaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client appears offline or permissions restricted for test path.');
    }
  }
}
testFirestoreConnection();
