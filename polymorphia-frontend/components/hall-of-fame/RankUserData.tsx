import "../../styles/hall-of-fame.css";
import { UserDetailsDTO } from "@/interfaces/api/DTO";

export default function RankUserData({
  animalName,
  evolutionStage,
  group,
}: UserDetailsDTO) {
  return (
    <div className="hall-of-fame-user-data">
      <h1>{animalName}</h1>
      <h2>
        {group} | {evolutionStage}
      </h2>
    </div>
  );
}
