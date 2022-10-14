import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { post } from '../../utils/API/index'
import { getAccessToken } from '../../utils/API/index'
import { storeLS } from '../../utils/LocalStorage/index'
import { Button } from '../../components/button/index'
import { TextInput } from '../../components/textInput/index'
import { FiMail, FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const passwordValidator = require('password-validator')

const Register = (props) => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const schema = new passwordValidator()
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(['Passw0rd', 'Password123']) // Blacklist these values

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [login, setLogin] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onChangeLogin = (e) => {
    setLogin(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  async function handleSubmit(e) {
    e?.preventDefault()

    const payload = {
      login,
      password,
    }

    setIsLoading(true)

    const response = await post('auth/signin', payload)
    if (response.status === 'error') {
      toast.error(response.message)
      setIsLoading(false)
    }

    if (response.status === 'OK') {
      storeLS('jwt_token', response.message.accessToken)
      if (
        response.message.is_onboarding_complete === 'false' ||
        response.message.is_onboarding_complete === false
      ) {
        if (response.message.is_employer) {
          navigate('/onboarding/recruiter/profile')
        } else {
          navigate('/onboarding/candidate/profile')
        }
      } else navigate('/')
    }
  }

  useEffect(() => {
    if (isLoggedIn && !getAccessToken()) {
      setIsLoggedIn(null)
    } else if (isLoggedIn) navigate('/')
  }, [isLoggedIn, setIsLoggedIn, navigate])

  const onConnect = () => {
    navigate('/feed')
  }

  return (
    <form
      className="w-full flex gap-4 flex-col"
      onSubmit={handleSubmit}
      method="post"
      action="/form"
      autoComplete="off"
    >
      <div className="w-full h-fit">
        <TextInput
          type="text"
          placeholder="Username"
          prefix={<FiUser className="text-xl dark:text-white text-dark-300" />}
          required={true}
          rounded={true}
          value={username}
          onChange={setUsername}
          autoFill={false}
        />
      </div>
      <div className="w-full h-fit">
        <TextInput
          type="email"
          placeholder="Email Address"
          prefix={<FiMail className="text-xl dark:text-white text-dark-300" />}
          required={true}
          rounded={true}
          value={email}
          onChange={setEmail}
          autoFill={false}
        />
      </div>
      <div className="w-full h-fit">
        <TextInput
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          prefix={<FiLock className="text-xl dark:text-white text-dark-300" />}
          suffix={
            showPassword ? (
              <FiEye
                className="text-xl dark:text-white text-dark-300 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FiEyeOff
                className="text-xl dark:text-white text-dark-300 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )
          }
          required={true}
          rounded={true}
          value={password}
          onChange={setPassword}
          autoFill={false}
        />
      </div>
      {/* <PasswordStrengthIndicator password={password} /> */}
      <Button type="submit" rounded={true} isLoading={isLoading}>
        Sign Up
      </Button>
    </form>
  )
}

export default Register
