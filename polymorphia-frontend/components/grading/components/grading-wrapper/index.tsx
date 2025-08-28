import { GradingComponentWrapperProps } from "@/components/grading/components/grading-wrapper/types";

export default function GradingComponentWrapper({
  topComponent,
  mainComponent,
}: GradingComponentWrapperProps) {
  return (
    <div className="w-full overflow-y-hidden flex flex-col flex-1 gap-y-4 ">
      <div className="w-full flex justify-between items-center px-8 mx-auto min-h-12">
        {topComponent}
      </div>
      <div className="w-full overflow-y-scroll px-8 py-4 mx-auto custom-scrollbar flex-1 relative">
        {mainComponent}
      </div>
    </div>
  );
}
