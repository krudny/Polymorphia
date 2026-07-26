// TODO: to refactor

import { ApiClient } from "@/services/api/client";
import {
  ExecuteRequestDTO,
  ExecuteResponseDTO,
  TaskDetailsResponseDTO,
} from "@/interfaces/api/tasks/types";

const TaskService = {
  getTaskDetails: async (
    taskId: number
  ): Promise<TaskDetailsResponseDTO> => {
    return ApiClient.get(`/tasks/${taskId}`);
  },

  runTask: async (
    taskId: number,
    payload: ExecuteRequestDTO
  ): Promise<ExecuteResponseDTO> => {
    return ApiClient.post(`/tasks/${taskId}/run`, payload);
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

