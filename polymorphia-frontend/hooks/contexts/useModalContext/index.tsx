import { ModalContextInterface } from "@/providers/modal/types";
import { useContext } from "react";
import { ModalContext } from "@/providers/modal";

export default function useModalContext(): ModalContextInterface {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
}
