import { KnowledgeBaseResponseDTO } from "@/interfaces/api/DTO";

export function shiftArray(arr: KnowledgeBaseResponseDTO[], shift: number) {
  const len = arr.length;
  const offset = ((shift % len) + len) % len;
  return arr.slice(offset).concat(arr.slice(0, offset));
}
