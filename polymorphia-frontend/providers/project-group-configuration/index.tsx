import { createContext, ReactNode, useEffect, useState } from "react";
import {
  ProjectGroupConfigurationContextInterface,
  ProjectGroupConfigurationFilterId,
  ProjectGroupConfigurationProviderProps,
  ProjectGroupConfigurationStep,
  ProjectGroupConfigurationSteps,
} from "./types";
import { useProjectGroupConfiguration } from "@/hooks/course/useProjectGroupConfiguration";
import { ProjectGroupConfigurationResponseDTO } from "@/interfaces/api/project";
import { useProjectGroupConfigurationFilterConfigs } from "@/hooks/course/useProjectGroupConfigurationFilterConfigs";
import { useFilters } from "@/hooks/course/useFilters";

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
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

  const {
    data: filterConfigs,
    isLoading: isFilterConfigsLoading,
    isError: isFilterConfigsError,
  } = useProjectGroupConfigurationFilterConfigs(initialTarget);

  const filters = useFilters<ProjectGroupConfigurationFilterId>(
    filterConfigs ?? []
  );

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
        isGeneralDataLoading:
          isInitialProjectGroupConfigurationLoading || isFilterConfigsLoading,
        isGeneralDataError:
          isInitialProjectGroupConfigurationError || isFilterConfigsError,
        currentProjectGroupConfiguration,
        setCurrentProjectGroupConfiguration,
        filters,
        areFiltersOpen,
        setAreFiltersOpen,
      }}
    >
      {children}
    </ProjectGroupConfigurationContext.Provider>
  );
}
