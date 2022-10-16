import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {post} from "../../utils/API/index"

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
    try {
      setLoading(true);
      const payload = {
        email: email,
      };
      const data = await post('auth/forgetpassword',payload);
      setLoading(false);
      setEmailSent(true);
    } catch (e) {
      console.log(e);
      setErrorMessage(e.response.data.message);
      setLoading(false);
      toast.error(errorMessage);
    }
  };

  // const handleNext = async (e) => {
  //   e.preventDefault();
  //   setIsValidEmail(validator.isEmail(email));
  //   if (validator.isEmail(email)) {
  //     await submitRequest();
  //   }
  // };

  return (
    <>
    </>
  );
};

export default ForgetPassword;
