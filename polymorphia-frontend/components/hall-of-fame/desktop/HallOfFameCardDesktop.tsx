import HallOfFameImage from "@/components/hall-of-fame/general/HallOfFameImage";
import HallOfFamePointsSummary from "@/components/hall-of-fame/general/HallOfFamePointsSummary";
import HallOfFameUserData from "@/components/hall-of-fame/general/HallOfFameUserData";
import UserPoints from "@/components/user-points/UserPoints";
import "./index.css";
import { HallOfFameRecordDTO } from "@/interfaces/api/hall-of-fame";
import { filterXpDetails } from "@/components/providers/hall-of-fame/utils/filterXpDetails";
import { getAllFilters } from "@/components/providers/hall-of-fame/utils/getAllFilters";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";

export default function HallOfFameCardDesktop({
                                                userDetails,
                                                xpDetails,
                                              }: HallOfFameRecordDTO) {
  const { appliedFiltersState, areFiltersReady } = useHallOfFameContext();

  if (!areFiltersReady) {
    return null;
  }

  const { rankingOptionsFilter } = getAllFilters(appliedFiltersState);
  const filteredXpDetails = filterXpDetails(xpDetails, rankingOptionsFilter);

  return (
    <div className="hall-of-fame-desktop-record-wrapper">
      <div className="hall-of-fame-desktop-record-user-data-wrapper">
        <HallOfFameImage
          position={userDetails.position}
          imageUrl={userDetails.imageUrl}
        />
        <HallOfFameUserData {...userDetails} />
      </div>
      <div className="hall-of-fame-desktop-record-user-points-wrapper">
        <UserPoints
          titleSize={"sm"}
          xpSize={"md"}
          separators={false}
          xpDetails={filteredXpDetails}
        />
      </div>
      <HallOfFamePointsSummary total={xpDetails.total} />
    </div>
  );
}
