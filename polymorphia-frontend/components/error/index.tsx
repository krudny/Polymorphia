import "./index.css";
import {
  ErrorComponentProps,
  ErrorComponentSizes,
} from "@/components/error/types";

export default function ErrorComponent({
  title = "Wystąpił błąd",
  message = "Wystąpił błąd przy ładowaniu szczegółów.",
  size = ErrorComponentSizes.DEFAULT,
}: ErrorComponentProps) {
  const classValue =
    size === ErrorComponentSizes.COMPACT
      ? "error-component-compact"
      : "error-component";
  return (
    <div className={classValue}>
      <h1>{title}</h1>
      {message && <h2>{message}</h2>}
    </div>
  );
}
