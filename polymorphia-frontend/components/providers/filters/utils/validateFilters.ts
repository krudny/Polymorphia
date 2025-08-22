import { FilterConfig, FilterState } from "../types";

export function validateFilters(
  state: FilterState,
  configs: FilterConfig[]
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  for (const cfg of configs) {
    const selected = state[cfg.id] ?? [];

    const selectedOptions = cfg.options.filter((o) =>
      selected.includes(o.value)
    );
    const hasExclusive = selectedOptions.some(
      (o) => o.specialBehavior === "EXCLUSIVE"
    );
    if (hasExclusive) continue;

    const min = cfg.min ?? 1;
    const max = cfg.max ?? 1;

    if (selected.length < min || selected.length > max) {
      const rangeText = min === max ? min : `od ${min} do ${max}`;
      errors[cfg.id] =
        `Dla kategorii ${cfg.title.toLowerCase()} wymagana liczba zaznaczonych opcji wynosi ${rangeText}.`;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
