import RankImage from "@/components/hall-of-fame/RankImage";
import RankSummary from "@/components/hall-of-fame/RankSummary";
import RankUserData from "@/components/hall-of-fame/RankUserData";
import UserPoints from "@/components/general/UserPoints";
import "../../styles/hall-of-fame.css";
import { HallOfFameRecordDTO } from "@/interfaces/api/DTO";
import {
  filterXpDetails,
  getAllFilters,
} from "@/services/hall-of-fame/Helpers";
import { HallOfFameContext } from "@/components/providers/HallOfFameContext";
import { useContext } from "react";

export default function RankCardDesktop({
  userDetails,
  xpDetails,
}: HallOfFameRecordDTO) {
  const { filtersState } = useContext(HallOfFameContext);
  const { rankingOptionsFilter } = getAllFilters(filtersState);

  const filteredXpDetails = filterXpDetails(xpDetails, rankingOptionsFilter);

  return (
    <div className="hall-of-fame-desktop-record-wrapper">
      <div className="hall-of-fame-desktop-record-user-data-wrapper">
        <RankImage
          position={userDetails.position}
          imageUrl={userDetails.imageUrl}
        />
        <RankUserData {...userDetails} />
      </div>
      <div className="hall-of-fame-desktop-record-user-points-wrapper">
        <UserPoints
          titleSize={"sm"}
          xpSize={"md"}
          separators={false}
          xpDetails={filteredXpDetails}
        />
      </div>
      <RankSummary total={xpDetails.total} />
    </div>
  );
}
