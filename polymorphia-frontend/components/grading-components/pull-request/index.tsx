import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { PullRequestProps } from "@/components/grading-components/pull-request/types";
import toast from "react-hot-toast";
import GradingComponentWrapper from "@/components/grading-components/grading-wrapper";
import { ReactNode, useRef } from "react";
import { AccordionRef } from "@/providers/accordion/types";
import { Accordion } from "@/components/accordion/Accordion";
import AccordionSection from "@/components/accordion/AccordionSection";
import "../../../views/course/grading/index.css";
import { useMediaQuery } from "react-responsive";

export default function PullRequest({ pullRequests }: PullRequestProps) {
  const accordionRef = useRef<AccordionRef>(null);
  const isXL = useMediaQuery({ minWidth: "1400px" });

  const topComponent = <h1>Pull Request</h1>;

  const pullRequestNames = pullRequests.map(({ name }) => String(name));
  const accordionSections = new Set(pullRequestNames);
  const initiallyOpenedAccordionSections = new Set(
    pullRequestNames.length > 0 && isXL ? [pullRequestNames[0]] : []
  );

  const mainComponent = (): ReactNode => (
    <Accordion
      ref={accordionRef}
      className="gap-y-5"
      sectionIds={accordionSections}
      initiallyOpenedSectionIds={initiallyOpenedAccordionSections}
      maxOpen={2}
    >
      {pullRequests.map((pullRequest, index) => (
        <AccordionSection
          key={index}
          id={pullRequest.name}
          title={pullRequest.name}
          headerClassName="grading-accordion-header"
        >
          <div key={index} className="flex flex-col mb-3">
            <h3 className="text-2xl mb-2 hover:cursor-pointer">
              {pullRequest.url}
            </h3>
            <div className="flex gap-x-2 h-fit">
              <ButtonWithBorder
                text="Zobacz"
                className="w-full !border-3 !rounded-lg !py-1"
                onClick={() => window.open(pullRequest.url, "_blank")}
              />
              <ButtonWithBorder
                text="Edytuj"
                className="w-full !border-3 !rounded-lg !py-1"
                onClick={() => toast.error("Not implemented yet!")}
              />
            </div>
          </div>
        </AccordionSection>
      ))}
    </Accordion>
  );

  return (
    <GradingComponentWrapper
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
