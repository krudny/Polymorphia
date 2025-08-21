import XPCard from "@/components/xp-card/XPCard";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import Search from "@/components/search";
import { useContext } from "react";
import Loading from "@/components/loading/Loading";
import {
  GradingContext,
  GradingReducerActions,
} from "@/components/providers/grading/GradingContext";

export default function StudentsList() {
  const { search, setSearch, students, isStudentsLoading, state, dispatch } =
    useContext(GradingContext);

  if (isStudentsLoading || !students) {
    return <Loading />;
  }

  return (
    <div className="w-full overflow-y-hidden flex flex-col flex-1 gap-y-4">
      <div className="w-full flex justify-between max-w-[25rem] mx-auto min-h-12">
        <Search
          search={search}
          setSearch={setSearch}
          placeholder="Szukaj studenta..."
        />
        <ButtonWithBorder
          text="Filtry"
          className="!mx-0 !py-0 !border-0 !border-b-2 !align-self-start"
        />
      </div>
      <div className="overflow-y-scroll w-full  py-4 custom-scrollbar">
        {students.map((student, index) => {
          const color = state.selectedTarget?.includes(student)
            ? "sky"
            : student.gainedXp
              ? "green"
              : "gray";

          return (
            <div
              key={index}
              className="max-w-[25rem] mx-auto my-3 first:mt-0 last:mb-0"
              onClick={() =>
                dispatch({
                  type: GradingReducerActions.SET_TARGET,
                  payload: [student],
                })
              }
            >
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
                    isXPLabelVisible={false}
                    isSumLabelVisible={true}
                  />
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
