import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import Search from "@/components/search";
import { useContext } from "react";
import { UserDetailsDTO } from "@/interfaces/api/user";
import Loading from "@/components/loading/Loading";
import {
  GradingContext,
  GradingReducerActions,
} from "@/components/providers/grading/GradingContext";
import GradingComponentWrapper from "@/components/grading/components/grading-wrapper";

export default function ProjectGroupList() {
  const {
    state,
    dispatch,
    search,
    setSearch,
    projectGroups,
    isProjectGroupsLoading,
  } = useContext(GradingContext);

  if (isProjectGroupsLoading || !projectGroups) {
    return <Loading />;
  }

  const topComponent = (
    <>
      <Search
        search={search}
        setSearch={setSearch}
        placeholder="Szukaj grupy..."
      />
      <ButtonWithBorder
        text="Filtry"
        className="!mx-0 !py-0 !border-0 !border-b-2 !align-self-start"
      />
    </>
  );

  const mainComponent = (
    <>
      {projectGroups.map((group, index: number) => (
        <div
          key={index}
          className="max-w-[25rem] mx-auto my-3 first:mt-0 last:mb-0 flex flex-col gap-y-2"
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
                <>
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
                  <div className="w-full border-2 border-secondary-dark"></div>
                </>
              );
            }
          )}
        </div>
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
