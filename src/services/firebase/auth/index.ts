import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  collection,
  where
} from 'firebase/firestore'
import { auth, db } from '../../firebase'

interface CreateUserProps {
  email: string
  password: string
  displayName: string
  file: string
}

export async function createUserAuthetication({
  email,
  password,
  displayName,
  file
}: CreateUserProps) {
  return await createUserWithEmailAndPassword(auth, email, password).then(
    async (userCredential) => {
      const user = userCredential.user

      const userDoc = {
        uid: user.uid,
        displayName,
        email,
        photoURL: file
      }

      const userDocCollectionReference = doc(db, 'users', user.uid)

      const userChatDocCollectionReference = doc(db, 'usersChats', user.uid)

      await setDoc(userDocCollectionReference, userDoc)

      await setDoc(userChatDocCollectionReference, {})

      return user
    }
  )
}

interface SignInRequest {
  email: string
  password: string
}

export const signIn = async ({ email, password }: SignInRequest) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    return err
  }
}

interface GetUserDataRequest {
  uid: string
}

export const getUserData = async ({ uid }: GetUserDataRequest) => {
  const collectionPath = 'users'

  const docRef = doc(db, collectionPath, uid)

  const docResponse = await getDoc(docRef)

  if (docResponse.exists()) {
    const { displayName, email, uid, photoURL } = docResponse.data()

    return { displayName, email, uid, photoURL }
  }
}

interface GetUserRequest {
  userName: string
}

interface GetUserResponse {
  displayName: string
  email: string
  photoURL: string
}

export const getUser = async ({ userName }: GetUserRequest) => {
  const collectionRef = collection(db, 'users')

  const firebaseQuery = query(
    collectionRef,
    where('displayName', '==', userName)
  )

  const querySnapshot = await getDocs(firebaseQuery)

  const queryResponse = querySnapshot.docs.map((document) =>
    document.data()
  )[0] as GetUserResponse

  return queryResponse
}
