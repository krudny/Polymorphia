import "./index.css";

type ErrorStateProps = {
  title?: string;
  message?: string;
};

export default function ErrorState({
  title = "Wystąpił błąd",
  message = "Wystąpił błąd przy ładowaniu szczegółów.",
}: ErrorStateProps) {
  return (
    <div className="error-state">
      <h2 className="error-state-title">{title}</h2>
      {message && <p className="error-state-message">{message}</p>}
    </div>
  );
}
