"use client";

import ColumnComponent from "@/components/column-schema/column-component";
import "./index.css";
import LastActivityDetails from "@/components/column-schema/column-component/course-groups/last-activity/details";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import useCourseGroupsContext from "@/hooks/contexts/useCourseGroupsContext";
import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";
import ColumnSwappableComponent from "@/components/column-schema/column-component/shared/column-swappable-component";
import { StudentLastActivityDTO } from "@/interfaces/api/course-groups";

export default function LastActivity() {
  const { isSpecificDataLoading, isSpecificDataError, lastActivities } =
    useCourseGroupsContext();
  const { selectedTarget } = useTargetContext();

  const topComponent = () => <h1>Aktywność</h1>;
  const mainComponent = () => (
    <ColumnSwappableComponent<StudentLastActivityDTO[]>
      data={lastActivities}
      isDataLoading={isSpecificDataLoading}
      isDataError={isSpecificDataError}
      renderComponent={(data, key) => (
        <div key={key} className="last-activity">
          {data.map((lastActivity) => (
            <LastActivityDetails
              key={lastActivity.id}
              lastActivity={lastActivity}
            />
          ))}
        </div>
      )}
      renderDataErrorComponent={() => (
        <ErrorComponent
          message="Nie udało się załadować ostatniej aktywności."
          size={ErrorComponentSizes.COMPACT}
        />
      )}
      renderEmptyDataErrorComponent={() => (
        <ErrorComponent
          title="Brak danych"
          message="Student nie dostał jeszcze żadnych ocen."
          size={ErrorComponentSizes.COMPACT}
        />
      )}
      minHeightClassName="h-full mt-0!"
      selectedTarget={selectedTarget}
    />
  );

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
      hidden={selectedTarget === null}
    />
  );
}
