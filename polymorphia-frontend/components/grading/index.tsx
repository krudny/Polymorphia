import { GradingProps } from "@/components/grading/types";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import { useGradingFactory } from "@/hooks/factory/useGradingFactory";

export default function Grading({ gradingType, columns }: GradingProps) {
  const components = useGradingFactory(gradingType);

  if (!components) {
    return null;
  }

  return (
    <div
      className={`w-full max-w-[1400px] m-auto h-[calc(100dvh-6rem)] grid grid-cols-${columns} items-start content-start gap-4`}
    >
      <div className="fixed bottom-4 right-5 z-[999]">
        <SpeedDialDesktop type={gradingType} />
      </div>
      {components.map((component, index) => (
        <div key={index} className="flex flex-col overflow-hidden max-h-full">
          {component}
        </div>
      ))}
    </div>
  );
}
