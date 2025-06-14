import { ModalProps } from "@/interfaces/modal/ModalInterfaces";
import { useState, useEffect, useRef } from "react";
import { ModalProvider } from "../providers/ModalContext";
import { useAnimatedModalState } from "@/animations/Modal";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { X } from "lucide-react";
import "../../styles/modal.css";

export default function Modal({
  isDataPresented,
  onClosed,
  title,
  subtitle,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(isDataPresented);
  }, [isDataPresented]);

  const modalState = useAnimatedModalState(
    modalVisible,
    modalRef,
    backdropRef,
    onClosed
  );

  const onRequestClose = () => {
    setModalVisible(false);
  };

  return createPortal(
    <ModalProvider closeModal={onRequestClose}>
      <div
        ref={backdropRef}
        className={clsx(
          "modal-backdrop",
          modalState !== "closed" ? "modal-visible" : "modal-not-visible"
        )}
        onClick={onRequestClose}
      >
        <div
          ref={modalRef}
          className="modal overflow-auto"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="modal-header-wrapper">
            <div className="modal-header">
              <h1>{title}</h1>
              <X
                className="modal-header-exit-button"
                onClick={onRequestClose}
              />
            </div>
            <h2>{subtitle}</h2>
          </div>
          {children}
        </div>
      </div>
    </ModalProvider>,
    document.body
  );
}
