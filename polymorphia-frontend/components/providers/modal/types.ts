import { ReactNode } from "react";

export interface ModalContextValue {
  closeModal: () => void;
}

export interface ModalProviderProps {
  children: ReactNode;
  closeModal: () => void;
}
