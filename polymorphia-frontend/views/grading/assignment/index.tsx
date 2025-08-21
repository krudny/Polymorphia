import Grading from "@/components/grading/grading";
import StudentsList from "@/components/grading/components/student-list";
import Reward from "@/components/grading/components/reward";
import PullRequest from "@/components/grading/components/pull-request";
import { GradingTypes } from "@/components/grading/types";

export default function AssignmentGradingView() {
  return (
    <>
      <Grading
        gradingType={GradingTypes.ASSIGNMENT_GRADING}
        columns={3}
        components={[
          <StudentsList key="1" />,
          <Reward key="2" />,
          <PullRequest
            key="3"
            pullRequests={[
              {
                id: 1,
                name: "Laboratorium",
                url: "https://github.com/krudny/Polymorphia/pull/32",
              },
              {
                id: 2,
                name: "Zadanie dodatkowe",
                url: "https://github.com/krudny/Polymorphia/pull/32",
              },
            ]}
          />,
        ]}
      />
    </>
  );
}
