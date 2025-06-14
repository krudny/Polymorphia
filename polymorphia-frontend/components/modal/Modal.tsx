import { ModalProps } from "@/interfaces/modal/ModalInterfaces";
import ModalInner from "./ModalInner";
import { useState, useEffect } from "react";

export default function Modal(props: ModalProps) {
  const { isDataPresented, onClose, ...rest } = props;

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(isDataPresented);
  }, [isDataPresented]);

  return (
    <ModalInner
      isOpen={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      onClosed={onClose}
      {...rest}
    />
  );
}
