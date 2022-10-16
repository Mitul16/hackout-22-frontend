import React from "react";
import {
  FiHome,
  FiUser,
  FiLogIn,
  FiLayout,
  FiPlus,
  FiUserPlus,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const NavLinksList = [
  {
    icon: <FiHome />,
    title: "Home",
    href: "/",
  },
  {
    icon: <FiLayout />,
    title: "Projects",
    href: "/projects",
  },
  {
    icon: <FiUser />,
    title: "Profile",
    href: "/profile",
  },
];

export const NavLinkBtn = ({
  href,
  icon,
  title,
  onClick = () => {},
  standAlone = false,
  visible = false,
  setVisible = () => {},
}) => {
  return (
    <>
      {(
        <div
          className={`block cursor-pointer ${
               ` ${
                  standAlone
                    ? " text-dark-300 dark:text-light-300 bg-[#202020] flex-row"
                    : " text-dark-300 dark:text-light-200 flex-col md:flex-row"
                } hover:bg-light-100 dark:hover:bg-dark-100`
          } md:rounded-lg flex items-center gap-4 p-4 text-md font-semibold h-fill border-blue-200 dark:border-light-300 flex-1 md:flex-none`}
          onClick={ () => setVisible(true)}
        >
          <span className="text-2xl md:text-xl">{icon}</span>
          <span>{title}</span>
        </div>
      )}
    </>
  );
};

export const NavLink = ({
  href,
  icon,
  title,
  isSelected,
  standAlone = false,
  onClick=()=>{}
}) => {
  const navigate = useNavigate();
  return (
    <>
      {href ? (
        <Link to={href}>
          <a
            href={href}
            className={`block ${
              isSelected
                ? "bg-lightblue-200 text-blue-100 dark:text-white dark:bg-dark-100 border-t md:border-t-0"
                : ` ${
                    standAlone
                      ? "text-white "
                      : "text-light-300 "
                  } hover:bg-dark-300`
            } ${
              standAlone ? "" : "flex-col md:flex-row"
            } md:rounded-lg flex items-center gap-2 md:gap-4 p-4 text-md font-semibold h-fill border-light-300 flex-1 md:flex-none`}
            onClick={()=>{
              navigate(href)
            }}
          >
            <span className="text-2xl md:text-xl">{icon}</span>
            <span>{title}</span>
          </a>
        </Link>
      ) : (
        <div
          className={`block cursor-pointer ${
            isSelected
              ? "text-white bg-dark-100 border-t md:border-t-0"
              : ` ${
                  standAlone
                    ? " text-white flex-row"
                    : " text-light-300 flex-col md:flex-row"
                } hover:bg-dark-300`
          } md:rounded-lg flex items-center gap-4 p-4 text-md font-semibold h-fill border-light-300 flex-1 md:flex-none`}
          onClick={onClick}
        >
          <span className="text-2xl md:text-xl">{icon}</span>
          <span>{title}</span>
        </div>
      )}
    </>
  );
}

export const NavLinks = ({ isLoggedIn, projectModVis, setProjectModVis }) => {
  const location = useLocation();

  return (
    <div className="h-full md:h-fit md:my-6 flex md:gap-4 flex-row md:flex-col">
      { isLoggedIn &&(
        <>
          {NavLinksList.map((navLink, index) => (
            <NavLink
              key={`index-${index}`}
              href={navLink.href}
              icon={navLink.icon}
              title={navLink.title}
              isSelected={location.pathname === navLink.href}
            />
          ))}
          <div className="w-fll md:block border-t border-[#30363D] my-2"></div>
          <div className="w-full hidden md:block border-1 items-center text-center flex-col align-center">
            <NavLinkBtn
              icon={<FiPlus />}
              title={"Add New Project"}
              standAlone={true}
              isSelected={false}
              visible={projectModVis}
              setVisible={setProjectModVis}
            />
            <p className="items-center align-center text-[#A6A7AB] my-2 mx-0">or</p>
            <NavLinkBtn
              icon={<FiUserPlus />}
              title={"Join a Project"}
              standAlone={true}
              isSelected={false}
            />
          </div>
        </>
      )}
      {!isLoggedIn && (
        <>
          {NavLinksList
            .filter((_, i) => i !== 4)
            .map((navLink, index) => (
              <NavLink
                key={`index-${index}`}
                href={navLink.href}
                icon={navLink.icon}
                title={navLink.title}
                isSelected={location.pathname === navLink.href}
              />
            ))}
        </>
      )}
    </div>
  );
}
