import XPCard from "@/components/xp-card/XPCard";
import "../../styles/hall-of-fame.css"

export default function RankPodium({ position }: { position: 1 | 2 | 3 }) {
  return (
    <div className="hall-of-fame-podium">
      <XPCard
        title="Gerard Małoduszny"
        subtitle="Majestatyczna Bestia"
        color={position === 1 ? "gold" : position === 2 ? "silver" : "bronze"}
        xp="128.9"
        size={"hofDesktop"}
      />
    </div>
  );
}
