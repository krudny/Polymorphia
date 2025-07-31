import { EventSectionResponseDTO } from "@/components/course/event-section/types";
import {
  HallOfFameFilter,
  HallOfFameFilterOption,
} from "@/components/hall-of-fame/general/types";

export const addEventSectionsToFilters = (
  eventSections: EventSectionResponseDTO[],
  filter: HallOfFameFilter
) => {
  const existingValues = new Set(
    filter.options.map((option: HallOfFameFilterOption) => option.value)
  );

  eventSections?.forEach((eventSection: EventSectionResponseDTO) => {
    if (!existingValues.has(eventSection.name)) {
      filter.options.push({
        label: eventSection.name,
        value: eventSection.name,
        order: eventSection.order,
        isSelected: false,
      });
      existingValues.add(eventSection.name);
    }
  });
};
