import RankImage from "@/components/hall-of-fame/RankImage";
import RankSummary from "@/components/hall-of-fame/RankSummary";
import RankUserData from "@/components/hall-of-fame/RankUserData";
import RankUserPoints from "@/components/hall-of-fame/RankUserPoints";
import { useMediaQuery } from "react-responsive";

export default function RankCardDesktop({ position }: { position: number }) {
  const isLarge = useMediaQuery({ minWidth: 1400 });

  return (
    <div className="w-full min-h-[calc(25%-1rem)] my-2 flex justify-between rounded-xl bg-neutral-100 shadow-lg ">
      <RankImage position={position} />
      <RankUserData />
      <div className="w-full min-w-[320px] xl:max-w-[350px] 2xl:max-w-[500px]">
        <RankUserPoints
          titleSize={"sm"}
          xpSize={isLarge ? "md" : "sm"}
          separators={false}
        />
      </div>
      <RankSummary />
    </div>
  );
}
