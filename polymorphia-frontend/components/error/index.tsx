import "./index.css";
import { ErrorComponentProps } from "./types";

export default function ErrorComponent({
  title = "Wystąpił błąd",
  message = "Wystąpił błąd przy ładowaniu szczegółów.",
}: ErrorComponentProps) {
  return (
    <div className="error-component">
      <h2 className="error-component-title">{title}</h2>
      {message && <p className="error-component-message">{message}</p>}
    </div>
  );
}
