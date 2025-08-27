// can be extended in the future with different options
export type SpecialBehavior = "EXCLUSIVE";

export interface FilterOption {
  value: string;
  label?: string;
  specialBehavior?: SpecialBehavior;
}

export interface FilterConfig<FilterIdType extends string> {
  id: FilterIdType;
  title: string;
  options: FilterOption[];
  min?: number; // defaults to 1
  max?: number; // defaults to 1
  defaultValues?: string[];
}

export type FilterState<FilterIdType extends string> = Record<
  FilterIdType,
  string[]
>;

export type FilterAction<FilterIdType extends string> =
  | { type: "TOGGLE"; id: FilterIdType; value: string }
  | { type: "SET"; state: FilterState<FilterIdType> }
  | { type: "RESET" };
