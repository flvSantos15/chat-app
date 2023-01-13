import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_API_KEY as string,
  authDomain: process.env.NEXT_API_DOMAIN as string,
  projectId: process.env.NEXT_PROJECT_ID as string,
  storageBucket: process.env.NEXT_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_APP_ID as string
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
