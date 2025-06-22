import RankImage from "@/components/hall-of-fame/RankImage";
import RankSummary from "@/components/hall-of-fame/RankSummary";
import RankUserData from "@/components/hall-of-fame/RankUserData";
import UserPoints from "@/components/general/UserPoints";
import "../../styles/hall-of-fame.css";

export default function RankCardDesktop({ userDetails, xpDetails }) {
  return (
    <div className="hall-of-fame-desktop-record-wrapper">
      <div className="hall-of-fame-desktop-record-user-data-wrapper">
        <RankImage position={userDetails.position} imageUrl={userDetails.imageUrl}  />
        <RankUserData userDetails={userDetails} />
      </div>
      <div className="hall-of-fame-desktop-record-user-points-wrapper">
        <UserPoints titleSize={"sm"} xpSize={"md"} separators={false} xpDetails={xpDetails} />
      </div>
      <RankSummary total={xpDetails.total} />
    </div>
  );
}
