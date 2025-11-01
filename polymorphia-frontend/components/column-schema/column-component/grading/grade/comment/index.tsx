import TextareaAutosize from "react-textarea-autosize";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { GradingReducerActions } from "@/providers/grading/gradingReducer/types";
import "./index.css";
import { ChangeEvent } from "react";

export default function Comment() {
  const { state, dispatch } = useGradingContext();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: GradingReducerActions.UPDATE_COMMENT,
      payload: {
        comment: event.target.value,
      },
    });
  };

  return (
    <TextareaAutosize
      className="comment"
      placeholder="Dodaj komentarz..."
      value={state.comment}
      onChange={handleChange}
      onBlur={handleChange}
      minRows={1}
      maxRows={10}
    />
  );
}
