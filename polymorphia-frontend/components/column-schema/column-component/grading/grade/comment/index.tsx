import TextareaAutosize from "react-textarea-autosize";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import "./index.css";
import { ChangeEvent } from "react";
import { GradingReducerActions } from "@/providers/grading/reducer/types";
import { CommentProps } from "@/components/column-schema/column-component/grading/grade/comment/types";

export default function Comment({ comment }: CommentProps) {
  const { dispatch } = useGradingContext();

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
      value={comment}
      onChange={handleChange}
      onBlur={handleChange}
      minRows={1}
      maxRows={10}
    />
  );
}
