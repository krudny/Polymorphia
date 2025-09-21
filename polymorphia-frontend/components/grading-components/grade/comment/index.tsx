import { useEffect, useRef } from "react";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import "./index.css";
import { GradingReducerActions } from "@/providers/grading/gradingReducer/types";

export default function Comment() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { state, dispatch } = useGradingContext();

  // TODO: remove that when firefox starts supporting field sizeing
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 8 + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [state.comment]);

  return (
    <textarea
      ref={textareaRef}
      className="comment"
      placeholder="Dodaj komentarz..."
      defaultValue={state.comment}
      onInput={adjustTextareaHeight}
      onBlur={(event) => {
        dispatch({
          type: GradingReducerActions.UPDATE_COMMENT,
          payload: {
            comment: event.target.value,
          },
        });
      }}
    />
  );
}
