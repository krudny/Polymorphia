import useGradingContext from "@/hooks/contexts/useGradingContext";
import Loading from "@/components/loading";
import SubmissionRequirement from "@/components/column-schema/column-component/grading-components/submission/requirement";
import ColumnComponent from "@/components/column-schema/column-component";

export default function Submissions() {
  const { state, submissionRequirements, isGeneralDataLoading } =
    useGradingContext();

  const topComponent = () => <h1>Oddane zadania</h1>;
  const loadingComponent = (
    <div className="h-[300px] relative">
      <Loading />
    </div>
  );

  const mainComponent =
    !submissionRequirements || isGeneralDataLoading || !state.selectedTarget
      ? () => loadingComponent
      : () => <SubmissionRequirement requirements={submissionRequirements} />;

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
