import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button } from "@mui/material";
import PrimaryBtn from "../../Onboarding/StyledComponents/PrimaryBtn";
import { ReactComponent as Logo } from "../../../assets/svgs/HACKOUT 2022-logo.svg";
import { toast } from "react-hot-toast";
import "./Register.css";
import { API_URL } from "../../../utils";
import validator from "validator";

const axios = require("axios");

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isValidEmail , setIsValidEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailSent , setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(true);
  };

  const submitRequest = async (e) => {
    // e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        email: email,
      };
      let accessToken = localStorage.getItem("jwt_token");
      //   console.log(user);
      const rawResponse = await axios.post(
        String(API_URL) + `auth/forgetpassword`,
        payload,
        {
          headers: {
            Accept: "application/json",
            "x-access-token": accessToken,
          },
        }
      );
      // console.log(rawResponse.data);
      setLoading(false);
      setEmailSent(true);
      toast.success("Email sent!");
    } catch (e) {
      console.log(e);
      // console.log(e.response.data.message);
      setErrorMessage(e.response.data.message);
      setLoading(false);
      toast.error(errorMessage);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setIsValidEmail(validator.isEmail(email));
    if (validator.isEmail(email)) {
      await submitRequest();
    }


  };

  return (
    <>
      <div
        className="login-page wallet-connect-page"
        style={{ minHeight: "100vh"}}
      >
        <div className="main-form">
          <div className="logo">
            <Logo />
          </div>{" "}
          <div>
            <div className="center" style={{ marginTop: "120px" }}>
              <Typography
                className="form-title"
                sx={{
                  fontSize: 30,
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: "bold",
                }}
                color="#4B73FF"
                gutterBottom
              >
                Forgot Password?
              </Typography>
            </div>
          </div>{" "}
          <div className="center text-div">
            <p> </p>
          </div>{" "}
          <div
            className="center"
            style={{ flexDirection: "column", alignItems: "center" }}
          >
            {
            !emailSent ?
            (<form
              onSubmit={handleNext}
              className="center"
              style={{
                flexDirection: "column",
                alignItems: "center",
                width: "50%",
                gap: "40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "75%",
                  flexDirection: "column",
                  gap: "24px",
                  marginBottom: "8px",
                  marginTop: "24px",
                }}
              >
                <TextField
                  required
                  label="Enter your registered email"
                  variant="outlined"
                  error={!isValidEmail}
                  helperText={!isValidEmail ? "Enter valid Email id" : ""}
                  value={email}
                  onChange={handleEmail}
                />
              </div>
              <PrimaryBtn
                type="submit"
                content="Submit"
                isLoading={loading}
                handleClick={handleNext}
                isDisabled={email === "" ? true : false}
              />
            </form>)
            :
            (
              <div style={{width:'50%',display: 'flex',flexDirection:'column', alignItems:'center'}}>
                <p className='text-Medium' style={{textAlign:'center', marginBottom:'36px'}}>Your new password is shared on your mail. Check your spam if the mail is not found.</p>
                <PrimaryBtn
                  content="Login Here"
                  handleClick={() => navigate("../login")}
                />
              </div>
            )  
          
          }
          </div>
        </div>
        <div className="side-banner-right align-center center column">
          <h2> HACKOUT 2022 </h2>{" "}
          <p> BUIDL your On-chain Resume and get access to web3 opportunities from all over the world. </p>{" "}
          {
          emailSent 
          ? (
            <div>
              <p>Your new password is shared on your mail. Check your spam if the mail is not found.</p>
              {/* <div className="signup-prompt">
              <p> Login here </p>{" "}
                <Button onClick={() => navigate("../login")}> LOGIN! </Button>{" "}
              </div> */}
            </div>
            ) : ""}
          {/* <div className="signup-prompt">
            <p> Login here </p>{" "}
            <Button onClick={() => navigate("../login")}> LOGIN! </Button>{" "}
          </div>{" "} */}
          {/* <img src="../../../assets/images/sideBanner.jpg" alt="side-banner" /> */}{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default ForgetPassword;
