import XPCard from "@/components/xp-card/XPCard";
import "./index.css";
import Loading from "@/components/loading";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import { useScaleShow } from "@/animations/ScaleShow";
import useHallOfFamePodium from "@/hooks/course/hall-of-fame/useHallOfFamePodium";
import useUserContext from "@/hooks/contexts/useUserContext";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import { getDisplayName } from "@/components/hall-of-fame/util/displayName";

export default function HallOfFamePodium() {
  const { data: podium, isLoading } = useHallOfFamePodium();
  const wrapperRef = useScaleShow(!isLoading);
  const { areAnimalNamesVisible } = useHallOfFameContext();
  const { userRole } = useUserContext();

  if (isLoading || !podium) {
    return (
      <div className="hof-loading-wrapper">
        <Loading />
      </div>
    );
  }

  return (
    <div className="hof-podium-desktop" ref={wrapperRef}>
      {podium.map((student, index) => {
        const { evolutionStage, position } = student.userDetails;

        const displayName = getDisplayName(
          student.userDetails,
          userRole,
          areAnimalNamesVisible
        );

        return (
          <div className="hof-podium-item" key={index}>
            <XPCard
              title={displayName}
              subtitle={evolutionStage}
              color={
                position === 1 ? "gold" : position === 2 ? "silver" : "bronze"
              }
              rightComponent={
                <XPCardPoints
                  points={student.xpDetails.total}
                  isSumLabelVisible={true}
                  isXPLabelVisible={false}
                  color="gray"
                />
              }
              size={"hofDesktop"}
            />
          </div>
        );
      })}
    </div>
  );
}
