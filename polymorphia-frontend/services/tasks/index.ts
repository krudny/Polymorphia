// TODO: to refactor

import { ApiClient } from "@/services/api/client";
import {
  ExecuteRequestDTO,
  ExecuteResponseDTO,
} from "@/interfaces/api/tasks/types";

const TaskService = {
  runTask: async (
    // taskId: number,
    payload: ExecuteRequestDTO
  ): Promise<ExecuteResponseDTO> => {
    return ApiClient.post(`/tasks/20/run`, payload);
  },
  // submitTask: async (
  //     taskId: number,
  //     payload: ExecuteTaskRequestDTO
  // ): Promise<SubmitTaskResponseDTO> => {
  //   return ApiClient.post(`/tasks/${taskId}/submissions`, payload);
  // },
  // getSubmissionStatus: async (
  //     taskId: number,
  //     submissionId: number
  // ): Promise<TaskSubmissionStatusResponseDTO> => {
  //   return ApiClient.get(
  //       `/tasks/${taskId}/submissions/${submissionId}`
  //   );
  // },
};

export default TaskService;
