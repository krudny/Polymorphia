"use client";

import "../../index.css";
import "./index.css";
import { ReactNode, useRef } from "react";
import ProgressBar from "@/components/progressbar/ProgressBar";
import ProgressBarRangeLabels from "@/components/progressbar/ProgressBarRangeLabels";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import Loading from "@/components/loading/Loading";
import { Accordion } from "@/components/accordion/Accordion";
import { AccordionRef } from "@/components/providers/accordion/types";
import AccordionSection from "@/components/accordion/AccordionSection";
import GradingComponentWrapper from "@/components/grading/components/grading-wrapper";
import Reward from "@/components/grading/components/grade/Reward";
import Comment from "@/components/grading/components/grade/Comment";
import Input from "@/components/grading/components/grade/Input";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { useMediaQuery } from "react-responsive";

export default function Grade() {
  const { state, criteria, isGradeLoading, submitGrade } = useGradingContext();
  const accordionRef = useRef<AccordionRef>(null);
  const isXL = useMediaQuery({ minWidth: "1400px" });

  const topComponent = <h1 className="text-5xl">Ocena</h1>;

  const mainComponent = (): ReactNode => {
    if (isGradeLoading || !criteria) {
      return (
        <div className="h-80">
          <Loading />
        </div>
      );
    }

    return (
      <>
        <Accordion
          ref={accordionRef}
          className="grade-accordion-override"
          maxOpen={1}
        >
          {Object.entries(state.criteria).map(
            ([criterionId, criterionGrade], index) => {
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
                  isInitiallyOpened={index == 0 && isXL}
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
                    <Reward
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
        <div className="w-full my-4">
          <ButtonWithBorder
            text="Zapisz"
            className="w-full !border-3 !rounded-xl"
            onClick={submitGrade}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <GradingComponentWrapper
        topComponent={topComponent}
        mainComponent={mainComponent()}
      />
    </>
  );
}
