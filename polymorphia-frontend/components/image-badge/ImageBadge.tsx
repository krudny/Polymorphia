import clsx from "clsx";
import "./index.css";
import { ImageBadgeProps } from "@/components/image-badge/types";

export default function ImageBadge({ text, icon, className }: ImageBadgeProps) {
  return (
    <div className={clsx(`image-badge ${className}`)}>
      {text && <h1>{text}</h1>}
      {icon && <span className="material-symbols">{icon}</span>}
    </div>
  );
}
