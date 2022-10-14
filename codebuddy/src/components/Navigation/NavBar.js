import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
          name: "Profile",
          link: "../profile",
        },
      ]);

    }

  },[props.isEmployer, props.employerId])
  if (props.loginStatus &&  !location.pathname.includes("/verify-email")) {
    return (
      <nav className="navbar">
        <div className="Navlinks">
          {navContent.map((link, id) => {
            return (
              <NavLink key={id} className="NavLink" to={link.link}>
                {link.name}
              </NavLink>
            );
          })}
        </div>
      </nav>
    );
  } else {
    return;
  }
};

export default NavBar;
