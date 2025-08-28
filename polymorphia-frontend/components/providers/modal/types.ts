import { ReactNode } from "react";

export interface ModalContextInterface {
  closeModal: () => void;
}

export interface ModalProviderProps {
  children: ReactNode;
  closeModal: () => void;
}
