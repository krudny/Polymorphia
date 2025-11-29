import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateCourseGroupRequestDTO } from "@/interfaces/api/course-groups";
import CourseGroupsService from "@/services/course-groups";
import { UseCreateCourseGroup } from "@/hooks/course/useCreateCourseGroup/types";

export default function useCreateCourseGroup(): UseCreateCourseGroup {
  const mutation = useMutation<void, Error, CreateCourseGroupRequestDTO>({
    mutationFn: (request: CreateCourseGroupRequestDTO) => {
      return toast.promise(CourseGroupsService.createCourseGroup(request), {
        loading: "Tworzenie...",
        success: "Utworzono grupę zajęciową!",
      });
    },
  });

  return { mutation };
}
