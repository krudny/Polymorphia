import useGradingContext from "@/hooks/contexts/useGradingContext";
import { TargetProvider } from "@/providers/target";
import TargetList from "@/components/column-schema/column-component/shared/target-list";

export default function TargetListGradingWrapper() {
  const { filters } = useGradingContext();

  const sortBy = filters.getAppliedFilterValues("sortBy") ?? ["total"];
  const sortOrder = filters.getAppliedFilterValues("sortOrder") ?? ["asc"];
  const groups = filters.getAppliedFilterValues("groups") ?? ["all"];
  const gradeStatus = filters.getAppliedFilterValues("gradeStatus") ?? ["all"];

  return (
    <TargetProvider
      targetsParams={{
        sortBy,
        sortOrder,
        groups,
        gradeStatus,
      }}
    >
      <TargetList />
    </TargetProvider>
  );
}
