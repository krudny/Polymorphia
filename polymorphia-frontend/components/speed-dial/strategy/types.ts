import { SpeedDialItem } from "@/components/speed-dial/types";

export interface SpeedDialContext {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  saveMarkdown: () => void;
  rejectMarkdown: () => void;
}

export interface SpeedDialStrategy {
  getItems(context: SpeedDialContext): SpeedDialItem[];
}
