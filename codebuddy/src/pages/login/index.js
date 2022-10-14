import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, TextField } from "@mui/material";
import "./Login/Login.css";
import { useStyles } from "./Styles";
import { ReactComponent as Logo } from "../../../assets/svgs/HACKOUT 2022-logo.svg";
import { API_URL } from "../../../utils";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import PrimaryBtn from "../../Onboarding/StyledComponents/PrimaryBtn";

const axios = require("axios");

// import RainbowLoader from "../Loaders/RainbowLoader/RainbowLoader";

const Login = props => {
	const [loading, setLoading] = React.useState(false);

	const classes = useStyles();
	const navigate = useNavigate();

	const [errorMessage, setErrorMessage] = useState("");
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const onChangeLogin = e => {
		setLogin(e.target.value);
	};

	const onChangePassword = e => {
		setPassword(e.target.value);
	};

	const onSubmit = async e => {
		e.preventDefault();
		try {
			const payload = {
				login: login,
				password: password,
			};
			// console.log(API_URL);
			// console.log(payload);
			setLoading(true);

			const rawResponse = await axios.post(String(API_URL) + "auth/signin/", payload, {
				headers: {
					Accept: "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			});
			const content = await rawResponse.data;
			toast.success("Login Successful");

			// console.log(content);
			localStorage.setItem("isEmployer",content.message.is_employer)
			if(content.message.is_employer)
				localStorage.setItem("employerId",content.message.id)
			else
				localStorage.removeItem("employerId")
			
			props.setFirstTime(content.message.first_time_login);
			// props.setFirstTime(true);

			localStorage.setItem("jwt_token", content["message"]["accessToken"]);

			setIsAuthenticated(true);
			props.loginStatus(true);
			setLogin("");
			setPassword("");

			// check if user first time login or not

			content.message.first_time_login
				? navigate("../set-name", { state: { content } })
				: navigate("../dashboard");
			// navigate("../wallet", { state: { content } })
		} catch (e) {
			console.log(e);
			console.log(e.response.data.message);
			setErrorMessage(e.response.data.message);
			toast.error(e.response.data.message);
			setLoading(false);
		}
	};

	return (
		<>
			<div className="login-page">
				<div className="main-form">
					<div className="logo">
						<Logo />
					</div>{" "}
					<div>
						<div className="center acc-Form">
							<Typography
								className="form-title"
								sx={{ fontSize: 30, fontFamily: "Montserrat,sans-serif", fontWeight: "bold" }}
								color="#4B73FF"
								gutterBottom
							>
								Login to your Account!
							</Typography>{" "}
						</div>{" "}
					</div>{" "}
					{/* <div className="center login-btn-container column">
						<button class="twitter-login-btn align-center center"> Login with Twitter </button>{" "}
						<button class="google-login-btn align-center center"> Login with Google </button>{" "}
					</div> */}
					{/* <div className="center line-text-div">
						<p className="line-text">
							<span> login with your email </span>{" "}
						</p>{" "}
					</div>{" "} */}
					<div className="center" style={{ marginTop: "30px" }}>
						<form className="form-container">
							{/* <TextField
								className={classes.formInputs}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Email />
										</InputAdornment>
									),
								}}
								id="input-with-sx"
								label="With sx"
								label="Email Address"
								variant="filled"
							/>
							<Box sx={{ display: "flex", alignItems: "center" }}>
								<Email sx={{ color: "action.inactive", mr: 1, my: 0.5 }} />
								<TextField id="email" label="Email Address" variant="standard" />
							</Box> */}
							{/* <input
								onChange={onChangeLogin}
								className="form-input icon-user"
								placeholder="Username or email"
								value={login}
								type="text"
								name="login"
							></input>{" "} */}
							<TextField		
								variant="outlined"		
								onChange={onChangeLogin}
								id="login"
								// className="form-input icon-user"
								placeholder="Username or email"
								label="Username or email"
								value={login}
								type="text"
								name="login"
								sx={{marginBottom: '16px', width: '120%'}}
								/>
							<TextField
								variant="outlined"
								sx={{ width: '120%'}}
								id="password"
								type="password"
								name="password"
								onChange={onChangePassword}
								// className="form-input icon-password"
								placeholder="Password"
								label="Password"
								value={password}
							/>
							{/* <input
								type="password"
								name="password"
								onChange={onChangePassword}
								className="form-input icon-password"
								placeholder="Password"
								value={password}
							></input>{" "} */}
							<p
								className="forgot-login-pass"
								style={{ fontSize: "0.8rem", cursor: "pointer", color: "#5680FF" }}
								onClick={() => navigate("../forget-password")}
							>
								Forgot Password ?
							</p>
							{/* <LoadingButton
								onClick={onSubmit}
								loading={loading}
								// loadingIndicator="Logging In..."
								className="form-button"
								variant="contained"
								ariaLabel="Login"
								color="primary"
								sx={{ padding: "10px 10px", fontSize: "15px", width: "10vw" }}
								endIcon={<LoginIcon />}
								// loading={loading}
								loadingPosition="end"
							>
								Login
							</LoadingButton> */}
							<div className="form-button">
								<PrimaryBtn
									handleClick={onSubmit}
									isLoading={loading}
									className="form-button"
									ariaLabel="Login"
									content="Login"
									icon={<LoginIcon />}
								/>
							</div>
							
							{/* <Button
								className="form-button"
								onClick={onSubmit}
								variant="contained"
								ariaLabel="Login"
								color="primary"
								sx={{ padding: "10px 30px", fontSize: "16px" }}
							>
								Login{" "}
							</Button>{" "} */}
						</form>{" "}
						{/* <Box
							// component="form"
							sx={{
								"& .MuiTextField-root": { m: 1 },
								minWidth: "40vw",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
							// noValidate
							// autoComplete="off"
						>
							<div
								styles={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography
									variant="h6"
									sx={{ mb: 0.9, fontWeight: "bold", width: "100%", fontSize: "0.8rem" }}
									gutterBottom
									color="text.secondary"
									component="div"
									align="left"
								>
									<TextField
										required
										id="filled-required"
										fullWidth
										label="Email"
										defaultValue=""
										variant="filled"
										// helperText="Required"
									/>
									<TextField
										fullWidth
										required
										id="filled-password-input"
										label="Password"
										type="password"
										autoComplete="current-password"
										variant="filled"
									/>
									<a className="forgot-pass" href="">
										Forgot Password ?
									</a>
									<Button
										className="form-button"
										onClick={onSubmit}
										variant="contained"
										ariaLabel="Login"
										color="primary"
										sx={{ padding: "10px 30px", fontSize: "16px" }}
									>
										Login{" "}
									</Button>{" "}
								</Typography>{" "}
							</div>
						</Box> */}
					</div>
					{/* {
                            props.message && <Snackbar open={succesMsg} autoHideDuration={6000} onClose={handleCloseMessage}>
                              <Alert onClose={handleCloseMessage} severity="success">
                                {props.messsge}
                              </Alert>
                            </Snackbar>
                          } */}{" "}
				</div>
				<div className="side-banner-right align-center center column">
					<h2> Welcome Back! </h2>{" "}
					<p> BUIDL your On-chain Resume and get access to web3 opportunities from all over the world. </p>{" "}
					<div className="signup-prompt">
						<p> Simple enough? Let's get Started. </p>{" "}
						<Button onClick={() => navigate("../register")}> Sign Up </Button>{" "}
					</div>{" "}
					{/* <img src="../../../assets/images/sideBanner.jpg" alt="side-banner" /> */}{" "}
				</div>{" "}
			</div>{" "}
		</>
	);
};

export default Login;
