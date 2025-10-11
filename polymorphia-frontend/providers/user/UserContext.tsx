import { createContext, ReactNode, useEffect } from "react";
import Loading from "@/components/loading";
import { UserDetailsDTO } from "@/interfaces/api/user";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";

export const UserContext = createContext<UserDetailsDTO | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // TODO: hook
  const { data: userData, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => UserService.getCurrentUser(),
  });

  if (isLoading || !userData) {
    return <Loading />;
  }

  return (
    <UserContext.Provider
      value={{
        ...userData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
