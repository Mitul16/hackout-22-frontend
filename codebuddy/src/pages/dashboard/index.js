import React, { useEffect, useState } from "react";
import {get} from "../../utils/API/index";
import toast from "react-hot-toast";
import {useLocation,useNavigate} from "react-router-dom";


function Dashboard() {
	const navigate = useNavigate();
	const { state } = useLocation();

	const [dashboardData, setDashboardData] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	
	const getDashboardData = async e => {
		const data = await get("profile/user_dashboard")
		setDashboardData(data);
		console.log(data);
		toast.success("Dashboard details fetched Successfully!");
	};
	useEffect(() => {
		getDashboardData();
	}, []);

	return (
    <section className="Dashboard">
	  <div class="Dashboard_Blocks-left">
      </div>
	  <div class="Dashboard_Blocks-center">
      </div>
      <div class="Dashboard_Blocks-right">
      </div>
    </section>
  );
}

export default Dashboard;
