import { ModalProps } from "@/interfaces/modal/ModalInterfaces";
import ModalInner from "./ModalInner";
import { useState, useEffect } from "react";
import { ModalProvider } from "./ModalContext";

export default function Modal(props: ModalProps) {
  const { isDataPresented, onClosed, ...rest } = props;

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(isDataPresented);
  }, [isDataPresented]);

  const onRequestClose = () => {
    setModalVisible(false);
  };

  return (
    <ModalProvider closeModal={onRequestClose}>
      <ModalInner
        isOpen={modalVisible}
        onRequestClose={onRequestClose}
        onClosed={onClosed}
        {...rest}
      />
    </ModalProvider>
  );
}
