/* @ts-nocheck */

import GradableEventRewardModal from "@/components/speed-dial/modals/GradableEventRewardModal";

export default function RoadmapModals({ gradableEvent, setSelectedEvent }) {
  if (!gradableEvent) return null;

  if (gradableEvent.hasChest) {
    return null;
  }

  return (
    <GradableEventRewardModal
      gradableEventId={gradableEvent.id}
      onClosed={() => setSelectedEvent(null)}
    />
  );
}
