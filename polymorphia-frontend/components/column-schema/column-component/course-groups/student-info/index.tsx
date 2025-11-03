"use client";

import ColumnComponent from "@/components/column-schema/column-component";
import { Fragment, useRef } from "react";
import { Accordion } from "@/components/accordion/Accordion";
import AccordionSection from "@/components/accordion/AccordionSection";
import {
  baseSwapAnimationWrapperProps,
  SwapAnimationWrapper,
} from "@/animations/SwapAnimationWrapper";
import { AccordionRef } from "@/providers/accordion/types";
import ItemsSummary from "@/components/column-schema/column-component/course-groups/student-info/items-summary";
import ChestSummary from "@/components/column-schema/column-component/course-groups/student-info/chest-summary";
import StudentSummary from "@/components/column-schema/column-component/course-groups/student-info/student-summary";
import useCourseGroupsContext from "@/hooks/contexts/useCourseGroupsContext";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import { getKeyForSelectedTarget } from "@/providers/grading/utils/getKeyForSelectedTarget";
import Loading from "@/components/loading";
import useStudentItems from "@/hooks/course/useStudentItems";
import useStudentChests from "@/hooks/course/useStudentChests";

const SECTION_IDS = new Set(["student-summary", "items", "chests"]);
const INITIALLY_OPENED = new Set(["student-summary"]);

export default function StudentInfo() {
  const accordionRef = useRef<AccordionRef>(null);
  const { isSpecificDataLoading, studentSummary } = useCourseGroupsContext();
  const { selectedTarget, targetId } = useTargetContext();
  const { data: items, isLoading: isItemsLoading } = useStudentItems(targetId);
  const { data: chests, isLoading: isChestsLoading } =
    useStudentChests(targetId);

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
          <SwapAnimationWrapper
            {...baseSwapAnimationWrapperProps}
            keyProp={
              studentSummary && !isSpecificDataLoading
                ? getKeyForSelectedTarget(selectedTarget)
                : "loading" + getKeyForSelectedTarget(selectedTarget)
            }
          >
            {studentSummary && !isSpecificDataLoading ? (
              <StudentSummary studentSummary={studentSummary} />
            ) : (
              <div className="course-group-loading">
                <Loading />
              </div>
            )}
          </SwapAnimationWrapper>
        </AccordionSection>
        <AccordionSection
          key="items"
          id="items"
          title="Przedmioty"
          headerClassName="equipment-accordion-header"
        >
          <SwapAnimationWrapper
            {...baseSwapAnimationWrapperProps}
            keyProp={
              items && !isItemsLoading
                ? getKeyForSelectedTarget(selectedTarget)
                : "loading" + getKeyForSelectedTarget(selectedTarget)
            }
          >
            {items && !isItemsLoading ? (
              <ItemsSummary items={items} />
            ) : (
              <div className="course-group-loading">
                <Loading />
              </div>
            )}
          </SwapAnimationWrapper>
        </AccordionSection>

        <AccordionSection
          key="chests"
          id="chests"
          title="Skrzynki"
          headerClassName="equipment-accordion-header"
        >
          <SwapAnimationWrapper
            {...baseSwapAnimationWrapperProps}
            keyProp={
              chests && !isChestsLoading
                ? getKeyForSelectedTarget(selectedTarget)
                : "loading" + getKeyForSelectedTarget(selectedTarget)
            }
          >
            {chests && !isChestsLoading ? (
              <ChestSummary chests={chests} />
            ) : (
              <div className="course-group-loading">
                <Loading />
              </div>
            )}
          </SwapAnimationWrapper>
        </AccordionSection>
      </Accordion>
    </Fragment>
  );

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
