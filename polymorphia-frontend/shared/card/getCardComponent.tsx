import XPCardChest from "@/components/xp-card/inner-components/XPCardChest";
import XPCardPoints from "@/components/xp-card/inner-components/XPCardPoints";

export const getCardComponent = (
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
