import React, { useEffect } from "react";
import logo from "./../../assets/svgs/social3-logo.svg";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logout from "./../LogOutButton/Logout";

import "./NavBar.css";

const NavBar = (props) => {
  const location = useLocation();	
  const navigate = useNavigate();
  const [navContent,setNavContent]= React.useState([]);

  function redirectHome(){
    if(props.loginStatus){
      navigate("../dashboard");
    }else{
      navigate("../login");
    }
  }

  useEffect(() => {
    if(props.isEmployer){

      setNavContent([
        {
          name: "Dashboard",
          link: "../dashboard",
        },
        {
          name: "Applicants",
          link: "../applicants",
        },
        {
          name: "My Company",
          link: `../recruiter/company`,
        },
      ])

    }else{

      setNavContent([
        {
          name: "Dashboard",
          link: "../dashboard",
        },
        {
          name: "Explore",
          link: "../opportunities",
        },
        {
          name: "Events",
          link: "../events",
        },
        {
          name: "Profile",
          link: "../profile",
        },
      ]);

    }

  },[props.isEmployer, props.employerId])

  const nonavbarRoutes = ["/login", "/register", "/", "/wallet" , "/verify", "/setwallet" , "/forget-password", "/error","/onboarding","/onboarding/roles","/onboarding/nfts","/onboarding/wallet","/onboarding/poaps","/onboarding/cooking" , "/verify-email/:token"];



  if (props.loginStatus && !nonavbarRoutes.includes(location.pathname) && !location.pathname.includes("/verify-email")) {
    return (
      <nav className="navbar">
        <img src={logo} alt="logo" className="NavLogo" style={{cursor : "pointer"}} onClick={redirectHome} />
        <div className="Navlinks">
          {navContent.map((link, id) => {
            return (
              <NavLink key={id} className="NavLink" to={link.link}>
                {link.name}
              </NavLink>
            );
          })}
          <Logout loginStatus={props.loginStatus} />
        </div>
      </nav>
    );
  } else {
    return;
  }
};

export default NavBar;
