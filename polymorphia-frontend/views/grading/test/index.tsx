import Grading from "@/components/grading/grading";
import StudentsList from "@/components/grading/components/student-list";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import Loading from "@/components/loading/Loading";
import Reward from "@/components/grading/components/reward";

export default function TestGradingView() {
  const { data: studentsList, isLoading } = useQuery({
    queryKey: ["allUsers", ""],
    queryFn: () => EventSectionService.getRandomPeople(""),
  });

  if (isLoading || !studentsList) {
    return <Loading />;
  }

  return (
    <Grading
      columns={3}
      components={[
        <StudentsList key="1" students={studentsList} />,
        <Reward
          key="2"
          criteria={[
            { id: 1, name: "Punkty doświadczenia", maxXP: 4 },
            {
              id: 2,
              name: "Punkty doświadczenia",
              maxXP: 4,
            },
          ]}
        />,
      ]}
    />
  );
}
