import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Protected from "./protected";

import NavBar from './components/Navigation/NavBar'
import Dashboard from './pages/dashboard/index'

import { Toaster } from "react-hot-toast";

function App() {
	const [isLoggedIn, setisLoggedIn] = useState(true);
	const [isFirstTime, setIsFirstTime] = useState(true);
	const [isEmployer, setIsEmployer] = useState(false);
	const [employerId, setEmployerId] = useState(null);
	
	
	useEffect(() => {
		setIsEmployer(localStorage.getItem("isEmployer")==='true'?true:false);
		setEmployerId(localStorage.getItem("employerId"))
	}, [isEmployer, employerId,isLoggedIn]);

	return (
		// !isLoggedIn
		// ? (
		<>
			<Toaster />
			<Router>
				{isLoggedIn ? <NavBar loginStatus={setisLoggedIn} isEmployer={isEmployer} employerId={employerId}/> : ""}
				<Routes>
					{isLoggedIn ? (
						<Route
							path="dashboard"
							element={
								isEmployer
								? (
									<Protected isLoggedIn={isLoggedIn}>
										{" "}
										<Recruiter />{" "}
									</Protected>
								)
								: (
									<Protected isLoggedIn={isLoggedIn}>
										{" "}
										<Dashboard />{" "}
									</Protected>
								)
							}
						/>
					) : (
						""
					)}

					<Route path="" element={<Role />} />
					<Route path="login" element={<Login loginStatus={setisLoggedIn} setFirstTime={setIsFirstTime} setIsEmployer={setIsEmployer} setEmployerId={setEmployerId} />} />
					<Route path="register" element={<Register />} />
					<Route path="verify-email/:token" element={<VerifyEmail />} />
					<Route path="forget-password" element={<ForgetPassword />} />
					<Route path="verify" element={<Verify firstTime={isFirstTime} />} />
					<Route
						path="applicants"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<Applicants employerId={employerId} />{" "}
							</Protected>
						}
					/>
					<Route
						path="recruiter/company"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<RecruiterCompanyPage employerId={employerId} />{" "}
							</Protected>
						}
					/>
					<Route
						path="recruiter/job/:id"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<IndividualRecruiterJob employerId={employerId} />{" "}
							</Protected>
						}
					/>
					<Route
						path="set-name"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<SetName />{" "}
							</Protected>
						}
					/>
					<Route
						path="wallet"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<WalletConnect />{" "}
							</Protected>
						}
					/>
					<Route
						path="setwallet"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<WalletConnectProfile />{" "}
							</Protected>
						}
					/>
					<Route
						path="wallet/hiro"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<HiroWalletConnect />{" "}
							</Protected>
						}
					/>

					<Route path="onboarding/*" element={<Onboarding />} />

					<Route
						path="opportunities"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<Opportunities />{" "}
							</Protected>
						}
					/>
					<Route
						path="opportunities/job/:id"
						element={
							<Protected isLoggedIn={isLoggedIn} >
								{" "}
								<IndividualOpportunity isEmployer={isEmployer} employerId={employerId} />{" "}
							</Protected>
						}
					/>

					<Route
						path="company/:id"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<CompanyPage isEmployer={isEmployer} employerId={employerId}/>{" "}
							</Protected>
						}
					/>
					<Route
						path="profile"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<Profile viewState="user" />{" "}
							</Protected>
						}
					/>
					<Route
						path="profile/:id"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<Profile viewState="view" />{" "}
							</Protected>
						}
					/>
					<Route
						path="events"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<Event />{" "}
							</Protected>
						}
					/>
					<Route
						path="events/:id"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<IndividualEvent />{" "}
							</Protected>
						}
					/>
					<Route
						path="profile/badges"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<Badges />{" "}
							</Protected>
						}
					/>
					<Route
						path="profile/poaps"
						element={
							<Protected isLoggedIn={isLoggedIn}>
								{" "}
								<POAPs />{" "}
							</Protected>
						}
					/>
					<Route path="error" element={<ErrorPage />} />
					<Route path="*" element={<NoMatch />} />
				</Routes>
			</Router>
		</>
		//   )
	);
}

export default App;
