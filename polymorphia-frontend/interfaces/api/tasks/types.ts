export interface ExecuteRequestDTO {
  taskLanguage: string;
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
  taskLanguage: string;
  isDefault: boolean;
  sampleCode: string;
}

export interface TaskTestCaseDTO {
  name: string;
  orderIndex: number;
  input: string;
  expectedOutput: string;
}
