"use client";

import ColumnComponent from "@/components/column-schema/column-component";
import { Fragment, useRef } from "react";
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
        {lastActivities.map((lastActivity) => (
          <LastActivityDetails
            userId={USER_ID}
            gradableEventId={lastActivity.id}
          />
        ))}
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
