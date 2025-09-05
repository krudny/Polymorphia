import Modal from "@/components/modal/Modal";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import StudentInfo from "@/shared/student-info/StudentInfo";

export default function GroupModal({ onClosedAction }: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Grupa"
      subtitle="Oto skład twojej grupy:"
    >
      <StudentInfo />
    </Modal>
  );
}
