import { ModalInnerProps } from "@/interfaces/modal/ModalInterfaces";
import clsx from "clsx";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import "../../styles/modal.css";
import { useAnimatedModalState } from "@/animations/Modal";
import { useRef } from "react";

export default function ModalInner({
  isOpen,
  onRequestClose,
  onClosed,
  title,
  subtitle,
  children,
}: ModalInnerProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const modalState = useAnimatedModalState(
    isOpen,
    modalRef,
    backdropRef,
    onClosed
  );

  return createPortal(
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
            <X className="modal-header-exit-button" onClick={onRequestClose} />
          </div>
          <h2>{subtitle}</h2>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
