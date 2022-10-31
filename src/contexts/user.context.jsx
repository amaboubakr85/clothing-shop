import { createContext, useState, useEffect } from 'react'
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from '../utils/firebase/firebase.utils'

// ! actual values we wanna access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
})

// # Provider that wrap app
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const value = { currentUser, setCurrentUser }

  //  auth change
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
      // console.log(user)
    })
    return unsubscribe
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
