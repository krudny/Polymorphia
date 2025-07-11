import Modal from "@/components/modal/Modal";
import ProgressBar from "@/components/progressbar/ProgressBar";

export default function Rewards({
  isActive,
  onClosed,
}: {
  isActive: boolean;
  onClosed: () => void;
}) {
  return (
    <Modal isDataPresented={isActive} onClosed={onClosed} title="Nagrody">
      <div className="flex flex-col gap-y-5 w-72">
        <h3 className="text-2xl">Architektura</h3>
        <div className="w-full px-6">
          <ProgressBar
            minXP={0}
            currentXP={6.5}
            maxXP={16}
            numSquares={2}
            segmentSizes={[20, 60, 20]}
          />
        </div>
        <h3 className="text-2xl">Clean code</h3>
        <div className="w-full px-6">
          <ProgressBar
            minXP={0}
            currentXP={12}
            maxXP={16}
            numSquares={2}
            segmentSizes={[20, 60, 20]}
          />
        </div>
      </div>
    </Modal>
  );
}
