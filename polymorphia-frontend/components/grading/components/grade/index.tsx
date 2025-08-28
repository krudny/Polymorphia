"use client";

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

export default function Grade() {
  const { state, criteria, isGradeLoading, submitGrade } = useGradingContext();
  const accordionRef = useRef<AccordionRef>(null);

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
        <Accordion ref={accordionRef} className="gap-y-5" maxOpen={1}>
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
                  headerClassName="reward-header"
                  isInitiallyOpened={index == 0}
                >
                  <div key={criterionId} className="flex flex-col">
                    <div className="w-full px-6 pt-6">
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
                    <div className="w-20 mx-auto flex items-center -mt-6 z-[20]">
                      <Input criterion={criterion} gainedXp={gainedXp} />
                    </div>
                    <h2 className="text-3xl my-3">Nagrody</h2>
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
            headerClassName="reward-header"
          >
            <div className="w-full">
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
