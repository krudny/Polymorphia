import { XPCardColor } from "@/components/xp-card/types";
import { Size } from "@/interfaces/general";
import { TargetRequestDTO } from "@/interfaces/api/target";

export interface ProjectVariantInfoProps {
  size?: Size;
  color?: XPCardColor;
  target: TargetRequestDTO | null;
}
