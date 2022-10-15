import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { removeLS } from "../../utils/LocalStorage/index";
import { FiAlertTriangle } from "react-icons/fi";

export const LogoutModal = ({ visible, setVisible }) => {
  const navigate = useNavigate();

  const onOk = () => {
    removeLS("jwt_token");
    navigate("/signin");
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
    >
      <div className="flex flex-row gap-4 items-center">
        <FiAlertTriangle className="text-orange-200 text-2xl" />
        <h1 className="text-dark-300 dark:text-white text-2xl font-semibold">
          {"You're about to Sign Out!"}
        </h1>
      </div>
      <span></span>
    </Modal>
  );
}
