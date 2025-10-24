import { ColumnComponentProps } from "@/components/column-schema/column-component/types";

export default function ColumnComponent({
  topComponent,
  mainComponent,
}: ColumnComponentProps) {
  return (
    <div className="w-full flex flex-col max-h-full min-w-0 mt-3 first:mt-0 bg-green-200">
      {/* Fixed header */}
      <div className="w-full flex flex-shrink-0 justify-between mx-auto min-h-12 min-w-0 custom-scrollbar text-5xl md:px-3 overflow-hidden bg-blue-200">
        {topComponent()}
      </div>

      {/* Content that grows with accordion */}
      <div className="w-full flex flex-col relative mx-auto min-w-0 overflow-y-auto mt-3 md:px-3 custom-scrollbar">
        {mainComponent()}
      </div>
    </div>
  );
}
