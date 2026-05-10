import { ChangeEvent, useRef } from "react";
import { GradingInputProps } from "@/components/column-schema/column-component/grading/grade/types";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import "./index.css";
import { GradingReducerActions } from "@/providers/grading/reducer/types";
import { useEnterListener } from "@/hooks/general/useEnterListener";

export default function GradingInput({
  criterion,
  gainedXp,
}: GradingInputProps) {
  const gradeInputRef = useRef<HTMLInputElement | null>(null);
  const { dispatch, submitGrade } = useGradingContext();
  useEnterListener(submitGrade, gradeInputRef);

  const handleXPChange = (event: ChangeEvent<HTMLInputElement>) => {
    const xp = event.target.value;

    if (!/^\d*\.?\d?$/.test(xp)) {
      return;
    }

    const numValue = Number(xp);

    if (
      xp !== "" &&
      (isNaN(numValue) || numValue < 0 || numValue > Number(criterion.maxXp))
    ) {
      return;
    }

    dispatch({
      type: GradingReducerActions.ADD_XP_TO_CRITERION,
      payload: { criterionId: Number(criterion.id), xp },
    });
  };

  return (
    <input
      ref={gradeInputRef}
      type="text"
      placeholder="Punkty"
      value={gainedXp}
      onChange={handleXPChange}
      className="input"
    />
  );
}
