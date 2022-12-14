import './sign-in-form.styles.scss'
import { useState } from 'react'
import {
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/FormInput.component'
import Button from '../button/button.component'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  // ! functions
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
    // console.log(formFields)
  }

  const signInWithGoogle = async () => {
    // const response = await signInWithGooglePopup()
    // const { user } = response

    // await createUserDocumentFromAuth(user)
    await signInWithGooglePopup()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields()
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('wrong password')
          break
        case 'auth/user-not-found':
          alert('there is no user with specified email address')
          break
        default:
          console.log(error)
      }
    }
  }
  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email address and password </span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required={true}
          name='email'
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required={true}
          name='password'
          onChange={handleChange}
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign in</Button>
          <Button type='button' buttonType={'google'} onClick={signInWithGoogle}>
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
