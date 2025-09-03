import { SpeedDialItem } from "@/components/speed-dial/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface SpeedDialContext {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  saveMarkdown: () => void;
  rejectMarkdown: () => void;
  router: AppRouterInstance;
  currentPath: string;
}

export interface SpeedDialStrategy {
  getItems(context: SpeedDialContext | undefined): SpeedDialItem[];
}
