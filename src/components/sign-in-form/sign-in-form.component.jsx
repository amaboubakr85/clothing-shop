import './sign-in-form.styles.scss'
import { useState } from 'react'
import {
  //createAuthUserWithEmailAndPassword,
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

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
    // console.log(formFields)
  }

  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup()
    const { user } = response
    await createUserDocumentFromAuth(user)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(
        '🚀 ~ file: sign-in-form.component.jsx ~ line 42 ~ handleSubmit ~ response',
        response
      )
      resetFormFields()
    } catch (error) {
      // if (error.code === 'auth/wrong-password') {
      //   alert('wrong password ')
      // }
      // if (error.code === 'auth/user-not-found') {
      //   alert('there is no user with specified email address ')
      // }
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
