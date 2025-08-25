import Modal from "@/components/modal/Modal";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import ProjectVariantInfo from "@/shared/project-variant-info/ProjectVariantInfo";

export default function ProjectVariantModal({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Wariant projektu"
      subtitle="Oto przydzielone Tobie warianty projektu:"
    >
      <ProjectVariantInfo />
    </Modal>
  );
}
