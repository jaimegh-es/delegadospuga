import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup as _signInWithPopup } from "firebase/auth";

const isNoFirebase = 
  import.meta.env.PUBLIC_NO_FIREBASE === 'true' || 
  (typeof process !== 'undefined' && process.env?.PUBLIC_NO_FIREBASE === 'true');

let auth: any;
let googleProvider: any;
let signInWithPopup: any;

if (isNoFirebase) {
  if (typeof console !== 'undefined') {
    console.log('--- ⚡ NO-FIREBASE MODE ENABLED (CLIENT) ---');
  }
  auth = {
    currentUser: { uid: 'mock-user', email: 'mock@example.com', displayName: 'Mock User' },
    onAuthStateChanged: (callback: any) => {
      callback({ uid: 'mock-user', email: 'mock@example.com', displayName: 'Mock User' });
      return () => {};
    },
    signOut: async () => {},
  };
  googleProvider = {};
  signInWithPopup = async () => ({
    user: {
      uid: 'mock-user',
      email: 'mock@example.com',
      displayName: 'Mock User',
      getIdToken: async () => 'mock-id-token'
    }
  });
} else {
  const firebaseConfig = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
  };

  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    signInWithPopup = _signInWithPopup;
  } catch (error) {
    console.error('Failed to initialize Firebase Client:', error);
    auth = { onAuthStateChanged: () => () => {} };
    googleProvider = {};
    signInWithPopup = async () => { throw new Error('Firebase not initialized'); };
  }
}

export { auth, googleProvider, signInWithPopup };
