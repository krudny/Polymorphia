import { XPCardColors } from "@/components/xp-card/types";
import { TargetRequestDTO } from "@/interfaces/api/target";

export interface ProjectVariantInfoProps {
  size?: "xs" | "sm" | "md" | "lg";
  color?: XPCardColors;
  target: TargetRequestDTO | null;
}
