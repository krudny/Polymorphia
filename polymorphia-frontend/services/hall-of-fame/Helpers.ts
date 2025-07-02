import { EventSectionShortResponseDto} from "@/interfaces/course/event-section/EventSectionInterfaces";

export const addEventSectionsToCategories = (eventSections: EventSectionShortResponseDto[], category) => {
  const existingValues = new Set(category.options.map((option) => option.value));

  eventSections?.forEach((eventSection: EventSectionShortResponseDto) => {
    if (!existingValues.has(eventSection.name)) {
      category.options.push({
        label: eventSection.name,
        value: eventSection.name,
        priority: eventSection.priority,
        isSelected: false,
      });
      existingValues.add(eventSection.name);
    }
  });
}

export const getAllCategories = (state) => {
  return {
    sortCategory: state.find((category) => category.id === "sort"),
    sortByCategory: state.find((category) => category.id === "sortBy"),
    groupsCategory: state.find((category) => category.id === "groups"),
    rankingOptionsCategory: state.find((category) => category.id === "rankingOptions"),
  };
};