import GradingComponentWrapper from "@/components/grading-components/grading-wrapper";
import "../../../views/course/grading/index.css";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import useSubmissionRequirements from "@/hooks/course/useSubmissionRequirements";
import Loading from "@/components/loading";
import SubmissionRequirement from "@/components/grading-components/submission/requirement";

export default function Submissions() {
  const { state } = useGradingContext();
  const { data: submissionRequirements } = useSubmissionRequirements();

  const topComponent = <h1>Oddane zadania</h1>;
  const loadingComponent = (
    <div className="h-[300px] relative">
      <Loading />
    </div>
  );

  const mainComponent =
    !submissionRequirements || !state.selectedTarget
      ? () => loadingComponent
      : () => <SubmissionRequirement requirements={submissionRequirements} />;

  return (
    <GradingComponentWrapper
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
