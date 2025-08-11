import Grading from "@/components/grading/grading";
import StudentList from "@/components/grading/components/student-list/StudentList";
import {useQuery} from "@tanstack/react-query";
import {EventSectionService} from "@/app/(logged-in)/course/EventSectionService";
import Loading from "@/components/loading/Loading";

const HelloWorld = () => {
    return (
        <div className="bg-blue-400 h-fit">
            Hello World
        </div>
    )
}

export default function GradingTestView() {
    const { data: studentsList, isLoading } = useQuery({
        queryKey: ["allUsers", ""],
        queryFn: () => EventSectionService.getRandomPeople(""),
    });

    if (isLoading || !studentsList) {
        return <Loading />;
    }

    return (
        <Grading columns={3} components={[
            <StudentList key="1" students={studentsList} />,
            <HelloWorld key="hello-2" />,
            <HelloWorld key="hello-3" />,
        ]}/>
    )
}