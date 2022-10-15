import { Modal } from "antd";
import { useRouter } from "next/router";
import { removeLS } from "../../utils";
import { FiAlertTriangle } from "react-icons/fi";

export default function LogoutModal({ visible, setVisible }) {
  const router = useRouter();

  const onOk = () => {
    removeLS("jwt_token");
    router.push("/signin");
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
