import useModalContext from "@/hooks/contexts/useModalContext";
import { useMutation } from "@tanstack/react-query";
import { InviteRequestDTO } from "@/interfaces/api/user";
import UserService from "@/app/(logged-in)/profile/UserService";
import toast from "react-hot-toast";
import { CreateAnimalRequestDTO } from "@/interfaces/api/student";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
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
    onError: ({ message }: Error) => {
      toast.error(message);
    },
  });

  return { mutation };
}
