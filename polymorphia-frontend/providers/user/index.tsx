import { createContext, ReactNode } from "react";
import Loading from "@/components/loading";
import { UserDetailsDTO } from "@/interfaces/api/user";
import useCurrentUser from "@/hooks/course/useCurrentUser";
import NotFound from "@/components/home/not-found";

export const UserContext = createContext<UserDetailsDTO | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: userData, isLoading, isError } = useCurrentUser();

  if (isError) {
    return (
      <NotFound
        actionLabel={"Strona główna"}
        subtitle={"Coś poszło nie tak."}
        rerouteTo={"/login"}
      />
    );
  }

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
