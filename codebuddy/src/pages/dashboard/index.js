import React, { useEffect, useState } from "react";
import {get} from "../../utils/API/index";
import toast from "react-hot-toast";
import {useLocation,useNavigate} from "react-router-dom";

import {RecommendedProjects} from '../../interface/RecommendedProjects/index'
import {PastProjects} from '../../interface/PastProjects/index'
import {TaskColumn} from '../../interface/TasksColumn/index'

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
    <div className="flex gap-6 flex-row px-8 py-12 pr-24">
	  	<div className="w-full">
			<div className="text-2xl font-bold dark:text-white">
				Tasks
			</div>
			<div className="flex-col">
				<TaskColumn tasksList={dashboardData.projects ? dashboardData.tasks : [{title:'title', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...',tags:['NodeJS', 'CSS'], completeionAmt:0.65}]}/>
			</div>
		</div>
		<div className="flex-col w-1/2 mt-12">
			<RecommendedProjects projectsList={dashboardData.projects ? dashboardData.projects : [{title:'title', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...',tags:['NodeJS', 'CSS']}]} />
			<PastProjects projectsList={dashboardData.projects ? dashboardData.projects : [{title:'title', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...',tags:['NodeJS', 'CSS']}]}/>
		</div>
    </div>
  );
}

export default Dashboard;
