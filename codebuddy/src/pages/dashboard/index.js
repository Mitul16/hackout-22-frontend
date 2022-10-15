import React, { useEffect, useState } from "react";
import {get} from "../../utils/API/index";
import toast from "react-hot-toast";
import {useLocation,useNavigate} from "react-router-dom";


const Dashboard = ()=>{
	const navigate = useNavigate();
	const { state } = useLocation();

	const [dashboardData, setDashboardData] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	
	const getDashboardData = async e => {
		// const data = await get("profile/user_dashboard")
		// setDashboardData(data);
		// console.log(data);
		toast.success("Dashboard details fetched Successfully!");
	};
	useEffect(() => {
		getDashboardData();
	}, []);

	return (
    <section className="flex gap-6 flex-row px-8 py-12">
	  	<div className="w-full">
			<h2 className="hidden md:block text-2xl font-bold text-dark-300 dark:text-white">
				Tasks
			</h2>
      </div>
	  <div className="hidden md:flex w-1/2">
      </div>
    </section>
  );
}

export default Dashboard;
