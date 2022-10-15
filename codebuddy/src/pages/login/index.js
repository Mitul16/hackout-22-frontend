import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {post} from "../../utils/API/index"
import {storeLS} from "../../utils/LocalStorage/index"
import {getAccessToken} from "../../utils/API/index"
import { Button } from '../../components/button/index'
import { TextInput } from '../../components/textInput/index'
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

const Login = () => {

	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState("");
	const [login, setLogin] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false)
	
	const onChangeLogin = e => {
		setLogin(e.target.value);
	};

	const onChangePassword = e => {
		setPassword(e.target.value);
	};

	async function handleSubmit(e) {
		e?.preventDefault();
	
		const payload = {
		  login,
		  password,
		};
	
		setIsLoading(true);
	
		const response = await post("auth/login", payload);
		if (response.status === "error") {
		  toast.error(response.message);
		  setIsLoading(false);
		}
	
		if (response.status === "OK") {
		  storeLS("jwt_token", response.message.accessToken);
		  if (response.message.is_onboarding_complete === 'false' || response.message.is_onboarding_complete === false) {
			if (response.message.is_employer) {
			  navigate("/onboarding/recruiter/profile");
			} else {
			  navigate("/onboarding/candidate/profile");
			}
		  } else navigate("/");
		}
	}

	useEffect(() => {
		if (isLoggedIn && !getAccessToken()) {
		  setIsLoggedIn(null);
		} else if (isLoggedIn) navigate("/");
	  }, [isLoggedIn, setIsLoggedIn, navigate]);
	
	const onConnect = () => {
		navigate("/feed");
	};
	

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
			placeholder="Username or Email Address"
			prefix={<FiUser className="text-xl dark:text-white text-dark-300" />}
			required={true}
			rounded={true}
			value={login}
			onChange={setLogin}
			autoFill={false}
			/>
		</div>
		<div className="w-full h-fit">
			<TextInput
			type={showPassword ? 'text' : 'password'}
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
		<a
			href="/forgot-password"
			className="text-right text-dark-300 dark:text-white underline underline-offset-4"
		>
			Forgot Password?
		</a>
		<div className="w-full h-fit">
			<Button type="submit" rounded={true} isLoading={isLoading}>
			Sign In
			</Button>
		</div>
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
)};

export default Login;
