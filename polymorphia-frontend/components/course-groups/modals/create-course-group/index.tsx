import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal";
import "./index.css";

function CreateCourseGroupContent() {
  return <></>;
}

export default function CreateCourseGroupModal({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Utwórz nową grupę"
    >
      <CreateCourseGroupContent />
    </Modal>
  );
}
