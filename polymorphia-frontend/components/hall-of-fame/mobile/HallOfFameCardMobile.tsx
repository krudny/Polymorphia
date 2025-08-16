import HallOfFameImage from "@/components/hall-of-fame/general/HallOfFameImage";
import HallOfFamePointsSummary from "@/components/hall-of-fame/general/HallOfFamePointsSummary";
import HallOfFameUserData from "@/components/hall-of-fame/general/HallOfFameUserData";
import UserPoints from "@/components/user-points/UserPoints";
import "./index.css";
import { HallOfFameRecordDTO } from "@/interfaces/api/hall-of-fame";
import { useContext } from "react";
import { HallOfFameContext } from "@/components/providers/hall-of-fame/HallOfFameContext";
import { getAllFilters } from "@/components/providers/hall-of-fame/utils/getAllFilters";
import { filterXpDetails } from "@/components/providers/hall-of-fame/utils/filterXpDetails";

export default function RankCard({
  userDetails,
  xpDetails,
}: HallOfFameRecordDTO) {
  const borderColors: Record<1 | 2 | 3, string> = {
    1: "border-amber-400",
    2: "border-slate-400",
    3: "border-amber-800",
  };
  const border =
    borderColors[userDetails.position as 1 | 2 | 3] ?? "border-none";
  const { appliedFiltersState } = useContext(HallOfFameContext);
  const { rankingOptionsFilter } = getAllFilters(appliedFiltersState);
  const filteredXpDetails = filterXpDetails(xpDetails, rankingOptionsFilter);

  return (
    <div className={`hall-of-fame-mobile-record-wrapper ${border}`}>
      <div>
        <HallOfFameImage
          position={userDetails.position}
          imageUrl={userDetails.imageUrl}
        />
        <HallOfFameUserData {...userDetails} />
        <HallOfFamePointsSummary total={xpDetails.total} />
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
