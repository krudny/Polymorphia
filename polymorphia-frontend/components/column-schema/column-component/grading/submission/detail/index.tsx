import { SubmissionRequirementResponseDTO } from "@/interfaces/api/grade/submission";
import { SubmissionDetailProps } from "./types";
import useGradingContext from "@/hooks/contexts/useGradingContext";

export default function SubmissionDetailComponent({
  detail,
  requirement,
}: SubmissionDetailProps) {
  const { state, submitSubmissions } = useGradingContext();

  const handleChange = (requirement: SubmissionRequirementResponseDTO) => {
    submitSubmissions({
      ...state.submissionDetails,
      [requirement.id]: {
        ...state.submissionDetails[requirement.id],
        isLocked: !state.submissionDetails[requirement.id].isLocked,
      },
    });
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="submissions-requirement">
      <div className="submissions-requirement-url">
        <input
          type="url"
          className="submissions-requirement-url-input"
          placeholder="Nie przesłano URL do tej części zadania"
          value={detail.url}
          disabled
        />
        <div className="submissions-requirement-url-symbols">
          <div className="submissions-requirement-url-symbol">
            <span
              className="material-symbols submissions-requirement-url-symbol-clickable"
              onClick={() => handleChange(requirement)}
            >
              {detail.isLocked ? "lock" : "lock_open_right"}
            </span>
          </div>
          {detail.url.length > 0 && (
            <div className="submissions-requirement-url-symbol">
              <span
                className="material-symbols submissions-requirement-url-symbol-clickable"
                onClick={() => handleCopy(detail.url)}
              >
                content_copy
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
