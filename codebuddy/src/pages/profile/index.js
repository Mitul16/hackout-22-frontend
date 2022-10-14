import React, { useEffect, useState } from "react";

import "./index.css";
import "./../Common Styles/Text.css";

//Blocks
import Details from "./ProfileBlocks/Details";
import BadgesiOwn from "./ProfileBlocks/BadgesiOwn";
import POAPsiOwn from "./ProfileBlocks/POAPsiOwn";
import DAOsJoined from "./ProfileBlocks/DAOsJoined";
import PersonalProjects from "./ProfileBlocks/PersonalProjects";
import Timeline from "./ProfileBlocks/Timeline";
import { API_URL } from "../../utils";
import toast from "react-hot-toast";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Button } from "@mui/material";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Modal } from '@mui/material';
import BadgeEarnPopup from './Badges/BadgeEarnPopup'
import Loader from '../../Components/Loader/Loader'
const axios = require("axios");

const APIURL = "https://api.thegraph.com/subgraphs/name/poap-xyz/poap-xdai";
const tokensQuery = `
  query($id: String)
    {
      account(id: $id) {
        id
        tokens {
          id,
          event{
            id
          }
        }
      }
    }

`;

const Profile = ({ viewState }) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  let BadgesEarned
	let showBadgesPopup

	if(state !== null){
		BadgesEarned = state['badgesData'];
		showBadgesPopup = state['showBadges'];
	}
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		showBadgesPopup = false;
	}

  // const [profileViewer, setprofileViewer] = useState("user");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({});
  const [poapData, setpoapData] = useState([]);
  const [isRunning, setIsRunning] = useState(true);
  // const [needRefresh, setNeedRefresh] = useState(true);

  const getUser = async (e) => {
    // e.preventDefault();
    try {
      let accessToken = localStorage.getItem("jwt_token");
      // console.log(id)
      const rawResponse = await axios.get(String(API_URL) + `profile/details/${id&&viewState==='view'?id:''}`, {
        headers: {
          Accept: "application/json",
          "x-access-token": accessToken,
        },
      });
      const content = await rawResponse.data;

      toast.success("Profile details fetched Successfully!");
      console.log(content.data);
      setUser(content.data);
      if(content.data.wallet_address) {
        getPoaps(content.data.wallet_address);
      }
      else
      { if(viewState === 'user')
        {setIsRunning(false);
          toast((t) => (
            <span>
              Your wallet hasn't been connected yet.
              <p>Please connect your wallet to make the most of your profile.</p>
              <Button variant="outlined" size="small" onClick={() => toast.dismiss(t.id)}>
                Dismiss
              </Button>
            </span>
          ));
        }
      }

      // getPoaps('0x1d5e65a087ebc3d03a294412e46ce5d6882969f4')
    } catch (e) {
      console.log(e);
      console.log(e.response.data.message);
      setErrorMessage(e.response.data.message);
      toast.error(e.response.data.message);
      if(e.response.data.message.includes('Unauthorized'))
        navigate('/login')

			navigate('/error',{state:{from:'Profile'},replace:true})
			// return(e);
		}
	};

	const getPoaps = wallet_address => {
		const client = new ApolloClient({
			uri: APIURL,
			cache: new InMemoryCache(),
		});

		client
			.query({
				query: gql(tokensQuery),
				variables: {
					id: wallet_address.toLowerCase(),
				},
			})
			.then(data => {
				// console.log(data);
				// console.log(wallet_address);
				if (data.data.account) {
					let newData = data.data.account.tokens.map(obj => ({
						...obj,
						uri: "https://api.poap.tech/metadata/" + String(obj.event.id) + "/" + String(obj.id),
					}));
					setpoapData(newData);
					// console.log(newData);
				} else {
					console.log("No POAPs found");
					setpoapData([]);
				}
			})
			.catch(err => {
				console.log("Error fetching data: ", err);
			});
		setIsRunning(false);
	};

	useEffect(() => {
		if (showBadgesPopup) {
			setTimeout(() => {
				handleOpen();
			}, 1000);
		}
    getUser();
  }, [id]);

   if (!user || isRunning) return <Loader/>;

  return (
    <section className="Profile">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BadgeEarnPopup handleClose={handleClose} BadgesEarned={BadgesEarned}/>
      </Modal>
      <div className="Profile_Cover-Container Profile-block">
        <img
          src="https://products.ls.graphics/mesh-gradients/images/01.-Royal-Heath.jpg"
          alt={"cover"}
          className="Profile_Cover"
        />
      </div>
      <Details 
        viewState={viewState} 
        user={user} 
        userId={id?id:''}
        getUser={getUser}
      />
      <section className="Profile_Blocks">
        <div className="Profile_Blocks-left">
          <Timeline 
            viewState={viewState} 
            works={user.works} 
            />
          <PersonalProjects
            viewState={viewState}
            projects={user.projects}
          />
        </div>
        <div className="Profile_Blocks-right">
          <BadgesiOwn viewState={viewState} badges={user.user_badges} isLocked={user.wallet_address?false:true} />
          <POAPsiOwn viewState={viewState} poaps={poapData} isLocked={user.wallet_address?false:true} />
          {/*<DAOsJoined viewState={viewState} />*/}
        </div>
      </section>
    </section>
  );
};

export default Profile;
