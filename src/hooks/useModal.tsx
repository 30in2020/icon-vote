import React, { ReactNode } from "react";

export default () => {
  const [isModalOpened, toggleModal] = React.useState<boolean>(false);
  const [modalContent, setModalContent] = React.useState<ReactNode>(null);

  const handleModal = (content = null) => {
    if (content) {
      toggleModal(true);
      document.body.style.overflow = "hidden";
      setModalContent(content);
    } else {
      toggleModal(false);
      document.body.style.overflow = "auto";
    }
  };

  return { isModalOpened, handleModal, modalContent };
};
