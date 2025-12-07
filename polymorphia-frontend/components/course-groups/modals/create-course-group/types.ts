import { Dispatch, SetStateAction } from "react";

export interface CreateCourseGroupFormProps {
  isInviteModalOpen: boolean;
  setInviteModalOpen: Dispatch<SetStateAction<boolean>>;
}
