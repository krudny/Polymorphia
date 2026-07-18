export enum SupportedLanguage {
  JAVASCRIPT = "JAVASCRIPT",
  PYTHON = "PYTHON",
  JAVA = "JAVA",
}

export interface ExecuteRequestDTO {
  language: SupportedLanguage;
  code: string;
}

export interface ExecuteResponseDTO {
  exitCode: number;
  stdout: string;
  stderr: string;
}
