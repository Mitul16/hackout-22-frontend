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
    <section className="flex gap-6 flex-row px-8 py-12">
      <div className="w-full">
        <h2 className="hidden md:block text-5xl font-bold text-dark-300 dark:text-white">
          Profile
        </h2>
      </div>
      <div className="hidden md:flex w-1/2"></div>
    </section>
  );
};

export default Profile;

