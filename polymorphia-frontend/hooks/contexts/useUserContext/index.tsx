import { useContext } from "react";
import { UserContext } from "@/providers/user/UserContext";
import { UserDetailsDTO } from "@/interfaces/api/user";

export default function useUserContext(): UserDetailsDTO {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
}
