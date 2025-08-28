import { FilterConfig, FilterState, SpecialBehaviors } from "../types";

export function validateFilters<FilterIdType extends string>(
  state: FilterState<FilterIdType>,
  configs: FilterConfig<FilterIdType>[]
): { valid: boolean; errors: Record<FilterIdType, string> } {
  const errors: Record<FilterIdType, string> = {} as Record<
    FilterIdType,
    string
  >;

  for (const config of configs) {
    const selected = state[config.id] ?? [];

    const selectedOptions = config.options.filter((option) =>
      selected.includes(option.value)
    );
    const exclusiveOption = selectedOptions.find(
      (option) => option.specialBehavior === SpecialBehaviors.EXCLUSIVE
    );
    if (exclusiveOption) {
      // This will never happen in normal scenario but we should validate all conditions
      if (selectedOptions.length !== 1) {
        errors[config.id] =
          `Opcja ${exclusiveOption.label ?? exclusiveOption.value} musi być jedyną wybraną opcją dla kategorii ${config.title.toLowerCase()}.`;
      }
      continue;
    }

    const min = config.min ?? 1;
    const max = config.max ?? 1;

    if (selected.length < min || selected.length > max) {
      const rangeText = min === max ? min : `od ${min} do ${max}`;
      errors[config.id] =
        `Dla kategorii ${config.title.toLowerCase()} wymagana liczba zaznaczonych opcji wynosi ${rangeText}.`;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
