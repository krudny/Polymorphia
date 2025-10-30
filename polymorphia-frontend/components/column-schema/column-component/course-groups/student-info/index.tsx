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

export default function StudentInfo() {
  const accordionRef = useRef<AccordionRef>(null);
  const { isSpecificDataLoading } = useCourseGroupsContext();

  const topComponent = () => <h1>Student</h1>;
  const mainComponent = () => (
    <Fragment>
      <Accordion
        ref={accordionRef}
        sectionIds={new Set(["student-summary", "items", "chests"])}
        initiallyOpenedSectionIds={new Set(["student-summary"])}
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
              isSpecificDataLoading
                ? "loading-student-summary"
                : "student-summary"
            }
          >
            <StudentSummary />
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
            keyProp="items"
          >
            <ItemsSummary />
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
            keyProp="chests"
          >
            <ChestSummary />
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
