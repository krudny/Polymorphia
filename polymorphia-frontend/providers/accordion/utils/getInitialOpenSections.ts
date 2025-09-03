import { useAccordionStateProps } from "../types";

export function getInitialOpenSections(
  sectionIds: useAccordionStateProps["sectionIds"],
  initiallyOpenedSectionIds: NonNullable<
    useAccordionStateProps["initiallyOpenedSectionIds"]
  >,
  maxOpen: useAccordionStateProps["maxOpen"]
) {
  if (initiallyOpenedSectionIds.difference(sectionIds).size > 0) {
    console.warn(
      `[Accordion] Initially opened sections contain invalid id(s).`
    );
  }

  return Array.from(
    initiallyOpenedSectionIds.intersection<string>(sectionIds).keys()
  ).slice(0, maxOpen ?? sectionIds.size);
}
