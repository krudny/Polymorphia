import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import "./index.css";
import { Fragment } from "react";
import { GradingReducerActions } from "@/providers/grading/gradingReducer/types";
import { TargetTypes } from "@/interfaces/api/grade/target";
import Loading from "@/components/loading";
import areTargetsEqual from "@/providers/grading/utils/areTargetsEqual";
import ColumnComponent from "@/components/column-schema/column-component";
import TargetListTopBar from "@/components/column-schema/column-component/shared/target-list/top-bar";

export default function TargetList() {
  const {
    state,
    dispatch,
    search,
    setSearch,
    targets,
    isGeneralDataLoading,
    setAreFiltersOpen,
  } = useGradingContext();
  const { selectedTarget } = state;

  const topComponent = () => (
    <TargetListTopBar
      search={search}
      setSearch={setSearch}
      setAreFiltersOpen={setAreFiltersOpen}
    />
  );

  const mainComponent =
    isGeneralDataLoading || !targets
      ? () => (
          <div className="target-list-loading">
            <Loading />
          </div>
        )
      : () => (
          <div className="group-list">
            {targets.map((target, index) => (
              <Fragment key={index}>
                <div className="group-record">
                  {(target.type === TargetTypes.STUDENT
                    ? [target]
                    : target.members
                  ).map((student, index) => {
                    // Handles entire group selection or student selection when targets are TargetType.STUDENT.
                    const isTargetMatchingSelectedTarget = areTargetsEqual(
                      selectedTarget,
                      target
                    );

                    // Handles selection of one student in the group
                    const isStudentSelectedFromGroup =
                      selectedTarget?.type === TargetTypes.STUDENT &&
                      selectedTarget.id === student.id;

                    const isSelected =
                      isTargetMatchingSelectedTarget ||
                      isStudentSelectedFromGroup;

                    const color = isSelected
                      ? student.gainedXp
                        ? "green"
                        : "sky"
                      : "gray";

                    const handleSelection = () => {
                      dispatch({
                        type: GradingReducerActions.HANDLE_STUDENT_SELECTION,
                        payload: {
                          target,
                          member: student,
                        },
                      });
                    };

                    return (
                      <XPCard
                        key={index}
                        title={student.fullName}
                        color={color}
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
                            color={color}
                            isSumLabelVisible={true}
                            isXPLabelVisible={!!student.gainedXp}
                          />
                        }
                        onClick={handleSelection}
                      />
                    );
                  })}
                </div>
                {target.type === TargetTypes.STUDENT_GROUP && (
                  <div className="divider"></div>
                )}
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
