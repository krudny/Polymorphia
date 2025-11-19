import { ColumnComponentProps } from "@/components/column-schema/column-component/types";
import "./index.css";
import clsx from "clsx";

export default function ColumnComponent({
  topComponent,
  mainComponent,
  hidden = false,
}: ColumnComponentProps) {
  return (
    <div
      className={clsx(
        "column-schema-component",
        hidden ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="column-schema-top-component">{topComponent()}</div>
      <div className="column-schema-main-component">{mainComponent()}</div>
    </div>
  );
}
