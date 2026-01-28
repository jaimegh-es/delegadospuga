import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const activeApps = getApps();

const firebaseConfig = {
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  privateKey: import.meta.env.FIREBASE_PRIVATE_KEY
    ? import.meta.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined,
  clientEmail: import.meta.env.FIREBASE_CLIENT_EMAIL,
};

// Only initialize if no apps exist (prevents hot-reload errors)
const app = activeApps.length === 0 
  ? initializeApp({
      credential: cert(firebaseConfig)
    }) 
  : activeApps[0];

export const db = getFirestore(app);
export const auth = getAuth(app);

