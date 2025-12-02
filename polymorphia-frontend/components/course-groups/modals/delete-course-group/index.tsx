import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";
import useModalContext from "@/hooks/contexts/useModalContext";
import useDeleteCourseGroup from "@/hooks/course/useDeleteCourseGroup";

function DeleteCourseGroupModalContent() {
  const { mutation } = useDeleteCourseGroup();
  const { closeModal } = useModalContext();

  const handleConfirm = () => {
    mutation.mutate();
  };

  return (
    <div className="delete-course-group">
      <h1>
        Usunięcie grupy zajęciowej powoduje usunięcie przypisania studentów do
        grup, a także ich zwierzaków, wraz z powiązanymi ocenami. Operacja jest
        nieodwracalna.{" "}
      </h1>
      <h1>Czy na pewno chcesz kontynuować?</h1>
      <div className="delete-course-group-buttons">
        <ButtonWithBorder
          text="Powrót"
          className="!mx-0 !py-0 !w-full"
          onClick={closeModal}
        />
        <ButtonWithBorder
          text="Zatwierdź"
          className="!mx-0 !py-0 !w-full"
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
}

export default function DeleteCourseGroupModal({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Usuwanie grupy"
    >
      <DeleteCourseGroupModalContent />
    </Modal>
  );
}
