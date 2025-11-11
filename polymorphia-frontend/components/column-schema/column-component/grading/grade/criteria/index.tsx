import { useFadeInAnimate } from "@/animations/FadeIn";
import AccordionSection from "@/components/accordion/AccordionSection";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import Loading from "@/components/loading";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { AccordionRef } from "@/providers/accordion/types";
import { Fragment, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Accordion } from "@/components/accordion/Accordion";
import "./index.css";
import { GradeCriteriaProps } from "@/components/column-schema/column-component/grading/grade/criteria/types";
import Criterion from "@/components/column-schema/column-component/grading/grade/criteria/criterion";
import CommentWrapper from "@/components/column-schema/column-component/grading/grade/criteria/comment-wrapper";
import { getKeyForSelectedTarget } from "@/providers/grading/utils/getKeyForSelectedTarget";
import {
  baseSwapAnimationWrapperProps,
  SwapAnimationWrapper,
} from "@/animations/SwapAnimationWrapper";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import ErrorComponent from "@/components/error";

export default function GradeCriteria({ criteria }: GradeCriteriaProps) {
  const { state, isSpecificDataLoading, isSpecificDataError, submitGrade } =
    useGradingContext();
  const { selectedTarget } = useTargetContext();
  const accordionRef = useRef<AccordionRef>(null);
  const wrapperRef = useFadeInAnimate(!!criteria);
  const isMd = useMediaQuery({ minWidth: "768px" });

  const criterionSectionLoadingComponent = (
    <div className="h-[320px] mt-2 relative">
      <Loading />
    </div>
  );

  const criterionSectionErrorComponent = (
    <div className="h-[320px] mt-2 relative">
      <ErrorComponent message="Nie udało się załadować kryterium." />
    </div>
  );

  const commentSectionLoadingComponent = (
    <div className="h-[100px] mt-2 relative">
      <Loading />
    </div>
  );

  const commentSectionErrorComponent = (
    <div className="h-[100px] mt-2 relative">
      <ErrorComponent message="Nie udało się załadować komentarza do oceny." />
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
                  {...baseSwapAnimationWrapperProps}
                  keyProp={
                    criterionGrade &&
                    !isSpecificDataLoading &&
                    !isSpecificDataError
                      ? getKeyForSelectedTarget(selectedTarget)
                      : (isSpecificDataLoading ? "loading" : "error") +
                        getKeyForSelectedTarget(selectedTarget)
                  }
                >
                  {criterionGrade &&
                  !isSpecificDataLoading &&
                  !isSpecificDataError ? (
                    <Criterion
                      key={getKeyForSelectedTarget(selectedTarget)}
                      criterion={criterion}
                      criterionGrade={criterionGrade}
                    />
                  ) : isSpecificDataLoading ? (
                    criterionSectionLoadingComponent
                  ) : (
                    criterionSectionErrorComponent
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
              {...baseSwapAnimationWrapperProps}
              keyProp={
                !isSpecificDataLoading && !isSpecificDataError
                  ? getKeyForSelectedTarget(selectedTarget)
                  : (isSpecificDataLoading ? "loading" : "error") +
                    getKeyForSelectedTarget(selectedTarget)
              }
            >
              {!isSpecificDataLoading && !isSpecificDataError ? (
                <CommentWrapper />
              ) : isSpecificDataLoading ? (
                commentSectionLoadingComponent
              ) : (
                commentSectionErrorComponent
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
