import { SpeedDialItem } from "@/components/speed-dial/types";
import { Role } from "@/interfaces/api/user";
import { AppRouterInstance } from "@/interfaces/general";

export interface SpeedDialContext {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  saveMarkdown: () => void;
  rejectMarkdown: () => void;
  router: AppRouterInstance;
  currentPath: string;
  role: Role;
}

export interface SpeedDialStrategy {
  getItems(context: SpeedDialContext): SpeedDialItem[];
}
