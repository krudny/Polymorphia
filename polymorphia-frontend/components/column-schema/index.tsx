"use client";

import { ReactNode } from "react";
import { ColumnSchemaProps } from "@/components/column-schema/types";
import { GradingComponent } from "@/views/course/grading/types";
import "../../styles/globals.css";

export default function ColumnSchema({
  columns,
  components,
}: ColumnSchemaProps): ReactNode {
  const getDistributedColumns = (): GradingComponent[][] => {
    // Jeśli mamy tylko 1 kolumnę, wszystko pod sobą
    if (columns === 1) {
      return [components.flat()];
    }

    // Jeśli liczba kolumn >= niż liczba grup, każda grupa w osobnej kolumnie
    if (components.length <= columns) {
      return components;
    }

    // Jeśli jest więcej grup niż kolumn, redystrybuuj
    const flatComponents: GradingComponent[] = components.flat();
    const columnData: GradingComponent[][] = Array.from(
      { length: columns },
      () => []
    );
    let currentColumn = 0;

    for (const component of flatComponents) {
      if (currentColumn >= columns) break;

      if (component.forceFullHeight) {
        // Komponenty z forceFullHeight zajmują całą kolumnę
        columnData[currentColumn] = [component];
        currentColumn++;
      } else {
        // Znajdź pierwszą kolumnę, która nie ma forceFullHeight
        while (
          currentColumn < columns &&
          columnData[currentColumn].length > 0 &&
          columnData[currentColumn][0].forceFullHeight
        ) {
          currentColumn++;
        }

        if (currentColumn < columns) {
          columnData[currentColumn].push(component);
        }
      }
    }

    return columnData;
  };

  const distributedColumns = getDistributedColumns();

  return (
    <div className="bg-red-200 w-full h-full flex gap-x-4 px-4">
      {distributedColumns.map((columnComponents, columnIndex) => {
        if (columnComponents.length === 0) return null;

        const hasFullHeight = columnComponents.some((c) => c.forceFullHeight);

        return (
          <div
            key={columnIndex}
            className={`w-full bg-yellow-300 flex flex-col gap-y-4 custom-scrollbar ${
              hasFullHeight ? "overflow-hidden" : "overflow-y-auto"
            } md:max-h-[calc(100dvh-5rem)]`}
          >
            {columnComponents.map((gradingComponent, componentIndex) => {
              // Na najmniejszym ekranie (columns=1), forceFullHeight dostaje h-96
              // Na większych ekranach dostaje h-full
              const heightClass = gradingComponent.forceFullHeight
                ? columns === 1
                  ? "h-80"
                  : "h-full"
                : "";

              return (
                <div
                  key={`${columnIndex}-${componentIndex}`}
                  className={`${heightClass} ${heightClass ? "overflow-y-auto" : ""}`}
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
