import { rgbToHex } from "@mui/material";
import { Modal, Avatar } from "antd";
const TaskModal = ({ visible, setVisible }) => {
  const hideModal = () => {
    setVisible(false);
  };
  return (
    <Modal
      visible={visible}
      onCancel={hideModal}
      footer={null}
      bodyStyle={{
        backgroundColor: "rgb(25, 26, 30)",
        border: "2px solid rgb(48, 54, 61)",
        padding: "0",
      }}
      style={{
        top: "5%",
        left: -30,
      }}
      className="w-3/5"
      closable={false}
    >
      <div className="flex flex-col gap-4 py-8 px-10">
        <div className="flex flex-row gap-4 ">
          <div className="flex flex-col gap-2 justify-self-start">
            <h1 className="text-dark-300 dark:text-white text-4xl font-semibold my-0.5">
              {"Task Title"}
            </h1>
            <p className="text-dark-300 dark:text-gray-400 text-xl font-medium my-0.5">
              {"Project Name"}
            </p>
          </div>
          <div
            className="justify-self-end ml-auto py-2 px-4 h-fit flex items-center justify-center"
            style={{
              backgroundColor: "rgb(48, 54, 61)",
              border: "1px solid #30363D",
            }}
          >
            <h1 className="text-dark-300 dark:text-white text-base font-semibold my-auto">
              {"Deadline:16/10/22"}
            </h1>
          </div>
        </div>
        <div>
          <h1 className="text-dark-300 dark:text-white text-xl my-2 font-semibold">
            {"Description"}
          </h1>
          <p className="text-dark-300 dark:text-[#a6a7ab] text-sm font-normal">
            {
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            }
          </p>
        </div>
        <div>
          <h1 className="text-dark-300 dark:text-white text-xl font-semibold">
            Tech stack
          </h1>
          <div className="flex flex-row gap-2">
            {["NodeJS", "React", "MERN"].map((ele) => (
              <span
                className="text-dark-300 font-semibold text-xs dark:text-white py-1 px-3"
                style={{ backgroundColor: "rgb(44,46,51)", borderRadius: 40 }}
              >
                {" "}
                {ele}{" "}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-dark-300 dark:text-white text-xl font-semibold">
            Assigned
          </h1>
          <Avatar size={52} />
        </div>
        <div>
          <h1 className="text-dark-300 dark:text-white text-xl font-semibold">
            Comments
          </h1>
          <div className="flex flex-row gap-4">
            <Avatar size={32} />
            <input
              type="text"
              name=""
              id=""
              placeholder="Add a Comment..."
              style={{
                outline: "none",
                background: "none",
                borderBottom: "1px solid #22252A",
                paddingLeft: 8,
                color: "#A6A7AB",
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
