import StudentInfo from "@/shared/student-info/StudentInfo";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";

export default function ProjectGroup() {
  return (
    <div className="w-full overflow-y-scroll flex flex-col flex-1 gap-y-4">
      <div className="w-full max-w-sm mx-auto py-3 bg-blue-600 mt-14">
        <h1 className="text-6xl">Skład grupy</h1>
        <div className="my-5">
          <StudentInfo />
          <ButtonWithBorder
            text="Edytuj skład grupy"
            className="w-full !border-3 !rounded-lg !py-1 mt-2"
          />
        </div>
      </div>
    </div>
  );
}
