import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// More robust detection for both client/server and different environments
const isNoFirebase = 
  import.meta.env.PUBLIC_NO_FIREBASE === 'true' || 
  process.env.PUBLIC_NO_FIREBASE === 'true';

let db: any;
let auth: any;

if (isNoFirebase) {
  if (typeof console !== 'undefined') {
    console.log('--- ⚡ NO-FIREBASE MODE ENABLED (SERVER) ---');
  }
  
  const mockEmail = import.meta.env.ADMIN_EMAIL || 'mock@example.com';

  // Mock Firestore
  const mockCollection = () => ({
    doc: () => ({
      get: async () => ({ exists: false, data: () => ({}) }),
      set: async () => ({}),
      update: async () => ({}),
      delete: async () => ({}),
      collection: mockCollection,
    }),
    where: function() { return this; },
    orderBy: function() { return this; },
    limit: function() { return this; },
    get: async () => ({ empty: true, docs: [] }),
    add: async () => ({ id: 'mock-id' }),
  });

  db = {
    collection: mockCollection,
  };

  // Mock Auth
  auth = {
    verifySessionCookie: async () => ({ uid: 'mock-user', email: mockEmail }),
    getUser: async (uid: string) => ({ uid, email: mockEmail, displayName: 'Mock User' }),
    createSessionCookie: async () => 'mock-session-cookie',
    verifyIdToken: async () => ({ uid: 'mock-user' }),
  };
} else {
  const activeApps = getApps();

  const firebaseConfig = {
    projectId: import.meta.env.FIREBASE_PROJECT_ID,
    privateKey: import.meta.env.FIREBASE_PRIVATE_KEY
      ? import.meta.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined,
    clientEmail: import.meta.env.FIREBASE_CLIENT_EMAIL,
  };

  try {
    // Only initialize if no apps exist and we have credentials
    const app = activeApps.length === 0 
      ? initializeApp({
          credential: firebaseConfig.projectId && firebaseConfig.privateKey && firebaseConfig.clientEmail 
            ? cert(firebaseConfig) 
            : undefined
        }) 
      : activeApps[0];

    db = getFirestore(app);
    auth = getAuth(app);
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    // Fallback to mock if initialization fails to prevent total crash in dev
    db = { collection: () => ({ doc: () => ({ get: async () => ({ exists: false }) }), get: async () => ({ docs: [] }) }) };
    auth = { verifySessionCookie: async () => { throw new Error('Firebase not initialized'); } };
  }
}

export { db, auth };

