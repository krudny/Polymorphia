import {
  ModalContextValue,
  ModalProviderProps,
} from "@/interfaces/modal/ModalInterfaces";
import React, { createContext, useContext } from "react";

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
