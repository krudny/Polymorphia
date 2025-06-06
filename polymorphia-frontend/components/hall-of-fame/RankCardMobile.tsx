import RankImage from "@/components/hall-of-fame/RankImage";
import RankSummary from "@/components/hall-of-fame/RankSummary";
import RankUserData from "@/components/hall-of-fame/RankUserData";
import RankUserPoints from "@/components/hall-of-fame/RankUserPoints";

export default function RankCard() {
  return (
    <div className="w-full min-h-[calc(25%-1rem)] my-2 flex-col flex justify-between rounded-xl bg-gray-50 shadow-lg ">
      <RankImage />
      <div className="w-full flex mt-4 px-5">
        <RankUserData />
        <RankSummary />
      </div>
      <div className="w-full">
        <RankUserPoints titleSize={"xs"} xpSize={"sm"} separators={false} />
      </div>
    </div>
  );
}
