import { createContext, ReactNode, useEffect, useState } from "react";
import {
  ProjectGroupConfigurationContextInterface,
  ProjectGroupConfigurationProviderProps,
  ProjectGroupConfigurationStep,
  ProjectGroupConfigurationSteps,
} from "./types";
import { useProjectGroupConfiguration } from "@/hooks/course/useProjectGroupConfiguration";
import { ProjectGroupConfigurationResponseDTO } from "@/interfaces/api/project";

export const ProjectGroupConfigurationContext = createContext<
  ProjectGroupConfigurationContextInterface | undefined
>(undefined);

export function ProjectGroupConfigurationProvider({
  children,
  initialTarget,
}: ProjectGroupConfigurationProviderProps): ReactNode {
  const [currentStep, setCurrentStep] = useState<ProjectGroupConfigurationStep>(
    ProjectGroupConfigurationSteps.GROUP_PICK
  );
  const [
    currentProjectGroupConfiguration,
    setCurrentProjectGroupConfiguration,
  ] = useState<ProjectGroupConfigurationResponseDTO>({
    studentIds: [],
    selectedVariants: {},
  });

  const {
    data: initialProjectGroupConfiugation,
    isLoading: isInitialProjectGroupConfigurationLoading,
    isError: isInitialProjectGroupConfigurationError,
  } = useProjectGroupConfiguration({ target: initialTarget });

  useEffect(() => {
    if (initialProjectGroupConfiugation) {
      setCurrentProjectGroupConfiguration(initialProjectGroupConfiugation);
    }
  }, [initialProjectGroupConfiugation]);

  return (
    <ProjectGroupConfigurationContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        initialTarget,
        isInitialProjectGroupConfigurationLoading,
        isInitialProjectGroupConfigurationError,
        currentProjectGroupConfiguration,
        setCurrentProjectGroupConfiguration,
      }}
    >
      {children}
    </ProjectGroupConfigurationContext.Provider>
  );
}
