import clsx from "clsx";
import "./index.css";
import { ImageBadgeProps } from "@/components/image-badge/types";

// TODO: variants?
export default function ImageBadge({ text, className }: ImageBadgeProps) {
  return (
    <div className={clsx(`image-badge ${className}`)}>
      <h1>{text}</h1>
    </div>
  );
}
