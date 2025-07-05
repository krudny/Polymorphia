import RankImage from "@/components/hall-of-fame/RankImage";
import RankSummary from "@/components/hall-of-fame/RankSummary";
import RankUserData from "@/components/hall-of-fame/RankUserData";
import UserPoints from "@/components/general/UserPoints";
import "../../styles/hall-of-fame.css";
import {HallOfFameRecordDTO} from "@/interfaces/api/DTO";
import {filterXpDetails, getAllFilters} from "@/services/hall-of-fame/Helpers";
import {useContext} from "react";
import {HallOfFameContext} from "@/components/providers/HallOfFameContext";

export default function RankCard({
                                     userDetails,
                                     xpDetails,
                                 }: HallOfFameRecordDTO) {
  const borderColors: Record<1 | 2 | 3, string> = {
    1: "border-amber-400",
    2: "border-slate-400",
    3: "border-amber-800",
  };
  const border = borderColors[userDetails.position as 1 | 2 | 3] ?? "border-none";
    const { filtersState } = useContext(HallOfFameContext);
    const { rankingOptionsFilter } = getAllFilters(filtersState);
  const filteredXpDetails = filterXpDetails(xpDetails, rankingOptionsFilter);

  return (
    <div className={`hall-of-fame-mobile-record-wrapper ${border}`}>
      <div>
          <RankImage
              position={userDetails.position}
              imageUrl={userDetails.imageUrl}
          />
          <RankUserData {...userDetails} />
          <RankSummary total={xpDetails.total} />
      </div>
      <div>
          <UserPoints
              titleSize={"xs"}
              xpSize={"sm"}
              separators={false}
              xpDetails={filteredXpDetails}
          />
      </div>
    </div>
  );
}
