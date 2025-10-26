import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import "./index.css";
import { Fragment } from "react";
import { TargetTypes } from "@/interfaces/api/grade/target";
import ColumnComponent from "@/components/column-schema/column-component";
import useGradingTargets from "@/hooks/course/useGradingTargets";
import Loading from "@/components/loading";
import TargetListTopBar from "@/components/column-schema/column-component/shared/target-list/top-bar";
import useCourseGroupsContext from "@/hooks/contexts/useCourseGroupsContext";

export default function TargetListCourseGroups() {
  const { search, setSearch, setAreFiltersOpen } = useCourseGroupsContext();
  const { data: targets, isLoading: isTargetsLoading } = useGradingTargets(
    "",
    [],
    [],
    [],
    []
  );

  const topComponent = () => (
    <TargetListTopBar
      search={search}
      setSearch={setSearch}
      setAreFiltersOpen={setAreFiltersOpen}
    />
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
