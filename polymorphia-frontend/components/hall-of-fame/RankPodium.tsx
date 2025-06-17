import XPCard from "@/components/xp-card/XPCard";
import "../../styles/hall-of-fame.css";

export default function RankPodium({ position, userDetails: {animalName, evolutionStage}, xpDetails: {total} }: { position: 1 | 2 | 3 }) {
  return (
    <div className="hall-of-fame-podium">
      <XPCard
        title={animalName}
        subtitle={evolutionStage}
        color={position === 1 ? "gold" : position === 2 ? "silver" : "bronze"}
        xp={total}
        size={"hofDesktop"}
      />
    </div>
  );
}
