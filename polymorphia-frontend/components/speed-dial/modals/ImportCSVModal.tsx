import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal/Modal";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";

export default function ImportCSVModal({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal isDataPresented={true} onClosed={onClosedAction} title="Import CSV">
      <div className="min-w-88">
        <div className="w-full min-h-44 border-2 border-primary-dark border-dashed flex-col-centered gap-y-2 rounded hover:border-solid hover:bg-primary-dark hover:text-secondary-gray transition-colors duration-400 ease-[cubic-bezier(0.34,1,0.2,1)] hover:cursor-pointer">
          <span className="text-7xl material-symbols">cloud_upload</span>
          <span className="text-3xl">Przeciągnij i upuść plik CSV tutaj</span>
        </div>
        <div className="w-full mt-4">
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
