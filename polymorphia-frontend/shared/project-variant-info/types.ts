import { XPCardColor } from "@/components/xp-card/types";
import { Size } from "@/interfaces/general";
import { ProjectVariantResponseDTO } from "@/interfaces/api/project";

export interface ProjectVariantInfoProps {
  size?: Size;
  color?: XPCardColor;
  projectVariants: ProjectVariantResponseDTO[];
}
