import { useContext } from "react";
import { GradingContextInterface } from "@/providers/grading/types";
import { GradingContext } from "@/providers/grading/GradingContext";

export default function useGradingContext(): GradingContextInterface {
  const context = useContext(GradingContext);

  if (!context) {
    throw new Error("useGradingContext must be used within GradingProvider");
  }

  return context;
}
