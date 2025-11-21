import XPCard from "@/components/xp-card/XPCard";
import XPCardText from "@/components/xp-card/components/XPCardText";
import { ReactNode } from "react";
import { InstructorGradableEventCardProps } from "@/views/gradable-events/instructor/types";

export default function InstructorGradableEventCard({
  gradableEvent,
  size,
  handleClick,
}: InstructorGradableEventCardProps): ReactNode {
  return (
    <XPCard
      title={gradableEvent.name}
      subtitle={gradableEvent.topic ?? ""}
      color={gradableEvent.ungradedStudents === 0 ? "green" : "sky"}
      rightComponent={
        <XPCardText
          topText={gradableEvent.ungradedStudents.toString()}
          bottomText="Nieocenionych"
          color="gray"
        />
      }
      size={size}
      forceWidth={true}
      onClick={() => handleClick(gradableEvent)}
    />
  );
}
