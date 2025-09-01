import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { PullRequestProps } from "@/views/course/grading/components/pull-request/types";
import toast from "react-hot-toast";
import GradingComponentWrapper from "@/views/course/grading/components/grading-wrapper";
import { ReactNode, useRef } from "react";
import { AccordionRef } from "@/providers/accordion/types";
import { Accordion } from "@/components/accordion/Accordion";
import AccordionSection from "@/components/accordion/AccordionSection";
import "../../index.css";
import { useMediaQuery } from "react-responsive";

export default function PullRequest({ pullRequests }: PullRequestProps) {
  const topComponent = <h1 className="text-5xl">Pull Request</h1>;
  const accordionRef = useRef<AccordionRef>(null);
  const isXL = useMediaQuery({ minWidth: "1400px" });

  const mainComponent = (): ReactNode => (
    <Accordion ref={accordionRef} className="gap-y-5" maxOpen={2}>
      {pullRequests.map((pullRequest, index) => (
        <AccordionSection
          key={index}
          id={pullRequest.name}
          title={pullRequest.name}
          headerClassName="grading-accordion-header"
          isInitiallyOpened={index === 0 && isXL}
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
      mainComponent={mainComponent()}
    />
  );
}
