import RankImage from "@/components/hall-of-fame/RankImage";
import RankSummary from "@/components/hall-of-fame/RankSummary";
import RankPosition from "@/components/hall-of-fame/RankPosition";
import RankUserData from "@/components/hall-of-fame/RankUserData";
import RankUserPoints from "@/components/hall-of-fame/RankUserPoints";


export default function RankCard() {
    return (
        <div className="w-full min-h-[calc(25%-1rem)] my-2 flex justify-between rounded-xl bg-gray-50 shadow-lg">
            <RankImage />
            <RankPosition />
            <div className="w-2/5">
                <RankUserData />
            </div>
            <div className="w-3/5 min-w-[320px]">
                <RankUserPoints
                    titleSize={"sm"}
                    xpSize={"md"}
                    separators={false}
                />
            </div>
            <RankSummary />
        </div>
    )
}