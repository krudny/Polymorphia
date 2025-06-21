import { ReactNode } from "react";

export type ModalState = "closed" | "opening" | "opened" | "closing";

export interface ModalProps {
  isDataPresented?: boolean;
  onClosed: () => void;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export interface ModalContextValue {
  closeModal: () => void;
}

export interface ModalProviderProps {
  children: React.ReactNode;
  closeModal: () => void;
}
