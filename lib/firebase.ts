import {
  Firestore,
  getFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { Auth, getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let firebaseApp: FirebaseApp;
export let auth: Auth;
export let db: Firestore;

// Add emulator connection before initialization
if (process.env.NODE_ENV === "development") {
  const firestoreEmulatorHost = "localhost";
  const firestoreEmulatorPort = 8080;
  const authEmulatorHost = "http://localhost:9099";

  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp);
    auth = getAuth(firebaseApp);

    connectFirestoreEmulator(db, firestoreEmulatorHost, firestoreEmulatorPort);
    connectAuthEmulator(auth, authEmulatorHost);
  }
} else {
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApps()[0];
  }
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
}
