import RankImage from "@/components/hall-of-fame/RankImage";
import RankSummary from "@/components/hall-of-fame/RankSummary";
import RankUserData from "@/components/hall-of-fame/RankUserData";
import RankUserPoints from "@/components/hall-of-fame/RankUserPoints";

export default function RankCard({ position }: { position: number }) {
  const borderColors: Record<1 | 2 | 3, string> = {
    1: "border-amber-400",
    2: "border-slate-400",
    3: "border-amber-800",
  };
  const border = borderColors[position as 1 | 2 | 3] ?? "border-none";

  return (
    <div
      className={`w-full min-h-[calc(25%-1rem)] my-2 flex-col flex justify-between rounded-xl bg-gray-50 shadow-lg border-b-6 p-3 ${border}`}
    >
      <div className="w-full flex lg:px-1">
        <RankImage position={position} />
        <RankUserData />
        <RankSummary />
      </div>
      <div className="w-full">
        <RankUserPoints titleSize={"xs"} xpSize={"sm"} separators={false} />
      </div>
    </div>
  );
}
