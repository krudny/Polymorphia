import {
  SupportedLanguages,
  type SupportedLanguage,
  type TaskDetailsResponseDTO,
} from "@/interfaces/api/tasks/types";

export const mapBackendToSupportedLanguage = (
  backendLanguage: string
): SupportedLanguage => {
  switch (backendLanguage.trim().toUpperCase()) {
    case "JAVASCRIPT":
    case "JS":
      return SupportedLanguages.JAVASCRIPT;
    case "PYTHON":
    case "PY":
      return SupportedLanguages.PYTHON;
    case "JAVA":
      return SupportedLanguages.JAVA;
    case "CPP":
    case "C++":
      return SupportedLanguages.CPP;
    case "C":
      return SupportedLanguages.C;
    case "CSHARP":
    case "C_SHARP":
    case "C#":
      return SupportedLanguages.CSHARP;
    default:
      return SupportedLanguages.PLAINTEXT;
  }
};

export const mapTaskDetailsResponse = (
  data: TaskDetailsResponseDTO
): TaskDetailsResponseDTO => ({
  ...data,
  allowedLanguages: data.allowedLanguages.map((allowedLanguage) => ({
    ...allowedLanguage,
    taskLanguage: mapBackendToSupportedLanguage(allowedLanguage.taskLanguage),
  })),
});
