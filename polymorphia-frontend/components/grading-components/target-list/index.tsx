import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import Search from "@/components/search";
import Loading from "@/components/loading/Loading";
import GradingComponentWrapper from "@/components/grading-components/grading-wrapper";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import "./index.css";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { GradingReducerActions } from "@/providers/grading/gradingReducer/types";
import { StudentTargetData, TargetTypes } from "@/interfaces/api/grade";

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
      {targets.map((target, index: number) => (
        <Fragment key={index}>
          <div
            className="group-record"
            onClick={() =>
              dispatch({
                type: GradingReducerActions.SET_TARGET,
                payload: target,
              })
            }
          >
            {(target.type === TargetTypes.STUDENT
              ? [target]
              : target.members
            ).map((student: StudentTargetData, index: number) => {
              const isSelected =
                !!state.selectedTarget &&
                ((state.selectedTarget.type === TargetTypes.STUDENT &&
                  state.selectedTarget.id === student.id) ||
                  (state.selectedTarget.type === TargetTypes.STUDENT_GROUP &&
                    target.type === TargetTypes.STUDENT_GROUP &&
                    state.selectedTarget.groupId === target.groupId));

              const color = isSelected
                ? "sky"
                : student.gainedXp
                  ? "green"
                  : "gray";

              return (
                <XPCard
                  key={index}
                  title={student.studentName}
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
