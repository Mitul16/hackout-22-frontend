import React, { useEffect, useState } from "react";
import {get} from "../../utils/API/index";
import ProfileAvatar from "../../assets/images/ProfileAvatar.png"
import { SkillTag } from "../../components/skillTag/index";
import { ProjectCardWide } from "../../components/ProjectCard/index";

const Profile = ({dashboard}) => {
  // const navigate = useNavigate();
  // const { state } = useLocation();

  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getUser = async (_) => {
    const response = await get(`profile/details/${dashboard.username}`);
    setUser(response.data);
  };

  useEffect(() => {
    if (dashboard) {
      getUser();
    }
  }, [dashboard]);

  //  if (!user || isLoading) return <Loader/>;
  const ToggleButton = ({ href, title, selected}) => {
    return (
      <>
        {
          <a
            href={"/"}
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
        <div className="text-2xl font-bold dark:text-white">
          Profile
        </div>
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
              {user.name ? user.name : "Manav Agarwal"}
            </h3>
          </div>
          <div>
            <h3 className="hidden md:block text-xl font-bold text-[#A6A7AB]">
              {user.username ? "@" + user.username : "@Hades-012"}
            </h3>
          </div>
          <div className="py-2 w-5/6">
            <p className="hidden md:block text-lg text-[#A6A7AB]">
              {user.description
                ? "@" + user.description
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
            </p>
            <div className="flex gap-2">
              {
                user.tags?.length > 0 
                ? user.tags.map((tag,i) => <SkillTag variant={'base'} tagValue={tag} key={i}/>)
                : ['NodeJS','CSS','React','NextJS'].map((tag,i) => <SkillTag variant={'base'} tagValue={tag} key={i}/>)
              }
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex w-full flex-col">
        <div className="md:flex w-full flex-row gap-8">
        <div className="hidden md:block text-2xl font-bold text-dark-300 dark:text-white self-center">
          Projects
        </div>
        <div className="flex-row h-full md:h-fit flex md:gap-4 flex-row md:flex-row">
          <ToggleButton title={"Ongoing"} selected={true} />
          <ToggleButton title={"Completed"} />
        </div>
        </div>
        <div className="flex-col h-full md:gap-4 mt-4">
          {
            user.projects?.length > 0 
            ? user.projects.map((project,i) => <ProjectCardWide variant='wide' projectData={project} key={i}/>)
            // : (<div className="w-full flex align-center justify-center">
            //     <p className="text-lg text-[#A6A7AB] ">{'You Currently have no projects'}</p>
            //   </div>)
            : [{title:'gwdvuyw'},{title:'djegdywb'}].map((project,i) => <ProjectCardWide variant='wide' projectData={project} key={i}/>)
          }
        </div>
      </div>
    </section>
  );
};

export default Profile;
