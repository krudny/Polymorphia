import useGradingContext from "@/hooks/contexts/useGradingContext";
import Loading from "@/components/loading";
import SubmissionRequirement from "@/components/column-schema/column-component/grading/submission/requirement";
import ColumnComponent from "@/components/column-schema/column-component";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";

export default function Submissions() {
  const { submissionRequirements, isGeneralDataLoading, isGeneralDataError } =
    useGradingContext();
  const { state: targetState } = useTargetContext();

  const topComponent = () => <h1>Oddane zadania</h1>;
  const loadingComponent = (
    <div className="h-[300px] relative">
      <Loading />
    </div>
  );
  const errorComponent = (
    <div className="h-[300px] relative">
      <ErrorComponent
        message="Nie udało się załadować wymagań."
        size={ErrorComponentSizes.COMPACT}
      />
    </div>
  );

  const mainComponent = isGeneralDataError
    ? () => errorComponent
    : !submissionRequirements ||
        isGeneralDataLoading ||
        !targetState.selectedTarget
      ? () => loadingComponent
      : () => <SubmissionRequirement requirements={submissionRequirements} />;

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
      hidden={targetState.selectedTarget === null}
    />
  );
}
