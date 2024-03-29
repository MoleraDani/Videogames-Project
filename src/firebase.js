// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA1SXBR6KK9JQMXcHBViPGZU_CnKnr3Hnc',
  authDomain: 'proyecto-m12-videojuegos.firebaseapp.com',
  projectId: 'proyecto-m12-videojuegos',
  storageBucket: 'proyecto-m12-videojuegos.appspot.com',
  messagingSenderId: '819085348035',
  appId: '1:819085348035:web:364d18571420aaaa676676'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
