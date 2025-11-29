import { createContext, ReactNode } from "react";
import {
  ProjectConfigurationContextInterface,
  ProjectConfigurationProviderProps,
} from "./types";

export const ProjectConfigurationContext = createContext<
  ProjectConfigurationContextInterface | undefined
>(undefined);

export function ProjectConfigurationProvider({
  children,
}: ProjectConfigurationProviderProps): ReactNode {
  return (
    <ProjectConfigurationContext.Provider value={{}}>
      {children}
    </ProjectConfigurationContext.Provider>
  );
}
