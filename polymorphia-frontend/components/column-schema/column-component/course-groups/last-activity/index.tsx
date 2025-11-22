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
import { ErrorComponentSizes } from "@/components/error/types";

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
        {isSpecificDataLoading ? (
          <div className="h-full relative">
            <Loading />
          </div>
        ) : isSpecificDataError ? (
          <div className="h-full relative">
            <ErrorComponent
              message="Nie udało się załadować ostatniej aktywności."
              size={ErrorComponentSizes.COMPACT}
            />
          </div>
        ) : lastActivities && lastActivities.length > 0 ? (
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
            <ErrorComponent
              title="Brak danych"
              message="Student nie dostał jeszcze żadnych ocen."
              size={ErrorComponentSizes.COMPACT}
            />
          </div>
        )}
      </div>
    </SwapAnimationWrapper>
  );

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
      hidden={selectedTarget === null}
    />
  );
}
