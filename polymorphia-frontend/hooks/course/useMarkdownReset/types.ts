import {MarkdownParamsRequest} from "@/interfaces/api/markdown";

export interface UseMarkdownReset {
  mutate: (request: MarkdownParamsRequest) => void;
}

