import { GradingProps } from "@/components/grading/types";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import { useGradingFactory } from "@/hooks/factory/useGradingFactory";
import { Fragment } from "react";

export default function Grading({ gradingType, columns }: GradingProps) {
  const components = useGradingFactory(gradingType);

  if (!components) {
    return null;
  }

  const firstComponent = components[0];
  const restComponents = components.slice(1);

  const perDiv = Math.ceil(restComponents.length / (columns - 1));

  return (
    <div
      className={`w-full max-w-[1400px] m-auto h-[calc(100dvh-6rem)] flex justify-center gap-4`}
    >
      <div className="fixed bottom-4 right-5 z-[999]">
        <SpeedDialDesktop type={gradingType} />
      </div>

      <div className="w-full max-w-md flex flex-col overflow-hidden max-h-full">
        {firstComponent}
      </div>

      {[...Array(columns - 1)].map((_, i) => {
        const start = i * perDiv;
        const end = start + perDiv;
        const slice = restComponents.slice(start, end);

        return (
          <div
            key={i}
            className="w-full max-w-md flex flex-col overflow-hidden max-h-full h-fit gap-y-4"
          >
            {slice.map((component, index) => (
              <Fragment key={index}>{component}</Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
}
