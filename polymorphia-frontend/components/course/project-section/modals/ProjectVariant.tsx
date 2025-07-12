import Modal from "@/components/modal/Modal";
import {
  sampleText2,
  sampleText3,
} from "@/components/course/project-section/sampleText";

export default function ProjectVariant({
  isActive,
  onClosed,
}: {
  isActive: boolean;
  onClosed: () => void;
}) {
  return (
    <Modal
      isDataPresented={isActive}
      onClosed={onClosed}
      title="Wariant projektu"
      subtitle="Twój wariant projektu to G-2."
    >
      <div className="flex flex-col gap-y-5 max-w-lg">
        <span className="text-2xl">{sampleText2}</span>
        <span className="text-2xl">{sampleText3}</span>
      </div>
    </Modal>
  );
}
