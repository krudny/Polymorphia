import { ImportCSVTypes } from "@/interfaces/general";

export const csvMessages = {
  [ImportCSVTypes.GRADE_IMPORT]: {
    loading: "Importowanie ocen...",
    success: "Oceny zostały zaimportowane",
    error: "Nie udało się zaimportować ocen",
  },
  [ImportCSVTypes.STUDENT_INVITE]: {
    loading: "Wysyłanie zaproszeń...",
    success: "Zaproszenia zostały wysłane",
    error: "Nie udało się wysłać zaproszeń",
  },
  [ImportCSVTypes.GROUP_INVITE]: {
    loading: "Wysyłanie zaproszeń do grupy...",
    success: "Zaproszenia do grupy zostały wysłane",
    error: "Nie udało się wysłać zaproszeń do grupy",
  },
};
