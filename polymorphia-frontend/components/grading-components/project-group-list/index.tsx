import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import Search from "@/components/search";
import { UserDetailsDTO } from "@/interfaces/api/user";
import Loading from "@/components/loading/Loading";
import GradingComponentWrapper from "@/components/grading-components/grading-wrapper";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import "./index.css";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { GradingReducerActions } from "@/providers/grading/types";

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
    return <Loading />;
  }

  const topComponent = (
    <>
      <Search
        search={search}
        setSearch={setSearch}
        placeholder="Szukaj studenta..."
      />
      <ButtonWithBorder
        text="Filtry"
        size={isMd ? "md" : "sm"}
        className="!mx-0 !py-0 !border-0 !border-b-2 !rounded-none !h-full"
        onClick={() => setAreFiltersOpen(true)}
      />
    </>
  );

  const mainComponent = () => (
    <div className="group-list">
      {projectGroups.map((group, index: number) => (
        <Fragment key={index}>
          <div
            key={index + group.id}
            className="group-record"
            onClick={() =>
              dispatch({
                type: GradingReducerActions.ADD_TO_TARGET,
                payload: [...group.members],
              })
            }
          >
            {group.members.map(
              (
                student: UserDetailsDTO & { gainedXp?: string },
                index: number
              ) => {
                const color = state.selectedTarget?.includes(student)
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
              }
            )}
          </div>
          <div key={index} className="divider"></div>
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
