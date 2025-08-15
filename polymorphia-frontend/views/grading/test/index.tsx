import Grading from "@/components/grading/grading";
import StudentsList from "@/components/grading/components/student-list";
import Reward from "@/components/grading/components/reward";
import { TestGradingContext } from "@/components/providers/grading/test/TestGradingContext";

export default function TestGradingView() {
  return (
    <Grading
      columns={3}
      components={[
        <StudentsList key="1" context={TestGradingContext} />,
        <Reward key="2" context={TestGradingContext} />,
      ]}
    />
  );
}
