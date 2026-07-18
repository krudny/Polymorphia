import {
  ExecuteRequestDTO,
  ExecuteResponseDTO,
} from "@/interfaces/api/tasks/types";

const EXECUTE_URL = "http://localhost:8100/execute";

// TODO: to refactor
export const TaskService = {
  executeCode: async (
    payload: ExecuteRequestDTO
  ): Promise<ExecuteResponseDTO> => {
    const res = await fetch(EXECUTE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Execute failed: ${res.status} ${res.statusText}`);
    }

    return (await res.json()) as ExecuteResponseDTO;
  },
};
