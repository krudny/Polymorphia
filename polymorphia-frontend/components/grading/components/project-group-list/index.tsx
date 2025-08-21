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

  return (
    <div className="w-full overflow-y-hidden flex flex-col flex-1 bg-yellow-300">
      <div className="w-full flex justify-between max-w-[25rem] mx-auto min-h-12 bg-green-600">
        <Search
          search={search}
          setSearch={setSearch}
          placeholder="Szukaj grupy..."
        />
        <ButtonWithBorder
          text="Filtry"
          className="!mx-0 !py-0 !border-0 !border-b-2 !align-self-start"
        />
      </div>
      <div className="overflow-y-scroll w-full bg-red-400 py-4 custom-scrollbar">
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
              ) => (
                <XPCard
                  key={index}
                  title={student.studentName}
                  color={
                    state.selectedTarget?.includes(student) ? "sky" : "green"
                  }
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
                      color={
                        state.selectedTarget?.includes(student)
                          ? "bg-sky-100"
                          : "bg-secondary-gray"
                      }
                      isSumLabelVisible={true}
                      isXPLabelVisible={!!student.gainedXp}
                    />
                  }
                />
              )
            )}
            <div className="w-full border-2 border-secondary-dark"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
