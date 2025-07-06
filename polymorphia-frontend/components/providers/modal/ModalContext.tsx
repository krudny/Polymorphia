import React, { createContext, useContext } from "react";
import {
  ModalContextValue,
  ModalProviderProps,
} from "@/components/providers/modal/types";

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  closeModal,
}) => {
  return (
    <ModalContext.Provider value={{ closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
