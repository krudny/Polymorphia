import { InstructorGradableEventResponseDTO } from "@/app/(logged-in)/course/EventSectionService";
import XPCard from "@/components/xp-card/XPCard";
import XPCardUngraded from "@/components/xp-card/components/XPCardUngraded";
import {ReactNode} from "react";

export default function renderCard(
  gradableEvent: InstructorGradableEventResponseDTO,
  isMobile: boolean,
  handleClick: (id: number) => void
): ReactNode {
  return (
    <XPCard
      title={gradableEvent.name}
      subtitle={gradableEvent.topic ?? ""}
      color={gradableEvent.ungraded === 0 ? "green" : "silver"}
      component={<XPCardUngraded ungraded={gradableEvent.ungraded} />}
      size={isMobile ? "sm" : "md"}
      forceWidth={!isMobile}
      onClick={() => handleClick(gradableEvent.id)}
    />
  );
}
