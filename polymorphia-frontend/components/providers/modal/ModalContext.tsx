import React, { createContext, FC } from "react";
import { ModalContextInterface, ModalProviderProps } from "@/components/providers/modal/types";

export const ModalContext = createContext<ModalContextInterface | undefined>(undefined);

export const ModalProvider: FC<ModalProviderProps> = ({
                                                        children,
                                                        closeModal,
                                                      }) => {
  return (
    <ModalContext.Provider value={{ closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
