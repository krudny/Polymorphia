"use client";

import { ReactNode, useEffect, useRef } from "react";
import { ColumnSchemaProps } from "@/components/column-schema/types";
import Grade from "@/components/grading-components/grade";
import TargetList from "@/components/grading-components/target-list";
import "../../styles/globals.css";

export default function ColumnSchema({
  columns,
  components,
}: ColumnSchemaProps): ReactNode {
  return (
    <div className="bg-red-200 w-full h-full flex gap-x-4 px-4">
      {[...Array(Math.max(columns, components.length))].map((_, i) => {
        return (
          <div
            key={i}
            className="w-full bg-yellow-300 flex flex-col gap-y-4 overflow-y-auto max-h-[(100dvh-5rem)] custom-scrollbar"
          >
            {i == 0 ? (
              <TargetList />
            ) : (
              <>
                <Grade />
                <Grade />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
