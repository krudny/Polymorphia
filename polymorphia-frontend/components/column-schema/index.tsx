"use client";

import { ReactNode } from "react";
import { ColumnSchemaProps } from "@/components/column-schema/types";
import { getDistributedColumns } from "@/components/column-schema/distribute-columns";
import "./index.css";
import { useScaleShow } from "@/animations/ScaleShow";

export default function ColumnSchema({
  columns,
  components,
}: ColumnSchemaProps): ReactNode {
  const distributedColumns = getDistributedColumns({ columns, components });
  const wrapperRef = useScaleShow();

  return (
    <div className="column-schema" ref={wrapperRef}>
      {distributedColumns.map((columnComponents, columnIndex) => {
        const hasFullHeight = columnComponents.some(
          (component) => component.forceFullHeight
        );

        return (
          <div
            key={columnIndex}
            className={`column-schema-column ${hasFullHeight ? "overflow-hidden" : "overflow-y-auto"}`}
          >
            {columnComponents.map((gradingComponent, componentIndex) => {
              const heightClass = gradingComponent.forceFullHeight
                ? columns === 1
                  ? "h-80"
                  : columnComponents.length > 1
                    ? "h-1/2 overflow-y-auto"
                    : "h-full"
                : "";

              return (
                <div
                  key={`${columnIndex}-${componentIndex}`}
                  className={`${heightClass}`}
                >
                  {gradingComponent.component}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
