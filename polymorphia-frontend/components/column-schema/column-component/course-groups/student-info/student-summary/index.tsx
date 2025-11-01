import Image from "next/image";
import { API_STATIC_URL } from "@/services/api";
import ProfileProgressBar from "@/components/progressbar/profile";
import "./index.css";
import StudentSummaryProps from "@/components/column-schema/column-component/course-groups/student-info/student-summary/types";

export default function StudentSummary({
  studentSummary,
}: StudentSummaryProps) {
  const {
    studentName,
    animalName,
    position,
    totalStudentsInCourse,
    leftEvolutionStage,
    rightEvolutionStage,
    imageUrl,
  } = studentSummary;

  return (
    <div className="course-group-student-summary">
      <div className="course-group-student-summary-wrapper">
        <div className="course-group-student-summary-image">
          <Image
            src={`${API_STATIC_URL}/${imageUrl}`}
            alt="Zwierzak użytkownika"
            fill
            priority
            fetchPriority="high"
            className="object-cover rounded-lg"
          />
        </div>
        <div className="course-group-student-summary-details">
          <h3>{studentName}</h3>
          <h4>{animalName}</h4>
          <h5>
            {position} na {totalStudentsInCourse} osoby w kursie
          </h5>
        </div>
      </div>
      <div className="course-group-student-summary-progress-bar">
        <ProfileProgressBar
          totalXp={86.8}
          maxPoints={100}
          evolutionStages={[leftEvolutionStage, rightEvolutionStage]}
          numSquares={2}
          segmentSizes={[0, 100, 0]}
          size="md"
        />
      </div>
    </div>
  );
}
