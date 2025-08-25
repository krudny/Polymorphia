import { ChangeEvent, useContext, useRef, useState } from "react";
import {
  GradingContext,
  GradingReducerActions,
} from "@/components/providers/grading/GradingContext";
import { GradingInputProps } from "@/components/grading/components/grade/types";

export default function GradingInput({
  criterion,
  gainedXp,
}: GradingInputProps) {
  const { dispatch } = useContext(GradingContext);
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
      className={`text-3xl w-full text-center border-b-3 focus:outline-none transition-colors duration-300 ease-[cubic-bezier(0.34,1,0.2,1)] ${
        errors[Number(criterion.id)]
          ? "border-primary-error text-primary-error"
          : "border-primary-dark dark:border-secondary-light text-primary-dark dark:text-secondary-light placeholder-primary-dark dark:placeholder-secondary-light"
      }`}
    />
  );
}
