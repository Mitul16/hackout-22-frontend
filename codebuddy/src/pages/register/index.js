import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import PasswordStrengthIndicator from "react-password-strength-bar";
import { useLocation, useNavigate } from 'react-router-dom';
import validator from "validator";
import { Button } from '../../components/button/index';
import { TextInput } from '../../components/textInput/index';
import { getAccessToken, post } from '../../utils/API/index';
import { storeLS } from '../../utils/LocalStorage/index';
import "./index.css";
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
  const [isFormValid , setIsFormValid] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isUserEmpty, setIsUserEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const onChangeLogin = (e) => {
    setLogin(e.target.value)
    setIsFormValid(isEmailValid && isPasswordValid && !isUserEmpty);
  }
  const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .MuiTooltip-tooltip`]: {
      whiteSpace: "pre-line",
    },
  }));
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setIsEmailEmpty(e.target.value.length === 0);
    const isValid = validator.isEmail(e.target.value);
    setIsEmailValid(isValid);
    setIsFormValid(isValid && isPasswordValid && !isUserEmpty);
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    const isEmpty = e.target.value.length === 0;
    setIsUserEmpty(isEmpty);
    setIsFormValid(isEmailValid && isPasswordValid && !isEmpty);
  };

  const [invalidMsgs, setInvalidMsgs] = useState("");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setIsPasswordEmpty(e.target.value.length === 0);
    const ValidateDetails = schema.validate(e.target.value, { details: true });
    const InValidDets = ValidateDetails.map((det) => det.message).join(
      " \n • "
    );
    setInvalidMsgs(" • " + InValidDets);
    const isValid = ValidateDetails.length === 0;
    setIsPasswordValid(isValid);
    setIsFormValid(isEmailValid && isValid && !isUserEmpty);
  };
  async function handleSubmit(e) {
    e?.preventDefault()

    const payload = {
      username,
      email,
      password,
    }

    setIsLoading(true)

    const response = await post('/api/auth/register', payload)

    if (response.status === 201) {
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
    } else {
      toast.error(response.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn && !getAccessToken()) {
      setIsLoggedIn(null)
    } else if (isLoggedIn) navigate('/')
  }, [isLoggedIn, setIsLoggedIn, navigate])
  return (
    <div className="flex flex-col h-screen px-8 md:flex-row px-0">
      <div className="absolute top-12 right-0 left-1 md:ml-12 w-fit">
      </div>
      <div className=" w-full px-4 py-40 md:w-auth-form flex items-center justify-center flex-col max-w-prose mx-auto gap-12">
        <h1 className="text-5xl font-bold dark:text-white">Sign In</h1>

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
              prefix={
                <FiUser className="text-xl dark:text-white text-dark-300" />
              }
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
              prefix={
                <FiMail className="text-xl dark:text-white text-dark-300" />
              }
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
              prefix={
                <FiLock className="text-xl dark:text-white text-dark-300" />
              }
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
          <PasswordStrengthIndicator password={password} />
          <Button type="submit" rounded={true} isLoading={isLoading}>
            Sign Up
          </Button>
        </form>
        {/* <div className="relative w-full flex justify-center items-center">
          <div className="absolute inset-0 m-auto h-divider w-full bg-light-300 z-0"></div>
          <span className="mx-auto relative text-light-300 z-10 px-2 bg-white dark:bg-dark-300 text-sm">
            Or Sign Up In
          </span>
        </div>
        <div className="gap-8 grid grid-cols-2 w-full">
          <TwitterLogin />
          <GoogleLogin />
        </div> */}
        <div className="relative w-full flex justify-center items-center">
          <div className="absolute inset-0 m-auto h-divider w-full bg-light-300 z-0"></div>
          <span className="mx-auto relative text-light-300 z-10 px-2 bg-white dark:bg-dark-300 text-sm">
            or Sign In anonymously with
          </span>
        </div>
        <div className="gap-8 w-full w-64">
          {/* <TwitterLogin />
          <GoogleLogin /> */}
        </div>
      </div>
   
    </div>
  );

}

export default Register
