import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  onSnapshot, 
  getDocFromServer,
  Firestore 
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Sign in with Google Popup
export async function signInWithGoogle(): Promise<FirebaseUser | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err) {
    console.error('Firebase Google Sign-in error:', err);
    throw err;
  }
}

// Sign out
export async function signOutUser(): Promise<void> {
  await firebaseSignOut(auth);
}

// Test Firestore Connection on Boot (Required by Firebase Integration Guidelines)
export async function validateFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase configuration notice: Firestore is currently operating in offline mode.');
    }
  }
}

// Sync user bookmarks to Firestore
export async function syncUserBookmarksToFirestore(uid: string, bookmarkedHolidayIds: string[]) {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      uid,
      bookmarkedHolidays: bookmarkedHolidayIds,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error('Failed to sync bookmarks to Firestore:', err);
  }
}

// Load user bookmarks from Firestore
export async function loadUserBookmarksFromFirestore(uid: string): Promise<string[] | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      return data.bookmarkedHolidays || [];
    }
    return null;
  } catch (err) {
    console.error('Failed to load bookmarks from Firestore:', err);
    return null;
  }
}

// Execute connection validation on import
validateFirestoreConnection().catch(() => {});
