import { TargetContext } from "@/providers/target";
import { useContext } from "react";

export default function useTargetContext() {
  const context = useContext(TargetContext);

  if (!context) {
    throw new Error("useTargetContext must be used within TargetProvider");
  }

  return context;
}
