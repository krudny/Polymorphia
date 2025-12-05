import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";
import "./index.css";
import useModalContext from "@/hooks/contexts/useModalContext";
import useDeleteAnimal from "@/hooks/course/useDeleteAnimal";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import { TargetTypes } from "@/interfaces/api/target";

function DeleteAnimalModalContent() {
  const { mutation } = useDeleteAnimal();
  const { closeModal } = useModalContext();
  const { selectedTarget } = useTargetContext();

  // TODO: student id != animal id
  if (!selectedTarget || selectedTarget.type !== TargetTypes.STUDENT) {
    return (
      <ErrorComponent
        size={ErrorComponentSizes.COMPACT}
        message="Nie znaleziono danych zwierzaka. Wybierz studenta z listy."
      />
    );
  }

  const handleConfirm = () => {
    mutation.mutate({ animalId: selectedTarget.student.id });
  };

  return (
    <div className="delete-animal">
      <h1>
        Usunięcie zwierzaka powoduje usunięcie go z kursu oraz wszystkich jego
        ocen. Operacja jest nieodwracalna.
      </h1>
      <h1>
        Usuwasz: {selectedTarget.student.fullName} (
        {selectedTarget.student.animalName})
      </h1>
      <h1>Czy na pewno chcesz kontynuować?</h1>
      <div className="delete-animal-buttons">
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

export default function DeleteAnimalModal({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Usuwanie zwierzaka"
    >
      <DeleteAnimalModalContent />
    </Modal>
  );
}
