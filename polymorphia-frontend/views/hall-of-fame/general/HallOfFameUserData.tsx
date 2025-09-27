import "./index.css";
import { StudentDetailsDTOWithNullableName } from "@/interfaces/api/user";

export default function HallOfFameUserData(
  studentDetails: StudentDetailsDTOWithNullableName
) {
  return (
    <div className="hall-of-fame-user-data">
      <h1>{studentDetails.animalName}</h1>
      <h2>
        {studentDetails.group} | {studentDetails.evolutionStage}
      </h2>
    </div>
  );
}
