import XPCard from "@/components/xp-card/XPCard";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import Search from "@/components/search";
import GradingComponentWrapper from "@/components/grading-components/grading-wrapper";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import Loading from "@/components/loading";
import { ReactNode } from "react";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import { useMediaQuery } from "react-responsive";
import { GradingReducerActions } from "@/providers/grading/gradingReducer/types";

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
        <div className="student-list-loading">
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
          const { fullName, id, group, imageUrl, evolutionStage } =
            student.userDetails;

          if (!fullName) {
            throw new Error("No username defined!");
          }

          return (
            <div
              key={id || fullName}
              className="student-record"
              onClick={() =>
                dispatch({
                  type: GradingReducerActions.SET_TARGET,
                  payload: [student],
                })
              }
            >
              <XPCard
                title={fullName}
                color={color}
                subtitle={group}
                size="xs"
                leftComponent={
                  <XPCardImage imageUrl={imageUrl} alt={evolutionStage} />
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
