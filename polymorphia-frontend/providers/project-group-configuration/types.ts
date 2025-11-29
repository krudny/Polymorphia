import { TargetRequestDTO } from "@/interfaces/api/target";
import { ReactNode } from "react";

export interface ProjectConfigurationContextInterface {}

export interface ProjectConfigurationProviderProps {
  children: ReactNode;
  initialTarget: TargetRequestDTO | null;
}
