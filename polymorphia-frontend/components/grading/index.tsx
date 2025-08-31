import { GradingProps } from "@/components/grading/types";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import { useGradingFactory } from "@/hooks/factory/useGradingFactory";
import { Fragment } from "react";
import "./index.css";

export default function Grading({ gradingType, columns }: GradingProps) {
  const gradingComponents = useGradingFactory(gradingType);

  if (!gradingComponents) {
    return null;
  }

  return (
    <div className="grading">
      <div className="grading-speed-dial">
        <SpeedDialDesktop type={gradingType} />
      </div>

      <div className="grading-list">{gradingComponents.list}</div>

      {[...Array(Math.max(columns, gradingComponents.components.length))].map(
        (_, i) => {
          const components = gradingComponents.components[i];

          return (
            <div key={i} className="grading-columns">
              {components.map((component, index) => (
                <Fragment key={index}>{component}</Fragment>
              ))}
            </div>
          );
        }
      )}
    </div>
  );
}
