import StudentInfo from "@/shared/student-info/StudentInfo";
import Modal from "@/components/modal/Modal";
import { ChangePasswordModalProps } from "@/app/(logged-in)/settings/modals/change-password/types";

export default function ChangePasswordModal({
  onClosedAction,
}: ChangePasswordModalProps) {
  return (
    <Modal isDataPresented={true} onClosed={onClosedAction} title="Zmień hasło">
      <StudentInfo />
    </Modal>
  );
}
