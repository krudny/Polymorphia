import { useFadeInAnimate } from "@/animations/FadeIn";
import AccordionSection from "@/components/accordion/AccordionSection";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import Loading from "@/components/loading";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { AccordionRef } from "@/providers/accordion/types";
import { useRef, Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { Accordion } from "@/components/accordion/Accordion";
import "./index.css";
import { GradeCriteriaProps } from "./types";
import Criterion from "./criterion";
import CommentWrapper from "./comment-wrapper";

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
      <div ref={wrapperRef} className="opacity-0">
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
            console.log("condition", criterionGrade && !isGradeLoading);

            return (
              <AccordionSection
                key={criterion.id}
                id={String(criterion.id)}
                title={criterion.name}
                headerClassName="grading-accordion-header"
              >
                {criterionGrade && !isGradeLoading ? (
                  <Criterion
                    criterion={criterion}
                    criterionGrade={criterionGrade}
                  />
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
            {!isGradeLoading ? <CommentWrapper /> : loadingComponent}
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
