import {
  createUserWithEmailAndPassword,
  updateProfile,
  User
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, storage, db } from '../../firebase'

interface CreateUserProps {
  email: string
  password: string
  displayName: string
}

export async function createUserAuthetication({
  email,
  password,
  displayName
}: CreateUserProps) {
  return await createUserWithEmailAndPassword(auth, email, password).then(
    async (userCredential) => {
      const user = userCredential.user

      const collectionPath = 'users'

      const userDoc = {
        uid: user.uid,
        displayName,
        email
      }

      const userDocCollectionReference = doc(db, collectionPath, user.uid)

      await setDoc(userDocCollectionReference, userDoc)

      return user
    }
  )
}

interface UploadImageProps {
  name: string
  file: Blob | Uint8Array | ArrayBuffer
  email: string
  user: User
}

export async function uploadImage({
  file,
  name,
  user,
  email
}: UploadImageProps) {
  const storageRef = ref(storage, name)

  const uploadTask = uploadBytesResumable(storageRef, file)

  uploadTask.on(
    'state_changed',
    // (snapshot) => {
    //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //   console.log('Upload is ' + progress + '% done')
    //   switch (snapshot.state) {
    //     case 'paused':
    //       console.log('Upload is paused')
    //       break
    //     case 'running':
    //       console.log('Upload is running')
    //       break
    //   }
    // },
    (error) => {
      // Handle unsuccessful uploads
      return error
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        // console.log('File available at', downloadURL)
        await updateProfile(user, {
          displayName: name
          // photoURL: downloadURL
        })

        const collectionPath = 'users'

        const userDoc = {
          // dados do user que quero guardar
          uid: user.uid,
          displayName: name,
          email
          // photoURL: downloadURL
        }

        const userDocCollectionReference = doc(db, collectionPath, user.uid)

        await setDoc(userDocCollectionReference, userDoc)
      })
    }
  )
}

interface CreateUserDoc {
  user: User
  displayName: string
  email: string
}

export const createUserDoc = async ({
  user,
  displayName,
  email
}: CreateUserDoc) => {
  try {
    const collectionPath = 'users'

    const userDoc = {
      // dados do user que quero guardar
      uid: user.uid,
      displayName,
      email
      // photoURL: downloadURL
    }

    const userDocCollectionReference = doc(db, collectionPath, user.uid)

    await setDoc(userDocCollectionReference, userDoc)

    console.log({
      db,
      userDocCollectionReference
    })

    return userDoc
  } catch (err) {
    return err
  }
}
