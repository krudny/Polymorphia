import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal/Modal";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";

export default function ImportCSVModal({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal isDataPresented={true} onClosed={onClosedAction} title="Import CSV">
      <div className="import-csv">
        <div className="import-csv-upload-wrapper">
          <span className="import-csv-upload-icon">cloud_upload</span>
          <span className="import-csv-text">
            Przeciągnij i upuść plik CSV tutaj
          </span>
        </div>
        <div className="import-csv-button-wrapper">
          <ButtonWithBorder
            text="Prześlij"
            className="!mx-0 !py-0 !w-full"
            onClick={() => {}}
          />
        </div>
      </div>
    </Modal>
  );
}
