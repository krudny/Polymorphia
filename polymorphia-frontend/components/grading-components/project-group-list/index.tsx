import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import Search from "@/components/search";
import { StudentDetailsDTOWithType } from "@/interfaces/api/user";
import Loading from "@/components/loading/Loading";
import GradingComponentWrapper from "@/components/grading-components/grading-wrapper";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import "./index.css";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { GradingReducerActions } from "@/providers/grading/gradingReducer/types";

export default function ProjectGroupList() {
  const isMd = useMediaQuery({ minWidth: "786px" });
  const {
    state,
    dispatch,
    search,
    setSearch,
    projectGroups,
    isProjectGroupsLoading,
    setAreFiltersOpen,
  } = useGradingContext();

  if (isProjectGroupsLoading || !projectGroups) {
    return (
      <div className="project-group-list-loading">
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
      {projectGroups.map((group, index: number) => (
        <Fragment key={index}>
          <div
            className="group-record"
            onClick={() =>
              dispatch({
                type: GradingReducerActions.SET_TARGET,
                payload: [...group.members],
              })
            }
          >
            {group.members.map(
              (
                student: StudentDetailsDTOWithType & { gainedXp?: string },
                index: number
              ) => {
                const color = state.selectedTarget?.includes(student)
                  ? "sky"
                  : student.gainedXp
                    ? "green"
                    : "gray";
                const { userName, group, imageUrl, evolutionStage } =
                  student.userDetails;

                if (!userName) {
                  throw new Error("No userName defined!");
                }

                return (
                  <XPCard
                    key={index}
                    title={userName}
                    color={color}
                    subtitle={group}
                    size={"xs"}
                    leftComponent={
                      <XPCardImage imageUrl={imageUrl} alt={evolutionStage} />
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
              }
            )}
          </div>
          <div className="divider"></div>
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
