import { Modal } from "antd";
import { FiAlertTriangle } from "react-icons/fi";

export const ConfirmModal = ({ visible, setVisible, onClick, ModalTitle="Confirm", ModalText="Do you Confirm this Step?", ModalForm }) => {

  const onOk = () => {
    onClick();
    hideModal();
  };

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <Modal
        // title={ModalTitle}
        visible={visible}
        onOk={onOk}
        onCancel={hideModal}
        okText="Confirm"
        cancelText="Cancel"
        cancelButtonProps={{ type: "text", className:'text-[#A6A7AB]' }}
        closable={false}
    >
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center">
                <FiAlertTriangle className="text-orange-200 text-2xl" />
                <h1 className="text-white text-2xl font-semibold">
                {ModalTitle}
                </h1>
            </div>
            <div>
                {
                    ModalForm ? (
                        ModalForm
                    ) : ""
                }
            </div>
            <span></span>
        </div>
    </Modal>
  );
}
