import { ModalProps } from "@/interfaces/modal/ModalInterfaces";
import clsx from "clsx";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import "../../styles/modal.css";
import { useModalAnimation } from "@/animations/Modal";

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: ModalProps) {
  const { modalRef, backdropRef, handleCloseClick } = useModalAnimation(
    onClose,
    isOpen
  );

  return createPortal(
    <div
      ref={backdropRef}
      className={clsx(
        "modal-backdrop",
        isOpen ? "modal-visible" : "modal-not-visible"
      )}
      onClick={handleCloseClick}
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
              onClick={handleCloseClick}
            />
          </div>
          <h2>{subtitle}</h2>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
