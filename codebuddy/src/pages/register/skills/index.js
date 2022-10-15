import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
// import validator from "validator";
import { Button } from '../../../components/button/index';
import { RolesInput } from '../../../components/RolesInput/index';
// import { getAccessToken, post } from '../../../utils/API/index';
// import { storeLS } from '../../../utils/LocalStorage/index';
import {AiOutlineGithub} from 'react-icons/ai'
// import "./index.css";

const RegisterSkills = (props) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  const formDefault = {
      name: "",
      description: "",
      Github:"",
      tags:[],
  }
  const [formData, setFormData] = useState(formDefault);
  const handleChange = (content, parameter) => {
    setFormData((prevData) => {
      const tempData = prevData;
      tempData[parameter] = content;
      return { ...tempData };
    });
  };
  
  const sendRequest = () => {navigate("/profile") }

  return (
    <div className="h-screen w-screen bg-[#141517] flex justify-center items-center py-12">
      <div className="w-2/5 bg-dark-200 h-full px-8 py-12 flex flex-col items-center rounded-lg pt-16 h-full shadow-xl border border-[#30363D]">
      <h1 className="text-3xl font-medium text-dark-300 dark:text-white text-center">
          Add Skills 
        </h1>
        <fieldset disabled={loading} className="w-4/5 h-full">
          <form onSubmit={sendRequest} className="h-full flex flex-col justify-between">
            <div className="py-6 flex flex-col gap-6">
                <RolesInput
                    title="Tags"
                    roles={formData.tags}
                    setRoles={(e) => handleChange(e, "tags")}
                    suggestions={[
                    { value: "HTML" },
                    { value: "CSS" },
                    { value: "JavaScript" },
                    { value: "ReactJS" },
                    { value: "NextJS" },
                    { value: "TailwindCSS" },
                    { value: "MongoDB" },
                    { value: "ExpressJS" },
                    { value: "NodeJS" },
                    { value: "TypeScript" },
                    { value: "Gatsby" },
                    { value: "ThreeJS" },
                    { value: "VueJS" },
                    { value: "NuxtJS" },
                    { value: "D3.JS" },
                    { value: "MaterialUI" },
                    { value: "Ant Design" },
                    { value: "CannonJS" },
                    { value: "File-Saver" },
                    { value: "Guify" },
                    { value: "Docker" },
                    { value: "Firebase" },
                    { value: "Axios" },
                    { value: "SendGrid" },
                    { value: "Webpack" },
                    { value: "Babel" },
                    { value: "JSZip" },
                    ]}
                    isLoading={loading}
                />
            </div>
            <div className="flex flex-row gap-6">
              <Button type="submit" isLoading={loading}>
                Submit
              </Button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );

}

export default RegisterSkills