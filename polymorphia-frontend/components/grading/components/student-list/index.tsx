import XPCard from "@/components/xp-card/XPCard";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import Search from "@/components/search";
import Loading from "@/components/loading/Loading";
import { GradingReducerActions } from "@/components/providers/grading/GradingContext";
import GradingComponentWrapper from "@/components/grading/components/grading-wrapper";
import useGradingContext from "@/hooks/contexts/useGradingContext";

export default function StudentsList() {
  const { search, setSearch, students, isStudentsLoading, state, dispatch } = useGradingContext();
  if (isStudentsLoading || !students) {
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
        className="!mx-0 !py-0 !rounded-none !border-0 !border-b-2 !align-self-start !h-[42px]"
      />
    </>
  );

  const mainComponent = (
    <>
      {students.map((student, index) => {
        const color = state.selectedTarget?.includes(student)
          ? "sky"
          : student.gainedXp
            ? "green"
            : "gray";

        return (
          <div
            key={index}
            className="mx-auto my-3 first:mt-0 last:mb-0"
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
    </>
  );

  return (
    <GradingComponentWrapper
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
