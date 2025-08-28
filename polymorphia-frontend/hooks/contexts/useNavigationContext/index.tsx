import { useContext } from "react";
import { NavigationContextInterface } from "@/components/providers/navigation/types";
import { NavigationContext } from "@/components/providers/navigation/NavigationContext";

export default function useNavigationContext(): NavigationContextInterface {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error(
      "useNavigationContext must be used within a NavigationProvider"
    );
  }

  return context;
}
