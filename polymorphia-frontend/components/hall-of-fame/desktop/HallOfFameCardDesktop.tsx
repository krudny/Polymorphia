import HallOfFameImage from "@/components/hall-of-fame/general/HallOfFameImage";
import HallOfFamePointsSummary from "@/components/hall-of-fame/general/HallOfFamePointsSummary";
import HallOfFameUserData from "@/components/hall-of-fame/general/HallOfFameUserData";
import UserPoints from "@/components/user-points/UserPoints";
import "./index.css";
import { HallOfFameRecordDTO } from "@/interfaces/api/hall-of-fame";
import { filterXpDetails } from "@/components/providers/hall-of-fame/utils/filterXpDetails";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";

export default function HallOfFameCardDesktop({
  userDetails,
  xpDetails,
}: HallOfFameRecordDTO) {
  const { filters, isFiltersLoading, isFiltersError } = useHallOfFameContext();

  if (isFiltersLoading || isFiltersError) {
    return null;
  }

  const filteredXpDetails = filterXpDetails(
    xpDetails,
    filters.configs.find((config) => config.id === "rankingOptions"),
    filters.getAppliedFilterValues
  );

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
