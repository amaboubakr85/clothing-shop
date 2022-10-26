import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  const signInGoogleUser = async () => {
    const response = await signInWithGooglePopup()
    const { user } = response
    const userDocRef = await createUserDocumentFromAuth(user)
  }
  return (
    <div>
      <h1>sign in </h1>
      <button type='submit' onClick={signInGoogleUser}>
        sign in with google
      </button>
    </div>
  )
}

export default SignIn
