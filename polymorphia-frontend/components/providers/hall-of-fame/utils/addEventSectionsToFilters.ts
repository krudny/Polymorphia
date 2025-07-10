import { EventSectionShortResponseDto } from "@/components/course/event-section/types";
import {
  HallOfFameFilter,
  HallOfFameFilterOption,
} from "@/components/hall-of-fame/general/types";

export const addEventSectionsToFilters = (
  eventSections: EventSectionShortResponseDto[],
  filter: HallOfFameFilter
) => {
  const existingValues = new Set(
    filter.options.map((option: HallOfFameFilterOption) => option.value)
  );

  eventSections?.forEach((eventSection: EventSectionShortResponseDto) => {
    if (!existingValues.has(eventSection.name)) {
      filter.options.push({
        label: eventSection.name,
        value: eventSection.name,
        priority: eventSection.priority,
        isSelected: false,
      });
      existingValues.add(eventSection.name);
    }
  });
};
