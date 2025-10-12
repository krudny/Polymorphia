import "./index.css";
import { HallOfFameUserDTO } from "@/interfaces/api/user";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import useUserContext from "@/hooks/contexts/useUserContext";
import { getDisplayName } from "@/views/hall-of-fame/util/displayName";

export default function HallOfFameUserData(studentDetails: HallOfFameUserDTO) {
  const { areAnimalNamesVisible } = useHallOfFameContext();
  const { userRole } = useUserContext();

  const displayName = getDisplayName(
    studentDetails,
    userRole,
    areAnimalNamesVisible
  );

  return (
    <div className="hall-of-fame-user-data">
      <h1>{displayName}</h1>
      <h2>
        {studentDetails.group} | {studentDetails.evolutionStage}
      </h2>
    </div>
  );
}
