import { ReactNode } from "react";

export type ModalState = "closed" | "opening" | "opened" | "closing";

export interface ModalProps {
  isOpen: boolean;
  /**
   * Use this callback to set the visibility (isOpen) of the modal to false.
   *
   * This needs to be seperate from clearing the data in order to keep
   * Modal's children rendered for the duration of closing animation.
   *
   * Use it to close the modal in the content of the Modal.
   *
   * @example
   * const [modalVisible, setModalVisible] = useState<boolean>(true);
   * const [presentedData, setPresentedData] = useState<DataType | null>(...);
   *
   * const onRequestClose = () => {
   *   setModalVisible(false);
   * }
   *
   * // ...
   *
   * <Modal
   *   isOpen={modalVisible}
   *   onRequestClose={onRequestClose}
   *   // ...
   * >
   *   ...
   * </Modal>
   *
   * @returns void
   */
  onRequestClose: () => void;
  /**
   * Use this callback to clear the data displayed inside the modal.
   * This callback MUST NOT be used to close the modal. Use onRequestClose instead.
   *
   * @example
   * const [modalVisible, setModalVisible] = useState<boolean>(false);
   * const [presentedData, setPresentedData] = useState<DataType | null>(...);
   *
   * const onClosed = () => {
   *   setPresentedData(null);
   * }
   *
   * // ...
   *
   * <Modal
   *   isOpen={modalVisible}
   *   onClosed={onClosed}
   *   // ...
   * >
   *   ...
   * </Modal>
   *
   * @returns void
   */
  onClosed: () => void;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}
