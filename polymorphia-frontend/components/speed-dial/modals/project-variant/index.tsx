import Modal from "@/components/modal";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import ProjectVariantInfo from "@/shared/project-variant-info";

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
