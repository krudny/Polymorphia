"use client";

import ColumnComponent from "@/components/column-schema/column-component";
import { Fragment, useRef } from "react";
import { Accordion } from "@/components/accordion/Accordion";
import AccordionSection from "@/components/accordion/AccordionSection";
import { AccordionRef } from "@/providers/accordion/types";
import ItemsSummary from "@/components/column-schema/column-component/course-groups/student-info/items-summary";
import ChestSummary from "@/components/column-schema/column-component/course-groups/student-info/chest-summary";
import StudentSummary from "@/components/column-schema/column-component/course-groups/student-info/student-summary";
import useCourseGroupsContext from "@/hooks/contexts/useCourseGroupsContext";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import useStudentItems from "@/hooks/course/useStudentItems";
import useStudentChests from "@/hooks/course/useStudentChests";
import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";
import ColumnSwappableComponent from "@/components/column-schema/column-component/shared/column-swappable-component";
import { StudentSummaryResponseDTO } from "@/interfaces/api/student";
import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";

const SECTION_IDS = new Set(["student-summary", "items", "chests"]);
const INITIALLY_OPENED = new Set(["student-summary"]);

export default function StudentInfo() {
  const accordionRef = useRef<AccordionRef>(null);
  const { isSpecificDataLoading, isSpecificDataError, studentSummary } =
    useCourseGroupsContext();
  const { selectedTarget, targetId } = useTargetContext();
  const {
    data: items,
    isLoading: isItemsLoading,
    isError: isItemsError,
  } = useStudentItems(targetId);
  const {
    data: chests,
    isLoading: isChestsLoading,
    isError: isChestsError,
  } = useStudentChests(targetId);

  const topComponent = () => <h1>Student</h1>;
  const mainComponent = () => (
    <Fragment>
      <Accordion
        ref={accordionRef}
        sectionIds={SECTION_IDS}
        initiallyOpenedSectionIds={INITIALLY_OPENED}
        className="gap-y-5"
        maxOpen={1}
        shouldAnimateInitialOpen={false}
      >
        <AccordionSection
          id="student-summary"
          title="Profil"
          headerClassName="equipment-accordion-header"
        >
          <ColumnSwappableComponent<StudentSummaryResponseDTO>
            data={studentSummary}
            isDataLoading={isSpecificDataLoading}
            isDataError={isSpecificDataError}
            renderComponent={(data, key) => (
              <StudentSummary key={key} studentSummary={data} />
            )}
            renderDataErrorComponent={() => (
              <ErrorComponent
                message="Nie udało się załadować szczegółów studenta."
                size={ErrorComponentSizes.COMPACT}
              />
            )}
            minHeightClassName="min-h-[340px]"
            selectedTarget={selectedTarget}
          />
        </AccordionSection>
        <AccordionSection
          key="items"
          id="items"
          title="Przedmioty"
          headerClassName="equipment-accordion-header"
        >
          <ColumnSwappableComponent<EquipmentItemResponseDTO[]>
            data={items}
            isDataLoading={isChestsLoading}
            isDataError={isChestsError}
            renderComponent={(data, key) => (
              <ItemsSummary key={key} items={data} />
            )}
            renderDataErrorComponent={() => (
              <ErrorComponent
                message="Nie udało się załadować przedmiotów."
                size={ErrorComponentSizes.COMPACT}
              />
            )}
            renderEmptyDataErrorComponent={() => (
              <ErrorComponent
                title="Brak przedmiotów"
                message="W kursie nie istnieją żadne przedmioty możliwe do zdobycia."
                size={ErrorComponentSizes.COMPACT}
              />
            )}
            minHeightClassName="min-h-[140px]"
            className="pb-5 px-2"
            selectedTarget={selectedTarget}
          />
        </AccordionSection>

        <AccordionSection
          key="chests"
          id="chests"
          title="Skrzynki"
          headerClassName="equipment-accordion-header"
        >
          <ColumnSwappableComponent<EquipmentChestResponseDTO[]>
            data={chests}
            isDataLoading={isItemsLoading}
            isDataError={isItemsError}
            renderComponent={(data, key) => (
              <ChestSummary key={key} chests={data} />
            )}
            renderDataErrorComponent={() => (
              <ErrorComponent
                message="Nie udało się załadować skrzynek."
                size={ErrorComponentSizes.COMPACT}
              />
            )}
            renderEmptyDataErrorComponent={() => (
              <ErrorComponent
                title="Brak skrzynek"
                message="W kursie nie istnieją żadne skrzynki możliwe do zdobycia."
                size={ErrorComponentSizes.COMPACT}
              />
            )}
            minHeightClassName="min-h-[140px]"
            className="pb-5 px-2"
            selectedTarget={selectedTarget}
          />
        </AccordionSection>
      </Accordion>
    </Fragment>
  );

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
      hidden={selectedTarget === null}
    />
  );
}
