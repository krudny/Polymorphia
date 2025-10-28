"use client";

import ColumnComponent from "@/components/column-schema/column-component";
import { Fragment } from "react";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import useStudentLastActivity from "@/hooks/course/useStudentLastActivity";
import Loading from "@/components/loading";
import LastActivityDetails from "@/components/column-schema/column-component/course-groups/last-activity/details";

const USER_ID = 1;

export default function LastActivity() {
  const { data: lastActivities, isLoading } = useStudentLastActivity(USER_ID);
  const wrapperRef = useFadeInAnimate(!isLoading);

  if (isLoading || !lastActivities) {
    return <Loading />;
  }

  const topComponent = () => <h1>Aktywność</h1>;
  const mainComponent = () => (
    <Fragment>
      <div ref={wrapperRef} className="opacity-0">
        {lastActivities.map((lastActivity, index) => (
          <LastActivityDetails
            userId={USER_ID + index}
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
