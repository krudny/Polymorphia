import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import Search from "@/components/search";
import "./index.css";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { TargetTypes } from "@/interfaces/api/grade/target";
import ColumnComponent from "@/components/column-schema/column-component";
import useGradingTargets from "@/hooks/course/useGradingTargets";
import Loading from "@/components/loading";

export default function TargetListCourseGroups() {
  const isMd = useMediaQuery({ minWidth: "786px" });
  const { data: targets, isLoading: isTargetsLoading } = useGradingTargets(
    "",
    [],
    [],
    [],
    []
  );

  const topComponent = () => (
    <div className="grading-search-wrapper">
      <Search search="" setSearch={() => {}} placeholder="Szukaj studenta..." />
      <ButtonWithBorder
        text="Filtry"
        size={isMd ? "md" : "sm"}
        className="!mx-0 !py-0 !border-0 !border-b-2 !rounded-none"
        onClick={() => {}}
      />
    </div>
  );

  const mainComponent =
    isTargetsLoading || !targets
      ? () => (
          <div className="target-list-loading">
            <Loading />
          </div>
        )
      : () => (
          <div className="group-list custom-scrollbar">
            {targets.map((target, index) => (
              <Fragment key={index}>
                <div className="group-record">
                  {(target.type === TargetTypes.STUDENT
                    ? [target]
                    : target.members
                  ).map((student, index) => {
                    return (
                      <XPCard
                        key={index}
                        title={student.fullName}
                        color="green"
                        subtitle={student.group}
                        size={"xs"}
                        leftComponent={
                          <XPCardImage
                            imageUrl={student.imageUrl}
                            alt={student.evolutionStage}
                          />
                        }
                        rightComponent={
                          <XPCardPoints
                            points={student.gainedXp}
                            color="green"
                            isSumLabelVisible={true}
                            isXPLabelVisible={!!student.gainedXp}
                          />
                        }
                      />
                    );
                  })}
                </div>
              </Fragment>
            ))}
          </div>
        );

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
