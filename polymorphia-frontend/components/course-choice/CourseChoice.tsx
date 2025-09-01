import XPCard from "@/components/xp-card/XPCard";
import { API_STATIC_URL } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userService from "@/app/(logged-in)/profile/UserService";
import UserService from "@/app/(logged-in)/profile/UserService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
import { AvailableCoursesDTO } from "@/interfaces/api/user";

interface CourseChoiceProps {
  currentCourseId?: number;
  redirectPage?: string;
}

export default function CourseChoiceComponent({
  redirectPage,
  currentCourseId,
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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col justify-start items-left mt-10 gap-4">
      <h3 className="text-4xl ">Aktywny kurs</h3>
      <div className="flex gap-5 justify-items-start items-start">
        {courses?.map(({ id, name, coordinator, imageUrl, userRole }) => (
          <XPCard
            title={name}
            subtitle={`Koordynator: ${coordinator}, Twoja rola: ${userRole}`}
            key={id}
            color={
              currentCourseId != null && currentCourseId === id
                ? "green"
                : "silver"
            }
            size={"sm"}
            image={{
              url: `${API_STATIC_URL}/${imageUrl}`,
              alt: name,
            }}
            onClick={() => setPreferredCourseMutation.mutate(id)}
          />
        ))}
      </div>
    </div>
  );
}
