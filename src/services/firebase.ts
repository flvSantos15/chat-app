import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBYV5nYy4p2d_wAThCH02HOeyX91HVnmxE',
  authDomain: 'chat-app-a91cb.firebaseapp.com',
  projectId: 'chat-app-a91cb',
  storageBucket: 'chat-app-a91cb.appspot.com',
  messagingSenderId: '424660117372',
  appId: '1:424660117372:web:c12937951f51d2e6c666f9'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
