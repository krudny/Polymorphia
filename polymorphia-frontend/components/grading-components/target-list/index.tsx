import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import Search from "@/components/search";
import GradingComponentWrapper from "@/components/grading-components/grading-wrapper";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import "./index.css";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { GradingReducerActions } from "@/providers/grading/gradingReducer/types";
import { TargetTypes } from "@/interfaces/api/grade/target";
import Loading from "@/components/loading";
import areTargetsEqual from "@/providers/grading/utils/areTargetsEqual";

export default function TargetList() {
  const isMd = useMediaQuery({ minWidth: "786px" });
  const {
    state,
    dispatch,
    search,
    setSearch,
    targets,
    isTargetsLoading,
    setAreFiltersOpen,
  } = useGradingContext();
  const { selectedTarget } = state;

  if (isTargetsLoading || !targets) {
    return (
      <div className="target-list-loading">
        <Loading />
      </div>
    );
  }

  const topComponent = (
    <div className="grading-search-wrapper">
      <Search
        search={search}
        setSearch={setSearch}
        placeholder="Szukaj studenta..."
      />
      <ButtonWithBorder
        text="Filtry"
        size={isMd ? "md" : "sm"}
        className="!mx-0 !py-0 !border-0 !border-b-2 !rounded-none"
        onClick={() => setAreFiltersOpen(true)}
      />
    </div>
  );

  const mainComponent = () => (
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
                isTargetMatchingSelectedTarget || isStudentSelectedFromGroup;

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
    <GradingComponentWrapper
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
