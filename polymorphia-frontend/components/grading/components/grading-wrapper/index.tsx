import { GradingComponentWrapperProps } from "@/components/grading/components/grading-wrapper/types";
import "./index.css";

export default function GradingComponentWrapper({
  topComponent,
  mainComponent,
}: GradingComponentWrapperProps) {
  return (
    <div className="grading-wrapper">
      <div className="grading-wrapper-top">{topComponent}</div>
      <div className="grading-wrapper-main">{mainComponent}</div>
    </div>
  );
}
