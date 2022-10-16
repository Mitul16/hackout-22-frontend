import React, { useEffect, useState } from "react";
import {get} from "../../utils/API/index";
import toast from "react-hot-toast";
import {useLocation,useNavigate} from "react-router-dom";

import {RecommendedProjects} from '../../interface/RecommendedProjects/index'
import {PastProjects} from '../../interface/PastProjects/index'
import {TaskColumn} from '../../interface/TasksColumn/index'

const Dashboard = ()=>{
	const [dashboardData, setDashboardData] = useState({});
  const [change , setChange] = useState('');
  const [recommendedProjects, setRecommendedProjects] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const getDashboardData = async e => {
		const data = await get("/project/list_recommended");
    console.log(data.data.data);
		setRecommendedProjects(data.data.data);
		console.log(recommendedProjects);
    setChange("change");
		toast.success("Dashboard details fetched Successfully!");
	};
	useEffect(() => {
		getDashboardData();
	}, [change]);

	return (
    <div className="flex gap-6 flex-row px-8 py-12 pr-24">
      <div className="w-full">
        <h3 className="text-2xl font-bold text-white">
          Tasks
        </h3>
        <div className="flex-col px-2 py-2 mt-4">
          <TaskColumn
            tasksList={
              dashboardData.projects
                ? dashboardData.tasks
                : [
                    {
                      title: "title",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
                      tags: ["NodeJS", "CSS"],
                      completeionAmt: 0.65,
                    },
                    {
                      title: "Hackout",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                      tags: ["NodeJS", "CSS", "React.JS", "Flutter"],
                    },
                  ]
            }
          />
        </div>``
      </div>
      <div className="flex-col w-1/2 mt-12 flex gap-20">
        <RecommendedProjects
          projectsList={
            recommendedProjects
              ? recommendedProjects
              : [
                  {
                    title: "title",
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
                    tags: ["NodeJS", "CSS"],
                  },
                  {
                    title: "Hackout",
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    tags: ["NodeJS", "CSS", "React.JS", "Flutter"],
                  },
                ]
          }
        />
        <PastProjects
          projectsList={
            dashboardData.projects
              ? dashboardData.projects
              : [
                  {
                    title: "title",
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
                    tags: ["NodeJS", "CSS"],
                  },
                ]
          }
        />
      </div>
    </div>
  );
}

export default Dashboard;
