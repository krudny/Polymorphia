import "../../styles/general.css";
import clsx from "clsx";

// TODO: variants?
export default function ImageBadge({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={clsx(`image-badge ${className}`)}>
      <h1>{text}</h1>
    </div>
  );
}
