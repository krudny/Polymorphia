import { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";
import Loading from "@/components/loading/Loading";
import { UserContextInterface } from "@/components/providers/user/types";

export const UserContext = createContext<UserContextInterface>({
  userId: 0,
  userName: "",
  animalName: "",
  evolutionStage: "",
  currentXP: 0,
  profileImage: "",
  role: "",
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: userData, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => UserService.getCurrentUser(),
  });

  if (isLoading) return <Loading />;

  return (
    <UserContext.Provider
      value={{
        userId: userData!.userId,
        userName: userData!.userName,
        animalName: userData!.animalName,
        evolutionStage: userData!.evolutionStage,
        currentXP: userData!.currentXP,
        profileImage: userData!.profileImage,
        role: userData!.role,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
