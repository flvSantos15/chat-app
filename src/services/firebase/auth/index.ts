import { createUserWithEmailAndPassword, User } from 'firebase/auth'
import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  collection,
  where,
  updateDoc,
  serverTimestamp,
  onSnapshot
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

type CustomUserProps = Pick<User, 'displayName' | 'email' | 'photoURL' | 'uid'>

interface GetUserChatResponse {
  currentUser: CustomUserProps
  selectedUser: CustomUserProps
}

export const getUserChat = async ({
  currentUser,
  selectedUser
}: GetUserChatResponse) => {
  const combinedId =
    currentUser.uid > selectedUser.uid
      ? currentUser.uid + selectedUser.uid
      : selectedUser.uid + currentUser.uid

  const docRef = doc(db, 'chats', combinedId)

  const response = await getDoc(docRef)

  if (!response.exists()) {
    // creat chat
    await setDoc(docRef, { messages: [] })

    // create user chat
    const docUpdateCurrentUserRef = doc(db, 'usersChats', selectedUser.uid)
    const docUpdateRef = doc(db, 'usersChats', currentUser.uid)

    await updateDoc(docUpdateRef, {
      [combinedId + '.userInfo']: {
        uid: selectedUser.uid,
        displayName: selectedUser.displayName,
        photoURL: selectedUser.photoURL
      },
      [combinedId + '.date']: serverTimestamp()
    })

    await updateDoc(docUpdateCurrentUserRef, {
      [combinedId + '.userInfo']: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL
      },
      [combinedId + '.date']: serverTimestamp()
    })
  }
}

interface GetChatsRequest {
  currentUser: User | null
}

export const getChats = async ({ currentUser }: GetChatsRequest) => {
  const docsRef = doc(db, 'usersChats', currentUser?.uid as string)

  await onSnapshot(docsRef, (doc) => {
    const response = doc.data()
  })
}
