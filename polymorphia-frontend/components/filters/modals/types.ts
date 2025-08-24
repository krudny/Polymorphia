import { FilterablePageableContextInterface } from "@/components/providers/filters/types";
import { Context } from "react";

export interface FiltersModalProps<
  FilterIdType extends string,
  ContextType extends FilterablePageableContextInterface<FilterIdType>,
> {
  context: Context<ContextType>;
  onFiltersApplied?: () => void;
}
