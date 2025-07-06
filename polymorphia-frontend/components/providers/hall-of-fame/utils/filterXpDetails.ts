import { HallOfFameFilter } from "@/components/hall-of-fame/general/types";

export const filterXpDetails = (
  xpDetails: Record<string, string>,
  rankingOptionsFilter: HallOfFameFilter
): Record<string, string> => {
  if (rankingOptionsFilter.id !== "rankingOptions") {
    throw new Error(
      `filterXpDetails: Expected filter id 'rankingOptions', got '${rankingOptionsFilter.id}'`
    );
  }

  const selectedKeys = new Set(
    rankingOptionsFilter.options
      .filter((option) => option.isSelected)
      .map((option) => option.value)
  );

  return Object.fromEntries(
    Object.entries(xpDetails).filter(([key]) => selectedKeys.has(key))
  );
};
