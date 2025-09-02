import { GradingReducerActions } from "@/providers/grading/GradingContext";
import { useRef } from "react";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import "./index.css";

export default function Comment() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { state, dispatch } = useGradingContext();

  return (
    <textarea
      ref={textareaRef}
      className="comment"
      placeholder="Dodaj komentarz..."
      defaultValue={state.comment}
      onBlur={(e) => {
        dispatch({
          type: GradingReducerActions.ADD_COMMENT,
          payload: {
            comment: e.target.value,
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
