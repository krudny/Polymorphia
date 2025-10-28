"use client";

import Loading from "@/components/loading";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import GradeCriteria from "@/components/column-schema/column-component/grading/grade/criteria";
import ColumnComponent from "@/components/column-schema/column-component";
import useTargetContext from "@/hooks/contexts/useTargetContext";

export default function Grade() {
  const { criteria, isGeneralDataLoading } = useGradingContext();
  const { state: targetState } = useTargetContext();

  const topComponent = () => <h1>Ocena</h1>;
  const loadingComponent = (
    <div className="h-[300px] relative">
      <Loading />
    </div>
  );

  const mainComponent =
    !criteria || isGeneralDataLoading || !targetState.selectedTarget
      ? () => loadingComponent
      : () => <GradeCriteria criteria={criteria} />;

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
