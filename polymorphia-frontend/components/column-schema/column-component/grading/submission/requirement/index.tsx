import { Accordion } from "@/components/accordion/Accordion";
import SubmissionsRequirementProps from "@/components/column-schema/column-component/grading/submission/requirement/types";
import { useMediaQuery } from "react-responsive";
import "./index.css";
import AccordionSection from "@/components/accordion/AccordionSection";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { useFadeInAnimate } from "@/animations/FadeIn";
import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";
import ColumnSwappableComponent from "@/components/column-schema/column-component/shared/column-swappable-component";
import { SubmissionDetail } from "@/interfaces/api/grade/submission";
import SubmissionDetailComponent from "@/components/column-schema/column-component/grading/submission/detail";
import useTargetContext from "@/hooks/contexts/useTargetContext";

export default function SubmissionRequirement({
  requirements,
}: SubmissionsRequirementProps) {
  const { state, isSpecificDataLoading, isSpecificDataError } =
    useGradingContext();
  const { selectedTarget } = useTargetContext();
  const wrapperRef = useFadeInAnimate(!!requirements);
  const isXL = useMediaQuery({ minWidth: "1400px" });
  const accordionSections = [...requirements.map(({ id }) => String(id))];
  const initiallyOpenedAccordionSections = new Set(
    accordionSections.length > 0 && isXL ? [accordionSections[0]] : []
  );

  const requirementErrorComponent = (
    <ErrorComponent
      title=""
      message="Nie udało się załadować oddanego zadania."
      size={ErrorComponentSizes.COMPACT}
    />
  );

  return (
    <div ref={wrapperRef} className="opacity-0">
      <Accordion
        className="submissions-requirement-accordion-override"
        sectionIds={new Set(accordionSections)}
        initiallyOpenedSectionIds={initiallyOpenedAccordionSections}
        maxOpen={2}
        shouldAnimateInitialOpen={false}
      >
        {requirements.map((requirement) => {
          const detail = state.submissionDetails[requirement.id];

          return (
            <AccordionSection
              key={requirement.id}
              id={String(requirement.id)}
              title={
                requirement.name +
                (!requirement.isMandatory ? " (opcjonalne)" : "")
              }
              headerClassName="submissions-requirement-accordion-header"
            >
              <ColumnSwappableComponent<SubmissionDetail>
                data={detail}
                isDataLoading={isSpecificDataLoading}
                isDataError={isSpecificDataError}
                renderComponent={(data, key) => (
                  <SubmissionDetailComponent
                    key={key}
                    detail={data}
                    requirement={requirement}
                  />
                )}
                renderDataErrorComponent={() => requirementErrorComponent}
                minHeightClassName="min-h-[146px]"
                selectedTarget={selectedTarget}
              />
            </AccordionSection>
          );
        })}
      </Accordion>
    </div>
  );
}
