import React, { useEffect, useState } from "react";
import {get} from "../../utils/API/index";

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

  return (
    <div className={`w-full px-6 md:px-0 md:py-8 flex flex-col gap-10`}>
      
    </div>
  );
};

export default Profile;
