import React, { useEffect, useState } from "react";
import {get} from "../../utils/API/index";
import ProfileAvatar from "../../assets/images/ProfileAvatar.png"
import { SkillTag } from "../../components/skillTag/index";
import { ProjectCardWide } from "../../components/ProjectCard/index";
import toast from "react-hot-toast";
import { useParams } from "react-router";

const Profile = ({dashboard}) => {
  // const navigate = useNavigate();
  // const { state } = useLocation();

  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [update , setUpdate] = useState("");
  const { id } = useParams();
  const [projects , setProjects] = useState([]);
  const [toggleState , setToggleState] = useState(true);

  const getUser = async (e) => {
    const response = await get("/user/get-user");
    console.log(response.data);
   
    if(response.data.status === "OK"){
      setUserData(response.data);
      
      setUpdate("HH");
      console.log(userData.data.ongoingProjects);
      setProjects(userData.data.ongoingProjects);
      return;
    }else{

       toast.error(response.error);
        return;
    }
  };
  const handleToggle = async(e) =>{
    console.log("TTTTt");
    if(!toggleState){
      setProjects(userData.data.completedProjects);
      setToggleState(true);
    }else{
       setProjects(userData.data.completedProjects);
       setToggleState(false);
    }
  }
  useEffect(() => {
    getUser();
  }, [update]);

  //  if (!user || isLoading) return <Loader/>;
  const ToggleButton = ({ href, title, selected}) => {
    return (
      <>
        {
          <a
          href="#0"
          onClick={handleToggle}
            className={`block ${` ${
              selected
                ? " text-dark-300 dark:text-light-100 bg-[#2C2E33] flex-row"
                : " text-dark-300 dark:text-light-200 flex-col md:flex-row"
            } hover:bg-light-100 dark:hover:bg-dark-200`} md:rounded-lg flex items-center gap-4 px-5 py-3 text-md font-semibold h-fill border-blue-200 dark:border-light-300 flex-1 md:flex-none`}
          >
            <span>{title}</span>
          </a>
        }
      </>
    );
  };
  return (
    <section className="flex gap-6 flex-col px-10 py-12">
      <div className="w-full">
        <div className="text-2xl font-bold dark:text-white">Profile</div>
      </div>
      <div
        className="md:flex w-full bg-color-white border-b border-[#30363D] flex-row pb-4"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div className="md:block py-4 rounded-full w-48">
          <img src={ProfileAvatar} alt="" srcset="" className="rounded-full" />
        </div>
        <div
          className="w-4/5 flex-col"
          style={{
            marginLeft: "5%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <h3 className="hidden md:block text-3xl font-bold text-dark-300 dark:text-white pt-2 mb-1">
              {userData?.user?.name ? userData.user.name : "Manav Agarwal"}
            </h3>
          </div>
          <div>
            <h3 className="hidden md:block text-xl font-bold text-[#A6A7AB]">
              {userData?.data?.user?.username
                ? "@" + userData?.data?.user?.username
                : "@Hades-012"}
            </h3>
          </div>
          <div className="py-2 w-5/6">
            <p className="hidden md:block text-lg text-[#A6A7AB]">
              {userData?.user?.description
                ? "@" + userData?.user?.description
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
            </p>
            <div className="flex gap-2">
              {userData?.user?.tags?.length > 0
                ? userData?.user?.tags?.map((tag, i) => (
                    <SkillTag variant={"base"} tagValue={tag} key={i} />
                  ))
                : ["NodeJS", "CSS", "React", "NextJS"].map((tag, i) => (
                    <SkillTag variant={"base"} tagValue={tag} key={i} />
                  ))}
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex w-full flex-col">
        <div className="md:flex w-full flex-row gap-8">
          <div className="text-2xl font-bold text-dark-300 dark:text-white self-center">
            Projects
          </div>
          <div className="flex-row h-full md:h-fit flex md:gap-4 flex-row md:flex-row">
            <ToggleButton title={"Ongoing"} selected={toggleState} onClick={handleToggle}/>
            <ToggleButton title={"Completed"} seletected={!toggleState} onClick={handleToggle}/>
          </div>
        </div>
        <div className="flex-col h-full md:gap-4 mt-4">
          {projects?.length > 0
            ? projects?.map((project, i) => (
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
    </section>
  );
};

export default Profile;
