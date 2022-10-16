import { Modal, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { FiCode, FiEdit, FiExternalLink, FiTrash } from "react-icons/fi";
// import { TextInput, Button, RolesInput } from "../";
import { TextInput } from "../textInput/index";
import { Button } from "../button/index";
import {RolesInput} from "../RolesInput/index";
// import axios from "axios";

// import { log, post, remove } from "../../utils";

// const post = async (endpoint, body, token = null) => {
// try {
// const response = await axios.post(
// API_URL + endpoint,
// body,
// getHeaders(token)
// );
// log(response.data);
// return response.data;
// } catch (err) {
// error(err?.response?.data || err);
// return err?.response?.data || err;
// }
// };
//
export const ProjectModal = ({
  visible=false,
  setVisible,
  getUser,
  project = {
    title: "",
    description: "",
    github: "",
    demo: "",
    duration: "",
    contract_address: "",
    tags: [],
  },
}) => {
  const [projectDetails, setProjectDetails] = useState(project),
    [loading, setLoading] = useState(false),
    [open, setOpen] = useState(false);

  const handleChange = (content, parameter) => {
    setProjectDetails((prevData) => {
      const tempData = prevData;
      tempData[parameter] = content;
      return { ...tempData };
    });
  };

  return (
    <>
      <Modal
        className="shadow-xl"
        visible={visible}
        footer={null}
        confirmLoading={loading}
        onCancel={loading ? () => {} : () => setVisible(false)}
        bodyStyle={{
          backgroundColor: "rgb(25, 26, 30)",
          boxShadow: "0 0 0 1px rgb(48, 54, 61)",
        }}
        style={{
          top: "8%",
        }}
        closable={true}
      >
        <h1 className="text-2xl font-medium text-dark-300 dark:text-white text-center">
          Add Project
        </h1>
        <fieldset disabled={loading}>
          <form
            onSubmit={() => {
              return false;
            }}
          >
            <div className="py-6 flex flex-col gap-6">
              <TextInput
                pretext="Project Title"
                placeholder="Project Name"
                value={projectDetails.title}
                onChange={(e) => handleChange(e, "title")}
                required
              />
              <TextInput
                pretext="Description"
                inputType="textarea"
                placeholder="Breif description of your project" 
                resize={false}
                value={projectDetails.description}
                onChange={(e) => handleChange(e.target.value, "description")}
                required
                height="h-36"
              />
              <RolesInput
                title="Tech Stack"
                roles={projectDetails.tags}
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
              <div className="flex gap-4">
                <div className="flex gap-1">
                  <Checkbox
                    className="text-dark-300 dark:text-gray-400"
                    onChange={(e) => handleChange(e,"OpenforMentors")}
                    style={{
                      backgroundColor: "rgb(25, 26, 30)",
                      color: "white",
                    }}
                  >
                    <span className="text-dark-300 dark:text-gray-400">
                      Open for Mentors
                    </span>
                  </Checkbox>
                </div>
                <Checkbox
                  className="text-dark-300 dark:text-gray-400"
                  onChange={(e) => handleChange(e,"OpenforDevelopers")}
                  style={{
                    backgroundColor: "rgb(25, 26, 30)",
                    color: "white",
                  }}
                >
                  <span className="text-dark-300 dark:text-gray-400">
                    Open for Developers
                  </span>
                </Checkbox>
              </div>
            </div>
            <div className="flex flex-row gap-6 pt-10">
              <Button
                buttonType="filled-secondary"
                onClick={() => setVisible(false)}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={loading}>
                Save
              </Button>
            </div>
          </form>
        </fieldset>
      </Modal>
    </>
  );
}
