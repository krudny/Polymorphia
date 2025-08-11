/* @ts-nocheck */
/* eslint-disable */

import GradableEventRewardModal from "@/components/speed-dial/modals/GradableEventRewardModal";

// @ts-ignore
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
