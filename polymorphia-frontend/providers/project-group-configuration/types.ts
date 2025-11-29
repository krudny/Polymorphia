import { ProjectGroupConfigurationResponseDTO } from "@/interfaces/api/project";
import { TargetRequestDTO } from "@/interfaces/api/target";
import { Dispatch, ReactNode, SetStateAction } from "react";

export const ProjectGroupConfigurationSteps = {
  GROUP_PICK: "GROUP_PICK",
  VARIANT_PICK: "VARIANT_PICK",
} as const;

export type ProjectGroupConfigurationStep =
  (typeof ProjectGroupConfigurationSteps)[keyof typeof ProjectGroupConfigurationSteps];

export interface ProjectGroupConfigurationContextInterface {
  currentStep: ProjectGroupConfigurationStep;
  setCurrentStep: Dispatch<SetStateAction<ProjectGroupConfigurationStep>>;

  isInitialProjectGroupConfigurationLoading: boolean;
  isInitialProjectGroupConfigurationError: boolean;

  currentProjectGroupConfiguration: ProjectGroupConfigurationResponseDTO;
  setCurrentProjectGroupConfiguration: Dispatch<
    SetStateAction<ProjectGroupConfigurationResponseDTO>
  >;
}

export interface ProjectGroupConfigurationProviderProps {
  children: ReactNode;
  initialTarget: TargetRequestDTO | null;
}
