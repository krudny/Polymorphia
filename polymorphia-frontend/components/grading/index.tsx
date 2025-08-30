import { GradingProps } from "@/components/grading/types";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import { useGradingFactory } from "@/hooks/factory/useGradingFactory";
import { Fragment } from "react";
import "./index.css";

export default function Grading({ gradingType, columns }: GradingProps) {
  const components = useGradingFactory(gradingType);

  if (!components) {
    return null;
  }

  const firstComponent = components[0];
  const restComponents = components.slice(1);

  const perDiv = Math.ceil(restComponents.length / (columns - 1));

  return (
    <div className="grading">
      <div className="grading-speed-dial">
        <SpeedDialDesktop type={gradingType} />
      </div>

      <div className="grading-list">{firstComponent}</div>

      {[...Array(columns - 1)].map((_, i) => {
        const start = i * perDiv;
        const end = start + perDiv;
        const slice = restComponents.slice(start, end);

        return (
          <div key={i} className="grading-columns">
            {slice.map((component, index) => (
              <Fragment key={index}>{component}</Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
}
