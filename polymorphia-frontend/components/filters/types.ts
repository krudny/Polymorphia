// can be extended in the future with different options
export type SpecialBehavior = "EXCLUSIVE";

export interface FilterOption {
  value: string;
  label?: string;
  specialBehavior?: SpecialBehavior;
}

export interface FilterConfig {
  id: string;
  title: string;
  options: FilterOption[];
  min?: number; // defaults to 1
  max?: number; // defaults to 1
  defaultValues?: string[];
}

export type FilterState = Record<string, string[]>;

export type FilterAction =
  | { type: "TOGGLE"; id: string; value: string }
  | { type: "SET"; state: FilterState }
  | { type: "RESET" };
