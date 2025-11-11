"use client";

import ColumnComponent from "@/components/column-schema/column-component";
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
import ErrorComponent from "@/components/error";

export default function LastActivity() {
  const { isSpecificDataLoading, isSpecificDataError, lastActivities } =
    useCourseGroupsContext();
  const { selectedTarget } = useTargetContext();

  const topComponent = () => <h1>Aktywność</h1>;
  const mainComponent = () => (
    <SwapAnimationWrapper
      {...baseSwapAnimationWrapperProps}
      keyProp={
        lastActivities && !isSpecificDataLoading && !isSpecificDataError
          ? getKeyForSelectedTarget(selectedTarget)
          : (isSpecificDataLoading ? "loading" : "error") +
            getKeyForSelectedTarget(selectedTarget)
      }
    >
      <div className="last-activity">
        {lastActivities && !isSpecificDataLoading && !isSpecificDataError ? (
          <>
            {lastActivities.map((lastActivity) => (
              <LastActivityDetails
                key={lastActivity.id}
                lastActivity={lastActivity}
              />
            ))}
          </>
        ) : isSpecificDataLoading ? (
          <div className="h-full relative">
            <Loading />
          </div>
        ) : (
          <div className="h-full relative">
            <ErrorComponent message="Nie udało się załadować ostatniej aktywności." />
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
