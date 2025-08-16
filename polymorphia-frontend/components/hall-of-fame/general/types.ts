export interface HallOfFameFilter {
  id: HallOfFameFilterID;
  name: string;
  isOpen: boolean;
  minSelections: number;
  maxSelections: number;
  options: HallOfFameFilterOption[];
}

export interface HallOfFameFilterOption {
  label: string;
  value: string;
  isSelected: boolean;
  orderIndex?: number;
}

export type HallOfFameFilterID =
  | "sort"
  | "sortBy"
  | "groups"
  | "rankingOptions";
