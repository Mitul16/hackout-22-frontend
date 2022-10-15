import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import "./index.css";
import { post } from '../../utils/API/index'
import { getAccessToken } from '../../utils/API/index'
import { storeLS } from '../../utils/LocalStorage/index'
import { Button } from '../../components/button/index'
import validator from "validator";
import { TextInput } from '../../components/textInput/index'
import { FiMail, FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Typography, TextField } from "@mui/material";
import PasswordStrengthBar from "react-password-strength-bar";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { FiInfo } from "react-icons/fi";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
  async function onSubmit(e) {
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
  return (
    <>
      <div className="register-page">
        <div className="main-form">
          <div className="logo"></div>{" "}
          <div className="center acc-Form">
            <Typography
              className="form-title"
              sx={{
                fontSize: 30,
                fontFamily: "Montserrat,sans-serif",
                fontWeight: "bold",
              }}
              color="#FFFFFF"
              gutterBottom
            >
              Create an Account!
            </Typography>{" "}
          </div>{" "}
          {/* <div className="center register-btn-container column">
						<button class="twitter-register-btn align-center center"> Sign up Twitter </button>{" "}
						<button class="google-register-btn align-center center"> Sign up Google </button>{" "}
					</div>{" "} */}
          {/* <div className="center line-text-div">
						<p className="line-text">
							<span> use your email </span>{" "}
						</p>{" "}
					</div>{" "} */}
          <div className="center">
            <form className="form-container">
              {" "}
              {/* <TextField
                                                                    className={classes.formInputs}
                                                                    id="emailAddress"
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <InputAdornment position="end">
                                                                                <Email />
                                                                            </InputAdornment>
                                                                        ),
                                                                    }}
                                                                    label="Email Address"
                                                                /> */}{" "}
              {/* <input
								onChange={onChangeUsername}
								className="form-input icon-user"
								placeholder="Username"
								name="username"
								value={username}
								required
								></input>{" "} */}
              <TextField
                variant="outlined"
                onChange={onChangeUsername}
                // className="form-input icon-user"
                placeholder="Username"
                label="Username"
                name="username"
                value={username}
                required
                sx={{ marginBottom: "8px", marginTop: "24px", width: "120%" }}
              />
              <div className="msg">
                {" "}
                {isUserEmpty ? "User name required" : ""}{" "}
              </div>{" "}
              {/* <input
								onChange={onChangeEmail}
								className="form-input icon-mail"
								placeholder="Email"
								value={email}
								required
							></input>{" "} */}
              <TextField
                variant="outlined"
                onChange={onChangeEmail}
                // className="form-input icon-mail"
                placeholder="Email"
                label="Email"
                value={email}
                required
                sx={{ marginBottom: "8px", width: "120%", marginTop: "16px" }}
              />
              <div className="msg">
                {" "}
                {isEmailEmpty
                  ? "Email required"
                  : isEmailValid
                  ? ""
                  : "Email Invalid"}{" "}
              </div>{" "}
              {/* <input
								type="password"
								name="password"
								onChange={onChangePassword}
								className="form-input icon-password"
								placeholder="Password"
								value={password}
								required
							></input>{" "} */}
              <TextField
                variant="outlined"
                type="password"
                name="password"
                onChange={onChangePassword}
                // className="form-input icon-password"
                placeholder="Password"
                label="Password"
                value={password}
                required
                sx={{ marginBottom: "8px", width: "120%", marginTop: "16px" }}
              />
              <div className="msg">
                {" "}
                {isPasswordEmpty ? (
                  "Password required"
                ) : password.length === 0 ? (
                  ""
                ) : !isPasswordValid ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    Password Invalid
                    {/* <ul>
										{
											invalidMsgs.map((msg)=><li>{msg.message}</li>)
										}
										</ul> */}
                    <StyledTooltip
                      title={invalidMsgs}
                      placement="right-start"
                      sx={{ whiteSpace: "pre-line" }}
                    >
                      <div
                        style={{
                          display: "grid",
                          placeItems: "center",
                          marginLeft: "8px",
                        }}
                      >
                        <FiInfo />
                      </div>
                    </StyledTooltip>
                  </div>
                ) : (
                  <div>
                    <span style={{ color: "#5C5C5C" }}>Password Strength:</span>{" "}
                    <br />
                    <PasswordStrengthBar
                      className="strength-bar"
                      password={password}
                    />
                  </div>
                )}{" "}
              </div>{" "}
              <div className="form-button">
                <Button
                  isDisabled={!isFormValid}
                  isLoading={isLoading}
                  handleClick={onSubmit}
                  content={"Register"}
                />
              </div>
            </form>{" "}
          </div>{" "}
          {/* {
                                        props.message && <Snackbar open={succesMsg} autoHideDuration={6000} onClose={handleCloseMessage}>
                                          <Alert onClose={handleCloseMessage} severity="success">
                                            {props.messsge}
                                          </Alert>
                                        </Snackbar>
                                      } */}{" "}
        </div>{" "}
        <div className="side-banner-right align-center center column">
          <h2> Welcome! </h2>{" "}
          <p>
            {" "}
            BUIDL your On-chain Resume and get access to web3 opportunities from
            all over the world.{" "}
          </p>{" "}
          <div className="signup-prompt">
            <p> Already part of the Social3 Club ? Login instead </p>{" "}
            <Button onClick={() => navigate("../login")}> LOGIN! </Button>{" "}
          </div>{" "}
          {/* <img src="../../../assets/images/sideBanner.jpg" alt="side-banner" /> */}{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}

export default Register
