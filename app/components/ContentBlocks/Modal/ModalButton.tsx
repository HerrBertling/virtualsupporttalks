import React from "react";
import { Modal } from "../Modal/ModalComponent";
import "./Modal.component.css";

export const ModalButton = () => {
  const [isModalOpen, setModalState] = React.useState(false);

  const toggleModal = () => setModalState(!isModalOpen);

  return (
    <div className={"app"}>
      <button className={"app__btn"} onClick={toggleModal}>
        International Listener Day
      </button>
      <Modal
        title={"International Listener Day Video"}
        isOpen={isModalOpen}
        onClose={toggleModal}
      >
        Modal
      </Modal>
    </div>
  );
};
