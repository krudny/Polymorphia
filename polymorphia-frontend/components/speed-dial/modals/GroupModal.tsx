import Modal from "@/components/modal/Modal";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import StudentInfo from "@/shared/student-info/StudentInfo";

export default function GroupModal({ onClosed }: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosed}
      title="Grupa"
      subtitle="Oto skład twojej grupy:"
    >
      <StudentInfo />
    </Modal>
  );
}
