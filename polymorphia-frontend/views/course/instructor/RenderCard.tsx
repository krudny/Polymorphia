import XPCard from "@/components/xp-card/XPCard";
import XPCardUngraded from "@/components/xp-card/components/XPCardUngraded";
import { ReactNode } from "react";
import { InstructorGradableEventResponseDTO } from "@/interfaces/api/course";

export default function renderCard(
  gradableEvent: InstructorGradableEventResponseDTO,
  isMobile: boolean,
  handleClick: (id: number) => void,
): ReactNode {
  return (
    <XPCard
      title={gradableEvent.name}
      subtitle={gradableEvent.topic ?? ""}
      color={gradableEvent.ungradedStudents === 0 ? "green" : "sky"}
      rightComponent={
        <XPCardUngraded ungraded={gradableEvent.ungradedStudents} color="gray" />
      }
      size={isMobile ? "sm" : "md"}
      forceWidth={!isMobile}
      onClick={() => handleClick(gradableEvent.id)}
    />
  );
}
