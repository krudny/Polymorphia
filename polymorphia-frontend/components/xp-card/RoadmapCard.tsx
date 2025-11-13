import XPCard from "@/components/xp-card/XPCard";
import useUserContext from "@/hooks/contexts/useUserContext";
import { RoadmapCardsProps } from "@/app/(logged-in)/roadmap/types";
import { useMediaQuery } from "react-responsive";
import { Roles } from "@/interfaces/api/user";
import RoadmapCardRightComponent from "@/components/xp-card/components/RoadmapCardRightComponent";

export default function RoadmapCard({
  gradableEvent,
  onCardClicked,
}: RoadmapCardsProps) {
  const isXL = useMediaQuery({ minWidth: 1280 });
  const isMd = useMediaQuery({ minWidth: 768 });
  const { userRole } = useUserContext();

  const { name, topic, id, gainedXp, isLocked } = gradableEvent;
  const color = gainedXp ? "green" : "silver";
  const rightComponent = userRole === Roles.STUDENT && (
    <RoadmapCardRightComponent gradableEvent={gradableEvent} />
  );

  return (
    <XPCard
      title={name}
      subtitle={topic}
      key={id}
      color={color}
      size={isXL ? "md" : isMd ? "sm" : "xs"}
      forceWidth={true}
      isLocked={isLocked}
      onClick={() => userRole === Roles.STUDENT && onCardClicked(gradableEvent)}
      rightComponent={rightComponent}
    />
  );
}
