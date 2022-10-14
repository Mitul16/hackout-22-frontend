import React, { useEffect, useState } from "react";
import "./index.css";
import "./../Common Styles/Text.css";

import {get} from "../../utils/API/index";
import toast from "react-hot-toast";
import ProfileCard from "./DashboardBlocks/ProfileCard";
import EventsViewer from "./DashboardBlocks/EventsViewer";
import ActiveApplication from "./DashboardBlocks/ActiveApplications";
import ActiveReferrals from "./DashboardBlocks/ActiveReferrals";
import SavedJob from "./DashboardBlocks/SavedJobs";
import ReferralSent from "./DashboardBlocks/ReferralSent";
import JobsByChain from "./DashboardBlocks/JobsByChain";
// import styles from "./Dashboard.module.css";
import Loader from "../../Components/Loader/Loader";
import BadgeEarnPopup from './../Profile/Badges/BadgeEarnPopup'
import { Modal } from '@mui/material';
import {  useLocation,useNavigate } from "react-router-dom";

const axios = require("axios");

function Dashboard() {
	const navigate = useNavigate();
	const { state } = useLocation();
    let BadgesEarned
	let showBadgesPopup

	if(state !== null){
		BadgesEarned = state['badgesData'];
		showBadgesPopup = state['showBadges'];
	}


	const [dashboardData, setDashboardData] = useState({});
	const [chains , setChains] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		showBadgesPopup = false;
	}

	
	const getDashboardData = async e => {
		let accessToken = localStorage.getItem("jwt_token");
		const headers = { Accept: "application/json","x-access-token": accessToken}
		const data = await get("profile/user_dashboard")
		setDashboardData(data);
		console.log(data);
		toast.success("Dashboard details fetched Successfully!");
		
		// // e.preventDefault();
		// try {

		// 	const rawResponse = await axios., );
		// 	const content = await rawResponse.data;
		// 	setChains(content.data.network_tags);
		// } catch (e) {
		// 	console.log(e);
		// 	console.log(e.response.data.message);
		// 	setErrorMessage(e.response.data.message);
		// 	toast.error(e.response.data.message);
		// 	if(e.response.data.message.includes('Unauthorized'))
		// 		navigate('/login')

		// 	navigate('/error',{state:{from:'Dashboard'}, replace:true})
		// 	// return(e);
		// }
	};

	useEffect(() => {
		if(showBadgesPopup){
			setTimeout(() =>{
				handleOpen();
			}, 1000)
		}
		getDashboardData();
	}, []);

	if (!Object.keys(dashboardData).length || !chains.length) return <Loader/>;

	return (
    <section className="Dashboard">
	  <div class="Dashboard_Blocks-left">
      </div>
      <div class="Dashboard_Blocks-right">
      </div>
    </section>
  );
}

export default Dashboard;
