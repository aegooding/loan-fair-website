// Firebase setup — form submissions are saved to Firestore.
// Fill in your own values in a .env file (copy .env.example).
// If env vars aren't set, submitEnquiry will log to console instead.
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Only initialise Firebase if the project ID is configured
const isConfigured = !!import.meta.env.VITE_FIREBASE_PROJECT_ID
const app = isConfigured ? initializeApp(firebaseConfig) : null
const db = isConfigured ? getFirestore(app) : null

// Call this to save a form submission.
// Returns a Promise that resolves when the data is saved.
export async function submitEnquiry(formData) {
  if (!db) {
    // Firebase not configured yet — just log the data so you can see it's working
    console.log('Enquiry submitted (Firebase not configured):', formData)
    return
  }

  await addDoc(collection(db, 'enquiries'), {
    ...formData,
    submittedAt: serverTimestamp(),
  })
}

export { db }
