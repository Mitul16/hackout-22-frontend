import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { removeLS } from "../../utils/LocalStorage/index";
import { FiAlertTriangle } from "react-icons/fi";

export const LogoutModal = ({ visible, setVisible }) => {
  const navigate = useNavigate();

  const onOk = () => {
    removeLS("jwt_token");
    navigate("/login");
    hideModal();
  };

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <Modal
      //   title="Sign Out"
      visible={visible}
      onOk={onOk}
      onCancel={hideModal}
      okText="Sign Out"
      cancelText="Cancel"
      cancelButtonProps={{ type: "text", className:'text-[#A6A7AB]' }}
    >
      <div className="flex flex-row gap-4 items-center">
        <FiAlertTriangle className="text-orange-200 text-2xl" />
        <h1 className="text-white text-2xl font-semibold">
          {"You're about to Sign Out!"}
        </h1>
      </div>
      <span></span>
    </Modal>
  );
}
