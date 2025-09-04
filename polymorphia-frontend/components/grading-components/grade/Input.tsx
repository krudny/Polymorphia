import { ChangeEvent, useRef, useState } from "react";
import { GradingInputProps } from "@/components/grading-components/grade/types";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import "./index.css";
import { GradingReducerActions } from "@/providers/grading/types";

export default function GradingInput({
  criterion,
  gainedXp,
}: GradingInputProps) {
  const { dispatch } = useGradingContext();
  const inputValueRefs = useRef<Record<number, string>>({});
  const [errors, setErrors] = useState<Record<number, boolean>>({});

  const handleXPChange = (
    event: ChangeEvent<HTMLInputElement>,
    criterionId: number,
    maxXp: number
  ) => {
    const xp = event.target.value;

    inputValueRefs.current[criterionId] = xp;
    const numValue = Number(xp);
    const isValid =
      xp === "" || (!isNaN(numValue) && numValue >= 0 && numValue <= maxXp);

    setErrors((prev) => ({
      ...prev,
      [criterionId]: !isValid && xp !== "",
    }));

    if (isValid) {
      dispatch({
        type: GradingReducerActions.ADD_XP_TO_CRITERION,
        payload: {
          criterionId,
          xp,
        },
      });
      delete inputValueRefs.current[criterionId];
    }
  };

  return (
    <input
      type="text"
      placeholder="Punkty"
      value={inputValueRefs.current[Number(criterion.id)] ?? gainedXp}
      onChange={(event) =>
        handleXPChange(event, Number(criterion.id), Number(criterion.maxXp))
      }
      className={`input ${errors[Number(criterion.id)] ? "error" : "valid"}`}
    />
  );
}
