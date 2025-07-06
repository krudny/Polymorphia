export interface ModalContextValue {
  closeModal: () => void;
}

export interface ModalProviderProps {
  children: React.ReactNode;
  closeModal: () => void;
}
