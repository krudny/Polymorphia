"use client";

import "../../../views/course/grading/index.css";
import GradingComponentWrapper from "@/components/grading-components/grading-wrapper";
import Loading from "@/components/loading";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import useCriteria from "@/hooks/course/useCriteria";
import GradeCriteria from "@/components/grading-components/grade/criteria";

export default function Grade() {
  const { state } = useGradingContext();
  const { data: criteria } = useCriteria();

  const topComponent = <h1>Ocena</h1>;
  const loadingComponent = (
    <div className="h-[300px] relative">
      <Loading />
    </div>
  );

  const mainComponent =
    !criteria || !state.selectedTarget
      ? () => loadingComponent
      : () => <GradeCriteria criteria={criteria} />;

  return (
    <GradingComponentWrapper
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
