import { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";
import Loading from "@/components/loading/Loading";
import { UserDetailsDTOWithRefresh } from "@/interfaces/api/user";

export const UserContext = createContext<UserDetailsDTOWithRefresh>({
  id: 0,
  userName: "",
  animalName: "",
  evolutionStage: "",
  imageUrl: "",
  position: 0,
  group: "",
  courseId: 1,
  refresh: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => UserService.getCurrentUser(),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider
      value={{
        id: userData!.id,
        userName: userData!.userName,
        animalName: userData!.animalName,
        evolutionStage: userData!.evolutionStage,
        imageUrl: userData!.imageUrl,
        group: userData!.group,
        position: userData!.position,
        courseId: userData!.courseId,
        refresh: () => refetch(),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
