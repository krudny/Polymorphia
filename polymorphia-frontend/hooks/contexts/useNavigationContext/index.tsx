import { useContext } from "react";
import { NavigationContextInterface } from "@/providers/navigation/types";
import { NavigationContext } from "@/providers/navigation";

export default function useNavigationContext(): NavigationContextInterface {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error(
      "useNavigationContext must be used within a NavigationProvider"
    );
  }

  return context;
}
