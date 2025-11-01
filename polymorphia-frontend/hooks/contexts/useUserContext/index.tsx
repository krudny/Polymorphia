import { useContext } from "react";
import { UserContext } from "@/providers/user";
import { BaseUserDetails, UserDetailsDTO } from "@/interfaces/api/user";

export default function useUserContext(): UserDetailsDTO {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
}

export function useUserDetails(): BaseUserDetails {
  return useUserContext().userDetails;
}
