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
import useStudentLastActivity from "@/hooks/course/useStudentLastActivity";
import Loading from "@/components/loading";
import LastActivityDetails from "@/components/column-schema/column-component/course-groups/last-activity/details";

const USER_ID = 1;

export default function LastActivity() {
  const accordionRef = useRef<AccordionRef>(null);
  const { data: lastActivities, isLoading } = useStudentLastActivity(USER_ID);
  const wrapperRef = useFadeInAnimate(!isLoading);

  if (isLoading || !lastActivities) {
    return <Loading />;
  }

  const accordionSections = lastActivities.map((lastActivity) =>
    lastActivity.id.toString()
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
          {lastActivities.map((lastActivity) => (
            <AccordionSection
              key={lastActivity.id}
              id={lastActivity.id.toString()}
              title={lastActivity.gradableEventName}
              headerClassName="equipment-accordion-header"
            >
              <SwapAnimationWrapper
                {...baseSwapAnimationWrapperProps}
                keyProp={lastActivity.id}
              >
                <LastActivityDetails
                  userId={USER_ID}
                  gradableEventId={lastActivity.id}
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
