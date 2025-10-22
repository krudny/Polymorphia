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
import { GradeCriteriaProps } from "@/components/grading-components/grade/criteria/types";
import Criterion from "@/components/grading-components/grade/criteria/criterion";
import CommentWrapper from "@/components/grading-components/grade/criteria/comment-wrapper";
import { getKeyForSelectedTarget } from "@/providers/grading/utils/getKeyForSelectedTarget";
import { SwapAnimationWrapper } from "@/animations/SwapAnimationWrapper";

export default function GradeCriteria({ criteria }: GradeCriteriaProps) {
  const { state, isSpecificDataLoading, submitGrade } = useGradingContext();
  const accordionRef = useRef<AccordionRef>(null);
  const wrapperRef = useFadeInAnimate(!!criteria);
  const isMd = useMediaQuery({ minWidth: "768px" });

  const criterionSectionLoadingComponent = (
    <div className="h-[320px] mt-2 relative">
      <Loading />
    </div>
  );

  const commentSectionLoadingComponent = (
    <div className="h-[100px] mt-2 relative">
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

            return (
              <AccordionSection
                key={criterion.id}
                id={String(criterion.id)}
                title={criterion.name}
                headerClassName="grading-accordion-header"
              >
                <SwapAnimationWrapper
                  fromVars={{ autoAlpha: 0 }}
                  toVars={{
                    autoAlpha: 1,
                    ease: "power1.inOut",
                  }}
                  duration={0.3}
                  keyProp={
                    criterionGrade && !isSpecificDataLoading
                      ? getKeyForSelectedTarget(state)
                      : "loading" + getKeyForSelectedTarget(state)
                  }
                >
                  {criterionGrade && !isSpecificDataLoading ? (
                    <Criterion
                      key={getKeyForSelectedTarget(state)}
                      criterion={criterion}
                      criterionGrade={criterionGrade}
                    />
                  ) : (
                    criterionSectionLoadingComponent
                  )}
                </SwapAnimationWrapper>
              </AccordionSection>
            );
          })}

          <AccordionSection
            key={criteria.length + 1}
            id="Komentarz"
            title="Komentarz"
            headerClassName="grading-accordion-header"
          >
            <SwapAnimationWrapper
              fromVars={{ autoAlpha: 0 }}
              toVars={{
                autoAlpha: 1,
                ease: "power1.inOut",
              }}
              duration={0.3}
              keyProp={
                !isSpecificDataLoading
                  ? getKeyForSelectedTarget(state)
                  : "loading" + getKeyForSelectedTarget(state)
              }
            >
              {!isSpecificDataLoading ? (
                <CommentWrapper />
              ) : (
                commentSectionLoadingComponent
              )}
            </SwapAnimationWrapper>
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
