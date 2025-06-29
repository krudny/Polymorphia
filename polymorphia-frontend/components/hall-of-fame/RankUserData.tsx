import "../../styles/hall-of-fame.css";

export default function RankUserData({
  userDetails: { animalName, evolutionStage, group },
}) {
  return (
    <div className="hall-of-fame-user-data">
      <h1>{animalName}</h1>
      <h2>
        {group} | {evolutionStage}
      </h2>
    </div>
  );
}
