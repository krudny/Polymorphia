export enum SupportedLanguage {
  JAVASCRIPT = "JAVASCRIPT",
  PYTHON = "PYTHON",
  JAVA = "JAVA",
}

export interface ExecuteRequestDTO {
  taskLanguage: SupportedLanguage;
  sourceCode: string;
}

export interface ExecuteResponseDTO {
  exitCode: number;
  stdout: string;
  stderr: string;
}
