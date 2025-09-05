import XPCard from "@/components/xp-card/XPCard";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import Search from "@/components/search";
import { GradingReducerActions } from "@/providers/grading/GradingContext";
import GradingComponentWrapper from "@/components/grading-components/grading-wrapper";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import Loading from "@/components/loading/Loading";
import { ReactNode } from "react";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import { useMediaQuery } from "react-responsive";

export default function StudentsList() {
  const {
    search,
    setSearch,
    students,
    isStudentsLoading,
    state,
    dispatch,
    setAreFiltersOpen,
  } = useGradingContext();
  const wrapperRef = useFadeInAnimate(!isStudentsLoading);
  const isMd = useMediaQuery({ minWidth: "786px" });

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

  const mainComponent = (): ReactNode => {
    if (isStudentsLoading || !students) {
      return (
        <div className="h-80">
          <Loading />
        </div>
      );
    }

    return (
      <div ref={wrapperRef}>
        {students.map((student) => {
          const color = state.selectedTarget?.includes(student)
            ? "sky"
            : student.gainedXp
              ? "green"
              : "gray";

          return (
            <div
              key={student.id || student.studentName}
              className="student-record"
              onClick={() =>
                dispatch({
                  type: GradingReducerActions.SET_TARGET,
                  payload: [student],
                })
              }
            >
              <XPCard
                title={student.studentName}
                color={color}
                subtitle={student.group}
                size="xs"
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
    );
  };

  return (
    <GradingComponentWrapper
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
