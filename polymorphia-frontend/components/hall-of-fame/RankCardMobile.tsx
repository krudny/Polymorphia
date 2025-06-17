import RankImage from "@/components/hall-of-fame/RankImage";
import RankSummary from "@/components/hall-of-fame/RankSummary";
import RankUserData from "@/components/hall-of-fame/RankUserData";
import RankUserPoints from "@/components/hall-of-fame/RankUserPoints";
import "../../styles/hall-of-fame.css";

export default function RankCard({ position }: { position: number }) {
  const borderColors: Record<1 | 2 | 3, string> = {
    1: "border-amber-400",
    2: "border-slate-400",
    3: "border-amber-800",
  };
  const border = borderColors[position as 1 | 2 | 3] ?? "border-none";

  return (
    <div className={`hall-of-fame-mobile-record-wrapper ${border}`}>
      <div>
        <RankImage position={position} />
        <RankUserData />
        <RankSummary />
      </div>
      <div>
        <RankUserPoints titleSize={"xs"} xpSize={"sm"} separators={false} />
      </div>
    </div>
  );
}
