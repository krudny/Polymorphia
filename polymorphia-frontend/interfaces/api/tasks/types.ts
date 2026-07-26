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

export interface TaskDetailsResponseDTO {
  allowedLanguages: TaskAllowedLanguageDTO[];
  testCases: TaskTestCaseDTO[];
}

export interface TaskAllowedLanguageDTO {
  taskLanguage: SupportedLanguage;
  isDefault: boolean;
  sampleCode: string;
}

export interface TaskTestCaseDTO {
  name: string;
  orderIndex: number;
  input: string;
  expectedOutput: string;
}
