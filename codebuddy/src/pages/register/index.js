import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Button, TextField } from "@mui/material";
import "./Register.css";
import { useStyles } from "./Styles";
import { ReactComponent as Logo } from "../../../assets/svgs/HACKOUT 2022-logo.svg";
import PasswordStrengthBar from "react-password-strength-bar";
import validator from "validator";
import { API_URL } from "../../../utils";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import PrimaryBtn from '../../Onboarding/StyledComponents/PrimaryBtn'
import {FiInfo} from "react-icons/fi"
import { styled } from "@mui/material/styles";
import Tooltip from '@mui/material/Tooltip';

const axios = require("axios");
const passwordValidator = require("password-validator");


const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    whiteSpace: "pre-line"
  }
}));

// import RainbowLoader from "../Loaders/RainbowLoader/RainbowLoader";

const Register = props => {
	const classes = useStyles();
	const navigate = useNavigate();
	const { state } = useLocation();
	const userType = state !== null ? state.userType : "Skill";
	// console.log(userType);

	const schema = new passwordValidator();
	schema
	.is().min(8)                                    // Minimum length 8
	.is().max(100)                                  // Maximum length 100
	.has().uppercase()                              // Must have uppercase letters
	.has().lowercase()                              // Must have lowercase letters
	.has().digits(2)                                // Must have at least 2 digits
	.has().not().spaces()                           // Should not have spaces
	.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


	const [errorMessage, setErrorMessage] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isEmailEmpty, setIsEmailEmpty] = useState(false);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isUserEmpty, setIsUserEmpty] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	
	const onChangeEmail = e => {
		setEmail(e.target.value);
		setIsEmailEmpty(e.target.value.length === 0);
		const isValid = validator.isEmail(e.target.value)
		setIsEmailValid(isValid);
		setIsFormValid(isValid && isPasswordValid && !isUserEmpty)
	};
	
	const onChangeUsername = e => {
		setUsername(e.target.value);
		const isEmpty = e.target.value.length === 0; 
		setIsUserEmpty(isEmpty);
		setIsFormValid(isEmailValid && isPasswordValid && !isEmpty)
		
	};
	
	const [invalidMsgs,setInvalidMsgs] = useState('') 
	const onChangePassword = e => {
		setPassword(e.target.value);
		setIsPasswordEmpty(e.target.value.length === 0);
		const ValidateDetails = schema.validate(e.target.value,{details:true});
		const InValidDets = ValidateDetails.map((det)=>det.message).join(' \n • ')
		setInvalidMsgs(' • ' + InValidDets);
		const isValid = ValidateDetails.length===0
		setIsPasswordValid(isValid)
		setIsFormValid(isEmailValid && isValid && !isUserEmpty)
	};


	const onSubmit = async e => {
		e.preventDefault();
		try {
			const payload = {
				username: username,
				email: email,
				password: password,
			};
			console.log(API_URL);
			console.log(payload);

			setIsLoading(true);
			const rawResponse = await axios.post(String(API_URL) + "auth/signup/", payload, {
				headers: {
					Accept: "application/json",
				},
			});
			const content = await rawResponse.data;
			toast.success("Registration Successful!");
			setIsLoading(false);
			let emailSent = email;
			console.log(content);
			setIsAuthenticated(true);
			setUsername("");
			setPassword("");
			setEmail("");
			navigate("../verify", {
				state: { emailSent },
			});
		} catch (e) {
			setIsLoading(false);
			console.log(e);
			console.log(e.response.data.message);
			setErrorMessage(e.response.data.message);
			toast.error(e.response.data.message);
		}
	};

	return (
		<>
			<div className="register-page">
				<div className="main-form">
					<div className="logo">
						<Logo />
					</div>{" "}
					<div className="center acc-Form">
						<Typography
							className="form-title"
							sx={{
								fontSize: 30,
								fontFamily: "Montserrat,sans-serif",
								fontWeight: "bold",
							}}
							color="#4B73FF"
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
								sx={{marginBottom: '8px', marginTop:'24px', width: '120%'}}
							/>
							<div className="msg"> {isUserEmpty ? "User name required" : ""} </div>{" "}
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
								sx={{marginBottom: '8px', width: '120%', marginTop: '16px'}}
							/>
							<div className="msg">
								{" "}
								{isEmailEmpty ? "Email required" : isEmailValid ? "" : "Email Invalid"}{" "}
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
								sx={{marginBottom: '8px', width: '120%', marginTop: '16px'}}
							/>
							<div className="msg">
								{" "}
								{
								isPasswordEmpty ? (
									"Password required"
								) : 
								password.length===0 ? ("") :
								!isPasswordValid ? (
									<div style={{display: "flex", alignItems: "center" }}>
										Password Invalid
										{/* <ul>
										{
											invalidMsgs.map((msg)=><li>{msg.message}</li>)
										}
										</ul> */}
										<StyledTooltip title={invalidMsgs} placement="right-start" sx={{whiteSpace: "pre-line"}}>
										<div style={{display: "grid",placeItems: "center", marginLeft:'8px'}}>
											<FiInfo/>
										</div>
										</StyledTooltip>
									</div>
								) :  (
									<div>
										<span style={{color:'#5C5C5C'}}>Password Strength:</span> <br/>
										<PasswordStrengthBar className="strength-bar" password={password} />
									</div>
								)}{" "}
							</div>{" "}
							<div className="form-button">
								<PrimaryBtn
									isDisabled={!isFormValid}
									isLoading={isLoading}
									handleClick={onSubmit}
									content={'Register'}
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
					<p> BUIDL your On-chain Resume and get access to web3 opportunities from all over the world. </p>{" "}
					<div className="signup-prompt">
						<p> Already part of the HACKOUT 2022 Club ? Login instead </p>{" "}
						<Button onClick={() => navigate("../login")}> LOGIN! </Button>{" "}
					</div>{" "}
					{/* <img src="../../../assets/images/sideBanner.jpg" alt="side-banner" /> */}{" "}
				</div>{" "}
			</div>{" "}
		</>
	);
};

export default Register;
