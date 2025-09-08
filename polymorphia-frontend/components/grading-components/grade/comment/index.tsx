import { useRef } from "react";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import "./index.css";
import { GradingReducerActions } from "@/providers/grading/gradingReducer/types";

export default function Comment() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { state, dispatch } = useGradingContext();

  return (
    <textarea
      ref={textareaRef}
      className="comment"
      placeholder="Dodaj komentarz..."
      defaultValue={state.comment}
      onBlur={(event) => {
        dispatch({
          type: GradingReducerActions.UPDATE_COMMENT,
          payload: {
            comment: event.target.value,
          },
        });
      }}
      style={{
        minHeight: "8rem",
        height: "auto",
        // @ts-expect-error "New CSS feature not supported by TS yet"
        fieldSizing: "content",
      }}
    />
  );
}
