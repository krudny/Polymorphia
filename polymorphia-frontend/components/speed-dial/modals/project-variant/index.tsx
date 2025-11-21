import Modal from "@/components/modal/Modal";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import ProjectVariantInfo from "@/shared/project-variant-info";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { TargetRequestDTO, TargetTypes } from "@/interfaces/api/target";

export default function ProjectVariantModal({
  onClosedAction,
}: SpeedDialModalProps) {
  const { id } = useUserDetails();
  const target = {
    type: TargetTypes.STUDENT,
    id,
  } as TargetRequestDTO;
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Wariant projektu"
      subtitle="Oto przydzielone Tobie warianty projektu:"
    >
      <ProjectVariantInfo target={target} />
    </Modal>
  );
}
