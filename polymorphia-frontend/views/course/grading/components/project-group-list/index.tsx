import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import Search from "@/components/search";
import { UserDetailsDTO } from "@/interfaces/api/user";
import Loading from "@/components/loading/Loading";
import { GradingReducerActions } from "@/providers/grading/GradingContext";
import GradingComponentWrapper from "@/views/course/grading/components/grading-wrapper";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import "./index.css";
import { Fragment } from "react";

export default function ProjectGroupList() {
  const {
    state,
    dispatch,
    search,
    setSearch,
    projectGroups,
    isProjectGroupsLoading,
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
        className="!mx-0 !py-0 !rounded-none !border-0 !border-b-2 !align-self-start !h-full"
      />
    </>
  );

  const mainComponent = (
    <>
      {projectGroups.map((group, index: number) => (
        <Fragment key={index}>
          <div
            key={index + group.id}
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
    </>
  );

  return (
    <GradingComponentWrapper
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
