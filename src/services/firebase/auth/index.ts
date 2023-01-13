import {
  createUserWithEmailAndPassword,
  updateProfile,
  User
} from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, storage } from '../../firebase'

interface CreateUserProps {
  email: string
  password: string
}

export async function createUser({ email, password }: CreateUserProps) {
  return await createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      // Signed in
      const user = userCredential.user

      return user
      // ...
    }
  )
}

interface UploadImageProps {
  name: string
  file: Blob | Uint8Array | ArrayBuffer
  user: User
}

export async function uploadImage({ file, name, user }: UploadImageProps) {
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
          displayName: name,
          photoURL: downloadURL
        })
      })
    }
  )
}
