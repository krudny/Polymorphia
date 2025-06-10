import RankImage from "@/components/hall-of-fame/RankImage";
import RankSummary from "@/components/hall-of-fame/RankSummary";
import RankUserData from "@/components/hall-of-fame/RankUserData";
import RankUserPoints from "@/components/hall-of-fame/RankUserPoints";
import { useMediaQuery } from "react-responsive";

export default function RankCardDesktop({ position }: { position: number }) {
  const isLarge = useMediaQuery({ minWidth: 1400 });

  return (
    <div className="w-full 2xl:min-h-[calc(25%-1rem)] h-28 my-2 flex justify-between items-center rounded-xl bg-pink-400 bg-neutral-100 shadow-lg ">
      <div className="flex h-full truncate w-2/5 bg-purple-700">
        <RankImage position={position} />
        <RankUserData />
      </div>
      <div className="w-full min-w-[350px] lg:max-w-[380px] 2xl:max-w-[500px]">
        <RankUserPoints
          titleSize={"sm"}
          xpSize={isLarge ? "md" : "md"}
          separators={false}
        />
      </div>
      <RankSummary />
    </div>
  );
}
