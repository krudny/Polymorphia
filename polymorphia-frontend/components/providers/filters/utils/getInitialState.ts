import { FilterConfig, FilterState } from "../types";

export function getInitialState(configs: FilterConfig[]): FilterState {
  return configs.reduce<FilterState>((acc, cfg) => {
    acc[cfg.id] = cfg.defaultValues ?? [];
    return acc;
  }, {});
}
