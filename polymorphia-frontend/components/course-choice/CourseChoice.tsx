import XPCard from "@/components/xp-card/XPCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userService from "@/app/(logged-in)/profile/UserService";
import UserService from "@/app/(logged-in)/profile/UserService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
import { AvailableCoursesDTO, RoleTextMap } from "@/interfaces/api/user";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import { RefObject } from "react";

interface CourseChoiceProps {
  currentCourseId?: number;
  redirectPage?: string;
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function CourseChoiceGrid({
  redirectPage,
  currentCourseId,
  containerRef,
}: CourseChoiceProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: courses, isLoading } = useQuery<AvailableCoursesDTO[]>({
    queryKey: ["userCourses"],
    queryFn: () => UserService.getUserCourses(),
  });
  const setPreferredCourseMutation = useMutation({
    mutationFn: (courseId: number) =>
      userService.setUserPreferredCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Aktywny kurs został zmieniony!");
      if (redirectPage) {
        router.push(redirectPage);
      }
    },
    onError: () => {
      toast.error("Nie udało się zmienić kursu!");
    },
  });

  if (isLoading || !courses) {
    return <Loading />;
  }

  const cards = courses?.map(
    ({ id, name, coordinator, imageUrl, userRole }) => (
      <XPCard
        title={name}
        subtitle={`Koordynator: ${coordinator}, Twoja rola: ${RoleTextMap[userRole]}`}
        key={id}
        color={
          currentCourseId != null && currentCourseId === id ? "green" : "silver"
        }
        size={"sm"}
        leftComponent={<XPCardImage imageUrl={imageUrl} alt={name} />}
        onClick={() => setPreferredCourseMutation.mutate(id)}
      />
    )
  );
  return (
    <XPCardGrid containerRef={containerRef} cards={cards} maxColumns={2} />
  );
}
