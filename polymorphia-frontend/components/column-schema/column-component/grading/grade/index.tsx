"use client";

import Loading from "@/components/loading";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import GradeCriteria from "@/components/column-schema/column-component/grading/grade/criteria";
import ColumnComponent from "@/components/column-schema/column-component";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";

export default function Grade() {
  const { criteria, isGeneralDataLoading, isGeneralDataError } =
    useGradingContext();
  const { state: targetState } = useTargetContext();

  const topComponent = () => <h1>Ocena</h1>;
  const loadingComponent = (
    <div className="h-[300px] relative">
      <Loading />
    </div>
  );
  const errorComponent = (
    <div className="h-[300px] relative">
      <ErrorComponent
        message="Nie udało się załadować kryteriów oceny."
        size={ErrorComponentSizes.COMPACT}
      />
    </div>
  );

  const noCriteriaErrorComponent = (
    <div className="h-[300px] relative">
      <ErrorComponent
        title="Brak kryteriów"
        message="To zadanie nie posiada kryteriów oceny."
        size={ErrorComponentSizes.COMPACT}
      />
    </div>
  );

  const mainComponent = isGeneralDataLoading
    ? () => loadingComponent
    : !criteria || isGeneralDataError
      ? () => errorComponent
      : criteria.length === 0
        ? () => noCriteriaErrorComponent
        : () => <GradeCriteria criteria={criteria} />;

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
      hidden={targetState.selectedTarget === null}
    />
  );
}
