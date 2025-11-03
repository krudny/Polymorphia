import { TitleContext } from "@/providers/title/TitleContext";
import { useContext } from "react";

export function useTitle() {
  const context = useContext(TitleContext);

  if (context === undefined) {
    throw new Error("useTitle must be used within a TitleProvider");
  }

  return context;
}
