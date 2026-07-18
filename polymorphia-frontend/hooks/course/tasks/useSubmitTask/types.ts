import { ExecuteRequestDTO } from "@/interfaces/api/tasks/types";
import { Dispatch, SetStateAction } from "react";

export interface UseSubmitTask {
  mutate: (payload: ExecuteRequestDTO) => void;
  isPending: boolean;
}

export interface UseSubmitTaskProps {
  setOutput: Dispatch<SetStateAction<string>>;
}
