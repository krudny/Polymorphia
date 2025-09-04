import XPCard from "@/components/xp-card/XPCard";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import Search from "@/components/search";
import GradingComponentWrapper from "@/components/grading-components/grading-wrapper";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import Loading from "@/components/loading/Loading";
import { ReactNode } from "react";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import { useMediaQuery } from "react-responsive";
import { GradingReducerActions } from "@/providers/grading/types";

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
        {students.map((studentGroup, groupIndex) => {
          return (
            <div key={`group-${groupIndex}`} className="student-record">
              <div
                className={studentGroup.length > 1 ? "flex flex-col gap-2" : ""}
              >
                {studentGroup.map((student) => {
                  const isSelected =
                    state.selectedTarget?.targets?.some(
                      (selectedStudent) => selectedStudent.id === student.id
                    ) || false;

                  return (
                    <div
                      key={student.id || student.studentName}
                      onClick={() =>
                        dispatch({
                          type: GradingReducerActions.ADD_TO_TARGET,
                          payload: {
                            user: student,
                            index: groupIndex,
                          },
                        })
                      }
                    >
                      <XPCard
                        title={student.studentName}
                        color={
                          isSelected
                            ? "sky"
                            : student.gainedXp
                              ? "green"
                              : "gray"
                        }
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
                            color={
                              isSelected
                                ? "sky"
                                : student.gainedXp
                                  ? "green"
                                  : "gray"
                            }
                            isXPLabelVisible={false}
                            isSumLabelVisible={true}
                          />
                        }
                      />
                    </div>
                  );
                })}
                {studentGroup.length > 1 &&
                  groupIndex < students.length - 1 && (
                    <div className="divider"></div>
                  )}
              </div>
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
