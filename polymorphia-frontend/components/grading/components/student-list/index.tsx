import { StudentListProps } from "@/components/grading/components/student-list/types";
import XPCard from "@/components/xp-card/XPCard";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import Search from "@/components/search";
import { useContext } from "react";

export default function StudentsList({ context }: StudentListProps) {
  const {
    search,
    setSearch,
    studentList: students,
    selectedStudent,
    setSelectedStudent,
  } = useContext(context);

  return (
    <div className="w-full overflow-y-hidden flex flex-col flex-1 gap-y-4 bg-yellow-300">
      <div className="w-full flex justify-between max-w-[25rem] mx-auto min-h-12 bg-green-600">
        <Search
          search={search}
          setSearch={setSearch}
          placeholder="Szukaj studenta..."
        />
        <ButtonWithBorder
          text="Filtry"
          className="!mx-0 !py-0 !border-0 !border-b-2 !align-self-start"
        />
      </div>
      <div className="overflow-y-scroll w-full bg-red-400 py-4 custom-scrollbar">
        {students.map((student, index) => (
          <div
            key={index}
            className="max-w-[25rem] mx-auto my-3 first:mt-0 last:mb-0"
            onClick={() => setSelectedStudent(student)}
          >
            <XPCard
              key={index}
              title={student.studentName}
              color={student === selectedStudent ? "sky" : "green"}
              subtitle={student.group}
              size={"xs"}
              leftComponent={
                <XPCardImage
                  imageUrl={student.imageUrl}
                  alt={student.evolutionStage}
                />
              }
              rightComponent={
                <XPCardPoints
                  points={student.gainedXp}
                  color={
                    student === selectedStudent
                      ? "bg-sky-100"
                      : "bg-secondary-gray"
                  }
                  isSumLabelVisible={true}
                />
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
