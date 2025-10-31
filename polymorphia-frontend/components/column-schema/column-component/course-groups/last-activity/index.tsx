"use client";

import ColumnComponent from "@/components/column-schema/column-component";
import { Fragment } from "react";
import "./index.css";
import useStudentLastActivity from "@/hooks/course/useStudentLastActivity";
import Loading from "@/components/loading";
import LastActivityDetails from "@/components/column-schema/column-component/course-groups/last-activity/details";

const USER_ID = 1;

export default function LastActivity() {
  const { data: lastActivities, isLoading } = useStudentLastActivity(USER_ID);

  if (isLoading || !lastActivities) {
    return <Loading />;
  }

  const topComponent = () => <h1>Aktywność</h1>;
  const mainComponent = () => (
    <Fragment>
      <div className="last-activity">
        {lastActivities.map((lastActivity) => (
          <LastActivityDetails
            key={lastActivity.id}
            lastActivity={lastActivity}
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
