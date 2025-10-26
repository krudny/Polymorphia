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
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import useStudentLastGradableEvents from "@/hooks/course/useStudentLastGradableEvents";
import Loading from "@/components/loading";
import StudentGradableEventDetails from "@/components/column-schema/column-component/course-groups/last-activity/last-activity";

const USER_ID = 1;

export default function LastActivity() {
  const accordionRef = useRef<AccordionRef>(null);
  const { data: studentLastGradableEvents, isLoading } =
    useStudentLastGradableEvents(USER_ID);
  const wrapperRef = useFadeInAnimate(!isLoading);

  if (isLoading || !studentLastGradableEvents) {
    return <Loading />;
  }

  const accordionSections = studentLastGradableEvents.map(
    (studentLastGradableEvent) => studentLastGradableEvent.id.toString()
  );

  const topComponent = () => <h1>Aktywność</h1>;
  const mainComponent = () => (
    <Fragment>
      <div ref={wrapperRef} className="opacity-0">
        <Accordion
          ref={accordionRef}
          className="grade-accordion-override"
          sectionIds={new Set(accordionSections)}
          initiallyOpenedSectionIds={new Set(accordionSections[0])}
          maxOpen={1}
          shouldAnimateInitialOpen={false}
        >
          {studentLastGradableEvents.map((studentLastGradableEvent) => (
            <AccordionSection
              key={studentLastGradableEvent.id}
              id={studentLastGradableEvent.id.toString()}
              title={studentLastGradableEvent.gradableEventName}
              headerClassName="equipment-accordion-header"
            >
              <SwapAnimationWrapper
                {...baseSwapAnimationWrapperProps}
                keyProp={studentLastGradableEvent.id}
              >
                <StudentGradableEventDetails
                  userId={USER_ID}
                  gradableEventId={studentLastGradableEvent.id}
                />
              </SwapAnimationWrapper>
            </AccordionSection>
          ))}
        </Accordion>
      </div>
    </Fragment>
  );

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
