import { FilterConfig } from "../../filters/types";

export const filterXpDetails = (
  xpDetails: Record<string, string>,
  rankingOptionsFilterConfig: FilterConfig,
  rangingOptionsFilterValues: string[]
): Record<string, string> => {
  if (rankingOptionsFilterConfig.id !== "rankingOptions") {
    throw new Error(
      `filterXpDetails: Expected filter id 'rankingOptions', got '${rankingOptionsFilterConfig.id}'`
    );
  }

  const selectedKeys = new Set(rangingOptionsFilterValues);

  return Object.fromEntries(
    Object.entries(xpDetails).filter(([key]) => selectedKeys.has(key))
  );
};
