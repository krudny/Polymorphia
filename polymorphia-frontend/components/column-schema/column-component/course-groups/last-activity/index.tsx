"use client";

import ColumnComponent from "@/components/column-schema/column-component";
import { Fragment } from "react";
import "./index.css";
import Loading from "@/components/loading";
import LastActivityDetails from "@/components/column-schema/column-component/course-groups/last-activity/details";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import useCourseGroupsContext from "@/hooks/contexts/useCourseGroupsContext";
import {
  baseSwapAnimationWrapperProps,
  SwapAnimationWrapper,
} from "@/animations/SwapAnimationWrapper";
import { getKeyForSelectedTarget } from "@/providers/grading/utils/getKeyForSelectedTarget";

export default function LastActivity() {
  const { isSpecificDataLoading, lastActivities } = useCourseGroupsContext();
  const {
    state: { selectedTarget },
  } = useTargetContext();

  const topComponent = () => <h1>Aktywność</h1>;
  const mainComponent = () => (
    <SwapAnimationWrapper
      {...baseSwapAnimationWrapperProps}
      keyProp={
        lastActivities && !isSpecificDataLoading
          ? getKeyForSelectedTarget(selectedTarget)
          : "loading" + getKeyForSelectedTarget(selectedTarget)
      }
    >
      <div className="last-activity">
        {lastActivities && !isSpecificDataLoading ? (
          <>
            {lastActivities.map((lastActivity) => (
              <LastActivityDetails
                key={lastActivity.id}
                lastActivity={lastActivity}
              />
            ))}
          </>
        ) : (
          <div className="h-full relative">
            <Loading />
          </div>
        )}
      </div>
    </SwapAnimationWrapper>
  );

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
