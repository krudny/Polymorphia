import XPCard from "@/components/xp-card/XPCard";
import "./index.css";
import Loading from "@/components/loading";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import { useScaleShow } from "@/animations/ScaleShow";
import useHallOfFamePodium from "@/hooks/course/useHallOfFamePodium";

export default function HallOfFamePodium() {
  const { data: podium, isLoading } = useHallOfFamePodium();
  const wrapperRef = useScaleShow(!isLoading);

  if (isLoading || !podium) {
    return (
      <div className="hall-of-fame-loading-wrapper">
        <Loading />
      </div>
    );
  }

  return (
    <div className="hall-of-fame-desktop-podium" ref={wrapperRef}>
      {podium.map((student, index) => {
        const { animalName, evolutionStage, position } = student.userDetails;

        return (
          <div className="hall-of-fame-podium" key={index}>
            <XPCard
              title={animalName}
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
