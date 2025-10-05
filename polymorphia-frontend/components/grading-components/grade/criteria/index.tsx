import { useFadeInAnimate } from "@/animations/FadeIn";
import AccordionSection from "@/components/accordion/AccordionSection";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import Loading from "@/components/loading";
import ProgressBar from "@/components/progressbar/ProgressBar";
import ProgressBarRangeLabels from "@/components/progressbar/ProgressBarRangeLabels";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { AccordionRef } from "@/providers/accordion/types";
import { useRef, Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import AssignReward from "../reward-assignment";
import { Accordion } from "@/components/accordion/Accordion";
import Input from "../input";
import Comment from "../comment";
import "./index.css";
import { GradeCriteriaProps } from "./types";

export default function GradeCriteria({ criteria }: GradeCriteriaProps) {
  const { state, isGradeLoading, submitGrade } = useGradingContext();
  const accordionRef = useRef<AccordionRef>(null);
  const wrapperRef = useFadeInAnimate(!!criteria);
  const isMd = useMediaQuery({ minWidth: "768px" });

  const loadingComponent = (
    <div className="h-[306px] relative">
      <Loading />
    </div>
  );

  const accordionSections = [
    ...criteria.map(({ id }) => String(id)),
    "Komentarz",
  ];

  return (
    <Fragment>
      <div ref={wrapperRef}>
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
          {criteria.map((criterion) => {
            const criterionGrade = state.criteria[criterion.id];
            const gainedXp = criterionGrade?.gainedXp ?? "0";

            return (
              <AccordionSection
                key={criterion.id}
                id={String(criterion.id)}
                title={criterion.name}
                headerClassName="grading-accordion-header"
              >
                {criterionGrade && !isGradeLoading ? (
                  <div key={criterion.id} className="grade-criterion">
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
                ) : (
                  loadingComponent
                )}
              </AccordionSection>
            );
          })}

          <AccordionSection
            key={criteria.length + 1}
            id="Komentarz"
            title="Komentarz"
            headerClassName="grading-accordion-header"
          >
            {!isGradeLoading ? (
              <div className="grade-comment-wrapper">
                <Comment />
              </div>
            ) : (
              loadingComponent
            )}
          </AccordionSection>
        </Accordion>
      </div>
      <div className="w-full mt-3">
        <ButtonWithBorder
          text="Zapisz"
          className="w-full !border-3 !rounded-xl"
          onClick={submitGrade}
        />
      </div>
    </Fragment>
  );
}
