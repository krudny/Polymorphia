"use client";

import Loading from "@/components/loading";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import GradeCriteria from "@/components/column-schema/column-component/grading-components/grade/criteria";
import ColumnComponent from "@/components/column-schema/column-component";

export default function Grade() {
  const { state, criteria, isGeneralDataLoading } = useGradingContext();

  const topComponent = () => <h1>Ocena</h1>;
  const loadingComponent = (
    <div className="h-[300px] relative">
      <Loading />
    </div>
  );

  const mainComponent =
    !criteria || isGeneralDataLoading || !state.selectedTarget
      ? () => loadingComponent
      : () => <GradeCriteria criteria={criteria} />;

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
