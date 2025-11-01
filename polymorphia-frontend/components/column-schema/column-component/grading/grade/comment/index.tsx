import TextareaAutosize from "react-textarea-autosize";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import "./index.css";
import { ChangeEvent } from "react";
import { GradingReducerActions } from "@/providers/grading/reducer/types";

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
