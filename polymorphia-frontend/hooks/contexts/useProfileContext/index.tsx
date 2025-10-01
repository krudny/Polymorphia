import { useContext } from "react";
import { ProfileContextInterface } from "@/providers/profile/types";
import { ProfileContext } from "@/providers/profile/ProfileContext";

export default function useProfileContext(): ProfileContextInterface {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfileContext must be used within ProfileProvider");
  }

  return context;
}
