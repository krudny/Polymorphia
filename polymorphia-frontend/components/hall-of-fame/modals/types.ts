import { FilterablePageableContextInterface } from "@/components/providers/filters/types";
import { Context } from "react";

export interface FiltersModalProps<
  T extends FilterablePageableContextInterface,
> {
  context: Context<T>;
  onFiltersApplied?: () => void;
}
