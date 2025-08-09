import XPCardChest from "@/components/xp-card/inner-components/XPCardChest";
import XPCardPoints from "@/components/xp-card/inner-components/XPCardPoints";

export const getStudentCardComponent = (
  gainedXp: number,
  hasChest: boolean
) => {
  if (hasChest) return <XPCardChest />;
  return (
    <XPCardPoints
      points={gainedXp.toFixed(1).toString()}
      isSumLabelVisible={true}
      hasChest={hasChest}
    />
  );
};
