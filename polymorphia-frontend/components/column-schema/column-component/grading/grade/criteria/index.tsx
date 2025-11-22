import { useFadeInAnimate } from "@/animations/FadeIn";
import AccordionSection from "@/components/accordion/AccordionSection";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { AccordionRef } from "@/providers/accordion/types";
import { Fragment, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Accordion } from "@/components/accordion/Accordion";
import "./index.css";
import { GradeCriteriaProps } from "@/components/column-schema/column-component/grading/grade/criteria/types";
import Criterion from "@/components/column-schema/column-component/grading/grade/criteria/criterion";
import CommentWrapper from "@/components/column-schema/column-component/grading/grade/criteria/comment-wrapper";
import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";
import ColumnSwappableComponent from "@/components/column-schema/column-component/shared/column-swappable-component";
import { CriteriaDetailsRequestDTO } from "@/interfaces/api/grade/criteria";
import useTargetContext from "@/hooks/contexts/useTargetContext";

export default function GradeCriteria({ criteria }: GradeCriteriaProps) {
  const { state, isSpecificDataLoading, isSpecificDataError, submitGrade } =
    useGradingContext();
  const { selectedTarget } = useTargetContext();
  const accordionRef = useRef<AccordionRef>(null);
  const wrapperRef = useFadeInAnimate(!!criteria);
  const isMd = useMediaQuery({ minWidth: "768px" });

  const criterionSectionErrorComponent = (
    <ErrorComponent
      message="Nie udało się załadować kryterium."
      size={ErrorComponentSizes.COMPACT}
    />
  );

  const commentSectionErrorComponent = (
    <ErrorComponent
      message="Nie udało się załadować komentarza do oceny."
      size={ErrorComponentSizes.COMPACT}
    />
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
                <ColumnSwappableComponent<CriteriaDetailsRequestDTO>
                  data={criterionGrade}
                  isDataLoading={isSpecificDataLoading}
                  isDataError={isSpecificDataError}
                  renderComponent={(data, key) => (
                    <Criterion
                      key={key}
                      criterion={criterion}
                      criterionGrade={data}
                    />
                  )}
                  renderDataErrorComponent={() =>
                    criterionSectionErrorComponent
                  }
                  minHeightClassName="min-h-80"
                  selectedTarget={selectedTarget}
                />
              </AccordionSection>
            );
          })}

          <AccordionSection
            key={criteria.length + 1}
            id="Komentarz"
            title="Komentarz"
            headerClassName="grading-accordion-header"
          >
            <ColumnSwappableComponent<string>
              data={state.comment}
              isDataLoading={isSpecificDataLoading}
              isDataError={isSpecificDataError}
              renderComponent={(data, key) => (
                <CommentWrapper key={key} comment={data} />
              )}
              renderDataErrorComponent={() => commentSectionErrorComponent}
              minHeightClassName="min-h-[100px]"
              selectedTarget={selectedTarget}
            />
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
