import XPCardChest from "@/components/xp-card/components/XPCardChest";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";

export const getStudentCardComponent = (
  gainedXp: string | undefined,
  hasChest: boolean
) => {
  if (hasChest) return <XPCardChest />;
  return (
    <XPCardPoints
      points={gainedXp}
      isSumLabelVisible={true}
      hasChest={hasChest}
    />
  );
};
