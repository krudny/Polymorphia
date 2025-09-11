"use client";

import "../../../views/course/grading/index.css";
import "./index.css";
import { Fragment, ReactNode, useRef } from "react";
import ProgressBar from "@/components/progressbar/ProgressBar";
import ProgressBarRangeLabels from "@/components/progressbar/ProgressBarRangeLabels";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import Loading from "@/components/loading/Loading";
import { Accordion } from "@/components/accordion/Accordion";
import { AccordionRef } from "@/providers/accordion/types";
import AccordionSection from "@/components/accordion/AccordionSection";
import GradingComponentWrapper from "@/components/grading-components/grading-wrapper";
import AssignReward from "@/components/grading-components/grade/reward-assignment";
import Comment from "@/components/grading-components/grade/comment";
import Input from "@/components/grading-components/grade/input";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { useMediaQuery } from "react-responsive";
import { getKeyForSelectedTarget } from "@/providers/grading/utils/getKeyForSelectedTarget";
import useCriteria from "@/hooks/course/useCriteria";

export default function Grade() {
  const { state, isGradeLoading, submitGrade } = useGradingContext();
  const { data: criteria } = useCriteria();
  const accordionRef = useRef<AccordionRef>(null);
  const isMd = useMediaQuery({ minWidth: "768px" });

  const topComponent = <h1>Ocena</h1>;

  const mainComponent = (): ReactNode => {
    if (isGradeLoading || !criteria || !state.selectedTarget) {
      return (
        <div className="h-80">
          <Loading />
        </div>
      );
    }

    const accordionSections = [
      ...criteria.map(({ id }) => String(id)),
      "Komentarz",
    ];

    return (
      <Fragment key={getKeyForSelectedTarget(state)}>
        <Accordion
          ref={accordionRef}
          className="grade-accordion-override"
          sectionIds={new Set(accordionSections)}
          initiallyOpenedSectionIds={
            new Set(
              accordionSections.length > 0 && isMd ? [accordionSections[0]] : []
            )
          }
          maxOpen={1}
          shouldAnimateInitialOpen={false}
        >
          {Object.entries(state.criteria).map(
            ([criterionId, criterionGrade]) => {
              const criterion = criteria?.find(
                (criterion) => criterion.id === Number(criterionId)
              );
              if (!criterion) {
                return null;
              }

              const gainedXp = criterionGrade.gainedXp ?? "0";
              return (
                <AccordionSection
                  key={criterionId}
                  id={criterionId}
                  title={criterion.name}
                  headerClassName="grading-accordion-header"
                >
                  <div key={criterionId} className="grade-criterion">
                    <div className="grade-criterion-progress-bar">
                      <ProgressBar
                        minXP={0}
                        currentXP={Number(gainedXp)}
                        maxXP={Number(criterion.maxXp)}
                        numSquares={3}
                        segmentSizes={[0, 50, 0, 50, 0]}
                        lowerElement={
                          <ProgressBarRangeLabels
                            minXP={0}
                            maxXP={Number(criterion.maxXp)}
                          />
                        }
                      />
                    </div>
                    <div className="grade-input-wrapper">
                      <Input criterion={criterion} gainedXp={gainedXp} />
                    </div>
                    <h2>Nagrody</h2>
                    <AssignReward
                      criterion={criterion}
                      criterionGrade={criterionGrade}
                    />
                  </div>
                </AccordionSection>
              );
            }
          )}
          <AccordionSection
            key={criteria.length + 1}
            id="Komentarz"
            title="Komentarz"
            headerClassName="grading-accordion-header"
          >
            <div className="grade-comment-wrapper">
              <Comment />
            </div>
          </AccordionSection>
        </Accordion>
        <div className="w-full mt-3">
          <ButtonWithBorder
            text="Zapisz"
            className="w-full !border-3 !rounded-xl"
            onClick={submitGrade}
          />
        </div>
      </Fragment>
    );
  };

  return (
    <>
      <GradingComponentWrapper
        topComponent={topComponent}
        mainComponent={mainComponent}
      />
    </>
  );
}
