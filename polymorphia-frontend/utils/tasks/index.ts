import { ExecuteTaskResponseDTO } from "@/interfaces/api/tasks/types";

export function formatOutput(result: ExecuteTaskResponseDTO): string {
  const parts: string[] = [];

  // if (result.results.stdout) {
  //   parts.push(result.stdout);-
  // }
  // if (result.stderr) {
  //   parts.push(result.stderr);
  // }
  // if (result.exitCode !== 0 && result.exitCode !== undefined && result.exitCode !== null) {
  //   parts.push(`Proces zakończony kodem ${result.exitCode}`);
  // }

  return parts.join("\n").trimEnd() || "Brak wyjścia";
}
