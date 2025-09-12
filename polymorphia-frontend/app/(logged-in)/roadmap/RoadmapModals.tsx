/* @ts-nocheck */
/* eslint-disable */

import GradeModal from "@/components/speed-dial/modals/grade";

// @ts-ignore
export default function RoadmapModals({ gradableEvent, setSelectedEvent }) {
  if (!gradableEvent) return null;

  if (gradableEvent.hasChest) {
    return null;
  }

  return <GradeModal onClosedAction={() => setSelectedEvent(null)} />;
}
