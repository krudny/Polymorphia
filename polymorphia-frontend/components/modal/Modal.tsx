"use client";

import clsx from "clsx";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import "./index.css";
import { useAnimatedModalState } from "@/animations/Modal";
import { useEffect, useRef, useState } from "react";
import { ModalProvider } from "@/providers/modal/ModalContext";
import { ModalProps } from "@/components/modal/types";
import { useTheme } from "next-themes";

export default function Modal(props: ModalProps) {
  const { isDataPresented, onClosed, title, subtitle, children, ...rest } =
    props;

  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();
  const background =
    resolvedTheme === "dark"
      ? "bg-[url(/background-modal-dark.webp)]"
      : "bg-[url(/background-modal.webp)]";

  useEffect(() => {
    setModalVisible(isDataPresented);
  }, [isDataPresented]);

  const onRequestClose = () => {
    setModalVisible(false);
  };

  const modalState = useAnimatedModalState(
    modalVisible,
    modalRef,
    backdropRef,
    onClosed
  );

  return (
    <ModalProvider closeModal={onRequestClose}>
      {createPortal(
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
            className={`modal ${background}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
            {...rest}
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
        </div>,
        document.body
      )}
    </ModalProvider>
  );
}
