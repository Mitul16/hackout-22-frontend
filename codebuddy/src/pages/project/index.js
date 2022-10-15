import React, { useEffect, useState } from "react";
import { get } from "../../utils/API/index";
import toast from "react-hot-toast";
import { Button } from "../../components/button/index";
import { useLocation, useNavigate } from "react-router-dom";
import { ProjectCardWide } from "../../components/ProjectCard/index";

const Project = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [dashboardData, setDashboardData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [projects, setProjects] = useState([]);

  const getDashboardData = async (e) => {
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
        <h3 className="text-2xl font-bold dark:text-white text-2xl font-bold dark:text-white text-2xl font-bold dark:text-white">
          Projects
        </h3>
        <div className="flex-row flex w-full mt-6 gap-5">
          <div className="w-full">
            <input
              type="text"
              name=""
              placeholder="Search for Projects"
              style={{
                outline: "none",
              }}
              className="text-dark-300 dark:text-light-100 bg-[#202020] flex-row placeholder:dark:text-light-300 rounded dark:focus:bg-dark-200 w-full p-3 border border-[#30363D]"
            />
          </div>
          <div>
            <Button type="submit">Search</Button>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-2 grid-flow-col gap-4 md:gap-4 mt-4">
          {projects?.length > 0
            ? projects.map((project, i) => (
                <ProjectCardWide variant="wide" projectData={project} key={i} />
              ))
            : // : (<div className="w-full flex align-center justify-center">
              //     <p className="text-lg text-[#A6A7AB] ">{'You Currently have no projects'}</p>
              //   </div>)
              [{ title: "gwdvuyw" }, { title: "djegdywb" }].map(
                (project, i) => (
                  <ProjectCardWide
                    variant="wide"
                    projectData={project}
                    key={i}
                  />
                )
              )}
        </div>
      </div>
    </div>
  );
};

export default Project;
