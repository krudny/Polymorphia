import {
  GradingContext,
  GradingReducerActions,
} from "@/components/providers/grading/GradingContext";
import { useContext, useRef } from "react";

export default function Comment() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { state, dispatch } = useContext(GradingContext);

  return (
    <textarea
      ref={textareaRef}
      className="w-full p-4 text-xl resize-none border-3 border-primary-dark dark:border-secondary-light text-primary-dark dark:text-secondary-light placeholder-primary-dark dark:placeholder-secondary-light focus:outline-none rounded-xl"
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
