import RankImage from "@/app/(logged-in)/test/RankImage";
import RankSummary from "@/app/(logged-in)/test/RankSummary";
import RankPosition from "@/app/(logged-in)/test/RankPosition";
import RankUserData from "@/app/(logged-in)/test/RankUserData";
import RankUserPoints from "@/app/(logged-in)/test/RankUserPoints";


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