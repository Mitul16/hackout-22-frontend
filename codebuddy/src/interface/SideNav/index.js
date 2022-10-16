import { NavLinks, NavLink } from "../NavLinks/index";
import { LogoutModal  } from "../LogoutModal/index";
import { ProjectModal  } from "../../components/AddProjectModal/index";
import { FiLogOut } from "react-icons/fi";
// import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SideNav = ({isLoggedIn }) => {
  const location = useLocation();	
  const navigate = useNavigate();
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  
  // console.log(location)

  const allowedPaths = ["/", "/projects", "/project", "/profile"]

  if (!isLoggedIn) return;

  if(location.pathname.includes("/project") || allowedPaths.includes(location.pathname))
    return (
      <div className="hidden md:flex w-80 h-screen sticky top-0 p-8 justify-between flex-col">
        <LogoutModal
          visible={showSignOutModal}
          setVisible={setShowSignOutModal}
        />
        <ProjectModal
          visible={showProjectModal}
          setVisible={setShowProjectModal}
        />
        <div className="transition absolute h-full w-screen top-0 right-0 bg-dark-200"></div>
        <div className="relative w-full">
          <div className="w-full flex items-center justify-center text-dark-400">
          <h2 className="text-light-400 text-lg text-bold">
            {`< CodeBuddy />`}
          </h2>
          </div>
          <NavLinks isLoggedIn={isLoggedIn} projectModVis={showProjectModal} setProjectModVis={setShowProjectModal} />
        </div>
        {isLoggedIn && (
          <div className="relative w-full border-t border-light-100 dark:border-dark-100 pt-4">
            <NavLink
              icon={<FiLogOut />}
              title={"Sign Out"}
              standAlone={true}
              isSelected={false}
              onClick={() => setShowSignOutModal(true)}
            />
          </div>
        )}
      </div>
    );
  
  else return;
}

export default SideNav;
