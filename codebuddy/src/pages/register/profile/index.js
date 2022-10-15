import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
// import validator from "validator";
import { Button } from '../../../components/button/index';
import { TextInput } from '../../../components/textInput/index';
// import { getAccessToken, post } from '../../../utils/API/index';
// import { storeLS } from '../../../utils/LocalStorage/index';
import {AiOutlineGithub} from 'react-icons/ai'
// import "./index.css";

const RegisterProfile = (props) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  const formDefault = {
      name: "",
      description: "",
      Github:"",
  }
  const [formData, setFormData] = useState(formDefault);
  const handleChange = (content, parameter) => {
    setFormData((prevData) => {
      const tempData = prevData;
      tempData[parameter] = content;
      return { ...tempData };
    });
  };
  
  const sendRequest = () => { navigate("/register/skills") }

  return (
    <div className="h-screen w-screen bg-[#141517] flex justify-center items-center py-12">
      <div className="w-2/5 bg-dark-200 h-full px-8 py-12 flex flex-col items-center rounded-lg pt-16 h-full shadow-xl border border-[#30363D]">
        <h1 className="text-3xl font-medium text-dark-300 dark:text-white text-center">
          Create Profile 
        </h1>
        <fieldset disabled={loading} className="w-4/5 h-full">
          <form onSubmit={sendRequest} className="h-full flex flex-col justify-between">
            <div className="py-6 flex flex-col gap-6">
              <TextInput
                pretext="Name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => handleChange(e, "name")}
                required
              />
              <TextInput
                pretext="Description"
                inputType="textarea"
                placeholder="About Me"
                resize={false}
                value={formData.description}
                onChange={(e) => handleChange(e.target.value, "description")}
                required
                height="h-36"
              />
              <TextInput
                pretext="Github handle"
                prefix={
                <AiOutlineGithub className="text-xl dark:text-white text-dark-300" />
                }
                placeholder="Github Username"
                value={formData.github}
                onChange={(e) => handleChange(e, "github")}
              />
            </div>
            <div className="flex flex-row gap-6">
              <Button type="submit" isLoading={loading}>
                Continue
              </Button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );

}

export default RegisterProfile