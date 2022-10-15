import React, { useEffect, useState } from "react";
import {get} from "../../utils/API/index";
import ProfileAvatar from "../../assets/images/ProfileAvatar.png"
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
  const ProjectCard = (project)=>{
    return (
      <>
        <div className="border md:block bg-[#1A1B1E] border-[#30363D] p-8 rounded">
          <h3 className="hidden md:block text-3xl text-dark-300 dark:text-white">
            {project.title ? project.title : "Project Name"}
          </h3>
          <p className="mt-3 hidden md:block text-[#A6A7AB]">
            {project.description
              ? project.description
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat."}
          </p>
        </div>
      </>
    );
      
  }
  return (
    <section className="flex gap-6 flex-col px-10 py-12">
      <div className="w-full">
        <h2 className="hidden md:block text-6xl font-bold text-dark-300 dark:text-white">
          Profile
        </h2>
      </div>
      <div
        className="md:flex w-full bg-color-white border-b border-[#30363D] flex-row py-7"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div className=" md:block py-5 rounded-full" style={{ width: "14%" }}>
          <img src={ProfileAvatar} alt="" srcset="" className="rounded-full" />
        </div>
        <div
          className="w-2/3 flex-col"
          style={{
            marginLeft: "5%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <h3 className="hidden md:block text-5xl font-bold text-dark-300 dark:text-white py-2">
              {user.name ? user.name : "Manav Agarwal"}
            </h3>
          </div>
          <div>
            <h3 className="hidden md:block text-3xl font-bold text-[#A6A7AB]">
              {user.username ? "@" + user.username : "@Hades-012"}
            </h3>
          </div>
          <div className="py-6">
            <p className="hidden md:block text-2xl text-[#A6A7AB]">
              {user.description
                ? "@" + user.description
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
            </p>
          </div>
        </div>
      </div>
      <div className="md:flex w-full flex-col">
        <h3 className="hidden md:block text-4xl font-bold text-dark-300 dark:text-white py-5">
          Projects
        </h3>
        <div className="flex-row h-full md:h-fit md:my-6 flex md:gap-4 flex-row md:flex-row">
          <ToggleButton title={"Ongoing"} selected={true} />
          <ToggleButton title={"Completed"} />
        </div>
        <div className="flex-row h-full md:gap-4 w-2/3">
        <ProjectCard />
        </div>
      </div>
    </section>
  );
};

export default Profile;

