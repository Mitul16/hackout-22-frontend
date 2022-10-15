import React from "react";
import {
  FiHome,
  FiUser,
  FiLogIn,
  FiLayout,
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

export const NavLink = ({
  href,
  icon,
  title,
  isSelected,
  onClick = () => {},
  standAlone = false,
}) => {
  return (
    <>
      {href ? (
        <Link href={href}>
          <a
            href={href}
            className={`block ${
              isSelected
                ? "bg-lightblue-200 text-blue-100 dark:text-white dark:bg-dark-100 border-t md:border-t-0"
                : ` ${
                    standAlone
                      ? " text-dark-300 dark:text-white "
                      : " text-dark-300 dark:text-light-300 "
                  } hover:bg-light-100 dark:hover:bg-dark-300`
            } ${
              standAlone ? "" : "flex-col md:flex-row"
            } md:rounded-lg flex items-center gap-2 md:gap-4 p-4 text-md font-semibold h-fill border-blue-200 dark:border-light-300 flex-1 md:flex-none`}
            onClick={onClick}
          >
            <span className="text-2xl md:text-xl">{icon}</span>
            <span>{title}</span>
          </a>
        </Link>
      ) : (
        <a
          href={"/"}
          className={`block ${
            isSelected
              ? "bg-lightblue-200 text-blue-100 dark:text-white dark:bg-dark-100 border-t md:border-t-0"
              : ` ${
                  standAlone
                    ? " text-dark-300 dark:text-white flex-row"
                    : " text-dark-300 dark:text-light-300 flex-col md:flex-row"
                } hover:bg-light-100 dark:hover:bg-dark-300`
          } md:rounded-lg flex items-center gap-4 p-4 text-md font-semibold h-fill border-blue-200 dark:border-light-300 flex-1 md:flex-none`}
          onClick={onClick}
        >
          <span className="text-2xl md:text-xl">{icon}</span>
          <span>{title}</span>
        </a>
      )}
    </>
  );
}

export const NavLinks = ({ isLoggedIn }) => {
  const location = useLocation();

  return (
    <div className="h-full md:h-fit md:my-6 flex md:gap-4 flex-row md:flex-col">
      { isLoggedIn &&
        NavLinksList.map((navLink, index) => (
          <NavLink
            key={`index-${index}`}
            href={navLink.href}
            icon={navLink.icon}
            title={navLink.title}
            isSelected={location.pathname === navLink.href}
          />
        ))}
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
          <div className="w-full hidden md:block">
            <NavLink
              icon={<FiLogIn />}
              title={"Sign In"}
              href={"/signin"}
              standAlone={true}
              isSelected={false}
            />
          </div>
        </>
      )}
    </div>
  );
}
