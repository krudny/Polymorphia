import { StudentListProps } from "@/components/grading/components/student-list/types";
import XPCard from "@/components/xp-card/XPCard";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import { API_STATIC_URL } from "@/services/api";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";

export default function StudentsList({ students }: StudentListProps) {
  return (
    <div className="w-full overflow-y-hidden flex flex-col flex-1 gap-y-4 bg-yellow-300">
      <div className="w-full max-w-sm mx-auto bg-green-600">
        <ButtonWithBorder
          text="Filtry"
          className="!mx-0 !py-0 !border-0 !border-b-2 !align-self-start"
        />
      </div>
      <div className="overflow-y-scroll w-full bg-red-400 py-4 custom-scrollbar">
        {students.map((student, index) => (
          <div
            key={index}
            className="max-w-sm mx-auto my-3 first:mt-0 last:mb-0"
          >
            <XPCard
              key={index}
              image={{
                url: `${API_STATIC_URL}/${student.imageUrl}`,
                alt: student.evolutionStage,
              }}
              title={student.studentName}
              color={"green"}
              subtitle={student.group}
              size={"xs"}
              rightComponent={
                <XPCardPoints
                  points={(Math.random() * 2.6 + 0.3).toFixed(1)}
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
