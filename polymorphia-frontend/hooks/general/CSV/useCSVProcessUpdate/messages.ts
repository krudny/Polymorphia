import { ImportCSVTypes } from "@/interfaces/general";

export const csvMessages = {
  [ImportCSVTypes.GRADE_IMPORT]: {
    loading: "Importowanie ocen...",
    success: "Oceny zostały zaimportowane",
  },
  [ImportCSVTypes.STUDENT_INVITE]: {
    loading: "Wysyłanie zaproszeń...",
    success: "Zaproszenia zostały wysłane",
  },
  [ImportCSVTypes.GROUP_INVITE]: {
    loading: "Wysyłanie zaproszeń do grupy...",
    success: "Zaproszenia do grupy zostały wysłane",
  },
};
