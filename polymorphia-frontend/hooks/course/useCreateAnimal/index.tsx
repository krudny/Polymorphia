import useModalContext from "@/hooks/contexts/useModalContext";
import { useMutation } from "@tanstack/react-query";
import UserService from "@/services/user";
import toast from "react-hot-toast";
import { CreateAnimalRequestDTO } from "@/interfaces/api/student";
import { UseCreateAnimal } from "@/hooks/course/useCreateAnimal/types";
import usePreferredCourseUpdate from "@/hooks/course/usePreferredCourseUpdate";

export default function useCreateAnimal(): UseCreateAnimal {
  const { closeModal } = useModalContext();
  const updatePreferredCourse = usePreferredCourseUpdate({
    shouldRedirectToMainPage: true,
  });
  const mutation = useMutation<void, Error, CreateAnimalRequestDTO>({
    mutationFn: (request) => UserService.createAnimal(request),
    onSuccess: (data, variables) => {
      toast.success("Stworzono zwierzaka!");
      closeModal();
      updatePreferredCourse(variables.courseId);
    },
  });

  return { mutation };
}
