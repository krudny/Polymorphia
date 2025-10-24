"use client";

import ColumnSchema from "@/components/column-schema";
import { useMediaQuery } from "react-responsive";
import { GradingProvider } from "@/providers/grading/GradingContext";
import { useGradingFactory } from "@/hooks/factory/useGradingFactory";
import { EventTypes } from "@/interfaces/general";

export default function Page() {
  const isXL = useMediaQuery({ minWidth: "1280px" });
  const isMd = useMediaQuery({ minWidth: "768px" });
  const components = useGradingFactory(EventTypes.PROJECT);

  console.log(components);

  return (
    <GradingProvider>
      <div className="w-full flex h-fit md:h-[calc(100dvh-5rem)] bg-purple-200">
        <ColumnSchema
          columns={isXL ? 3 : isMd ? 2 : 1}
          components={components}
        />
      </div>
    </GradingProvider>
  );
}
