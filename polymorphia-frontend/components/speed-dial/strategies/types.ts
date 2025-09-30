import {SpeedDialItem} from "@/components/speed-dial/types";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Role} from "@/interfaces/general";

export interface SpeedDialContext {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  saveMarkdown: () => void;
  rejectMarkdown: () => void;
  markdownSource?: string;
  router: AppRouterInstance;
  currentPath: string;
  role: Role;
}

export interface SpeedDialStrategy {
  getItems(context: SpeedDialContext): SpeedDialItem[];
}
