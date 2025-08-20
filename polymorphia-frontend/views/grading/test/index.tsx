import Grading from "@/components/grading/grading";
import StudentsList from "@/components/grading/components/student-list";
import Reward from "@/components/grading/components/reward";
import { GradingContext } from "@/components/providers/grading/GradingContext";
import { GradingTypes } from "@/components/grading/types";

export default function TestGradingView() {
  return (
    <Grading
      gradingType={GradingTypes.TEST_GRADING}
      columns={3}
      components={[
        <StudentsList key="1" context={GradingContext} />,
        <Reward key="2" context={GradingContext} />,
      ]}
    />
  );
}
