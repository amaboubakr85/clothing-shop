import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: 'AIzaSyDin-Qk5QUD49YYfAoaSmkusVdO5ZhVGWU',
  authDomain: 'crown-clothing-db-9d68b.firebaseapp.com',
  projectId: 'crown-clothing-db-9d68b',
  storageBucket: 'crown-clothing-db-9d68b.appspot.com',
  messagingSenderId: '154363254363',
  appId: '1:154363254363:web:4bccf5f07999017ae1d17e',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})

//  ! Auth and sign-in

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

//  ! Store users and DB
const db = getFirestore()
export const createUserDocumentFromAuth = async (userAuth) => {
  // ? user document reference with userID
  const userDocRef = doc(db, 'users', userAuth.uid)
  //   console.log(userDocRef)

  //  ? creating user Snapshot inside DB
  const userSnapshot = await getDoc(userDocRef)
  //   console.log(userSnapshot)
  //   console.log(userSnapshot.exists())

  // ! if user is not exists , set document with data from userAuth in collection
  //  * if user exists . return userDocRef

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, { displayName, email, createdAt })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  //? if user exists
  return userDocRef
}
