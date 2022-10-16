import React, { useEffect, useState } from "react";
import { get } from "../../utils/API/index";
import toast from "react-hot-toast";
import { Button } from "../../components/button/index";
import { useLocation, useNavigate } from "react-router-dom";
import { ProjectCardWide } from "../../components/ProjectCard/index";

const Project = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [search , setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [projects, setProjects] = useState([]);
  const handleSearchChange = (e)=>{
    setSearch(e.target.value);
  }
  const handleSearchSubmit = async ()=>{
     const response = await get(`/project/list?text=${search}`);
     console.log(response.data);
     if (response.data.status === "OK") {
       setProjects(response.data.data);
       setSearch("");

     } else {
       toast.error(response.error);
     }
  }
  const getProjectsData = async (e) => {
    const response = await get("/project/list");
    console.log(response.data);
    if(response.data.status ==="OK"){
         setProjects(response.data.data);
         toast.success("Dashboard details fetched Successfully!");
         return;
    }else{
        toast.error(response.error);
    }
  };
  useEffect(() => {
    getProjectsData();
  }, []);

  return (
    <div className="flex gap-6 flex-row px-8 py-12 pr-24">
      <div className="w-full">
        <h3 className="text-2xl font-bold text-white">
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
              value={search}
              onChange={handleSearchChange}
              className="text-dark-300 dark:text-light-100 bg-[#202020] flex-row placeholder:dark:text-light-300 rounded dark:focus:bg-dark-200 w-full p-3 border border-[#30363D]"
            />
          </div>
          <div>
            <Button type="submit" onClick={handleSearchSubmit}>Search</Button>
          </div>
        </div>
        {/* <div className="columns-2 gap-4 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit mt-6 pt-2"> */}
        <div className=" grid grid-cols-2  gap-4 md:gap-4 mt-4">
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
