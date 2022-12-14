// ! firebase conf
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: 'AIzaSyDin-Qk5QUD49YYfAoaSmkusVdO5ZhVGWU',
  authDomain: 'crown-clothing-db-9d68b.firebaseapp.com',
  projectId: 'crown-clothing-db-9d68b',
  storageBucket: 'crown-clothing-db-9d68b.appspot.com',
  messagingSenderId: '154363254363',
  appId: '1:154363254363:web:4bccf5f07999017ae1d17e',
}

//! Initialize Firebase
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account',
})

//  ! Auth and sign-in

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

//  # initiate DB
const db = getFirestore()

// ! create collection and document
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })
  await batch.commit()
  console.log('done')
}

// ! get collections and documents
export const getCollectionsAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return categoryMap
}

//  ! create user from auth and store it into DB
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return
  // ? user document reference with userID
  const userDocRef = doc(db, 'users', userAuth.uid)
  //   console.log(userDocRef)

  //  ? creating user Snapshot inside DB
  const userSnapshot = await getDoc(userDocRef)
  //   console.log(userSnapshot)
  //   console.log(userSnapshot.exists())

  // ? if user is not exists , set document with data from userAuth in collection
  //  ? if user exists . return userDocRef

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  //? if user exists
  return userDocRef
}

// ! create user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

// ! sign in user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

// ! sign out
export const signOutUser = async () => await signOut(auth)

// ! auth change listener
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
