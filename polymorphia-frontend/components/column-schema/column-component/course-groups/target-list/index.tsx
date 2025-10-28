import { TargetProvider } from "@/providers/target";
import TargetList from "@/components/column-schema/column-component/shared/target-list";

export default function TargetListCourseGroupsWrapper() {
  return (
    <TargetProvider targetsParams={{}}>
      <TargetList />
    </TargetProvider>
  );
}
