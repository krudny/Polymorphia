import { Accordion } from "@/components/accordion/Accordion";
import SubmissionsRequirementProps from "@/components/grading-components/submission/requirement/types";
import { useMediaQuery } from "react-responsive";
import "./index.css";
import AccordionSection from "@/components/accordion/AccordionSection";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { useFadeInAnimate } from "@/animations/FadeIn";
import Loading from "@/components/loading";
import { SwapAnimationWrapper } from "@/animations/SwapAnimationWrapper";
import { getKeyForSelectedTarget } from "@/providers/grading/utils/getKeyForSelectedTarget";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";

export default function SubmissionRequirement({
  requirements,
}: SubmissionsRequirementProps) {
  const { state, isSpecificDataLoading, submitSubmissions } =
    useGradingContext();
  const wrapperRef = useFadeInAnimate(!!requirements);
  const isXL = useMediaQuery({ minWidth: "1400px" });
  const accordionSections = [...requirements.map(({ id }) => String(id))];
  const initallyOpenedAccordionSections = new Set(
    accordionSections.length > 0 && isXL ? [accordionSections[0]] : []
  );

  const requirementLoadingComponent = (
    <div className="h-[146px] mt-2 relative">
      <Loading />
    </div>
  );

  const handleChange = (requirementId: number) => {
    const requirement = requirements.find(
      (requirement) => requirement.id === requirementId
    );

    if (!requirement) {
      return;
    }

    submitSubmissions({
      ...state.submissionDetails,
      [requirement.id]: {
        ...state.submissionDetails[requirement.id],
        isLocked: !state.submissionDetails[requirement.id].isLocked,
      },
    });
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div ref={wrapperRef} className="opacity-0">
      <Accordion
        className="submissions-requirement-accordion-override"
        sectionIds={new Set(accordionSections)}
        initiallyOpenedSectionIds={initallyOpenedAccordionSections}
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
              <SwapAnimationWrapper
                fromVars={{ autoAlpha: 0 }}
                toVars={{
                  autoAlpha: 1,
                  ease: "power1.inOut",
                }}
                duration={0.3}
                keyProp={
                  detail && !isSpecificDataLoading
                    ? getKeyForSelectedTarget(state)
                    : "loading" + getKeyForSelectedTarget(state)
                }
              >
                {detail && !isSpecificDataLoading ? (
                  <div className="submissions-requirement">
                    <div className="submissions-requirement-url">
                      <input
                        type="url"
                        className="submissions-requirement-url-input"
                        placeholder="Nie przesłano URL do tej części zadania"
                        value={detail.url}
                        disabled
                      />
                      <div className="submissions-requirement-url-symbols">
                        {detail.isLocked && (
                          <div className="submissions-requirement-url-symbol">
                            <span className="material-symbols">lock</span>
                          </div>
                        )}
                        {detail.url.length > 0 && (
                          <button className="submissions-requirement-url-symbol">
                            <span
                              className="material-symbols submissions-requirement-url-symbol-copy"
                              onClick={() => handleCopy(detail.url)}
                            >
                              content_copy
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                    <ButtonWithBorder
                      text={detail.isLocked ? "Odblokuj" : "Zablokuj"}
                      icon={detail.isLocked ? "lock_open_right" : "lock"}
                      className="w-full !border-3 !rounded-xl"
                      onClick={() => handleChange(requirement.id)}
                    />
                  </div>
                ) : (
                  requirementLoadingComponent
                )}
              </SwapAnimationWrapper>
            </AccordionSection>
          );
        })}
      </Accordion>
    </div>
  );
}
