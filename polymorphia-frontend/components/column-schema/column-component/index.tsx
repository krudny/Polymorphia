import { ColumnComponentProps } from "@/components/column-schema/column-component/types";
import "./index.css";

export default function ColumnComponent({
  topComponent,
  mainComponent,
}: ColumnComponentProps) {
  return (
    <div className="column-schema-component">
      <div className="column-schema-top-component">{topComponent()}</div>
      <div className="column-schema-main-component">{mainComponent()}</div>
    </div>
  );
}
