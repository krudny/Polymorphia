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
              let heightClass;
              if (gradingComponent.forceFullHeight) {
                if (columns === 1) {
                  heightClass = "h-80";
                } else if (columnComponents.length > 1) {
                  heightClass =
                    columnComponents.length === 2
                      ? "flex-1 overflow-y-auto"
                      : "overflow-y-auto";
                } else {
                  heightClass = "h-full";
                }
              } else {
                heightClass =
                  columnComponents.length === 2
                    ? "flex-1 overflow-y-auto"
                    : "overflow-y-auto";
              }

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
