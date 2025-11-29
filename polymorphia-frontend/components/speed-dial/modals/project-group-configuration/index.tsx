import {
  ProjectGroupConfigurationModalProps,
  ProjectGroupConfigurationModalResult,
} from "@/components/speed-dial/modals/project-group-configuration/types";
import { ProjectGroupConfigurationProvider } from "@/providers/project-group-configuration";
import { ReactNode } from "react";
import { SpeedDialModalProps } from "../types";
import Modal from "@/components/modal/Modal";
import useProjectGroupConfigurationContext from "@/hooks/contexts/useProjectGroupConfigurationContext";
import Loading from "@/components/loading";
import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";
import { ProjectGroupConfigurationSteps } from "@/providers/project-group-configuration/types";
import ProjectGroupPick from "./group-pick";
import ProjectVariantPick from "./variant-pick";

function ProjectGroupConfigurationModalContent({
  onClosedAction,
}: SpeedDialModalProps) {
  const {
    isInitialProjectGroupConfigurationLoading,
    isInitialProjectGroupConfigurationError,
    currentStep,
  } = useProjectGroupConfigurationContext();

  const renderData = (): ProjectGroupConfigurationModalResult => {
    switch (true) {
      case isInitialProjectGroupConfigurationLoading:
        return {
          content: (
            <div className="relative">
              <Loading />
            </div>
          ),
          subtitle: "",
        };

      case isInitialProjectGroupConfigurationError:
        return {
          content: (
            <ErrorComponent
              message="Nie udało się załadować konfiguracji istniejącej grupy projektowej."
              size={ErrorComponentSizes.COMPACT}
            />
          ),
          subtitle: "",
        };

      case currentStep === ProjectGroupConfigurationSteps.GROUP_PICK:
        return {
          content: <ProjectGroupPick />,
          subtitle: "Wybierz skład grupy projektowej",
        };
      case currentStep === ProjectGroupConfigurationSteps.VARIANT_PICK:
        return {
          content: <ProjectVariantPick />,
          subtitle: "Wybierz warianty projektu",
        };
    }

    return {
      content: <ErrorComponent size={ErrorComponentSizes.COMPACT} />,
      subtitle: "",
    };
  };

  const { content, subtitle } = renderData();

  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Konfiguracja grupy"
      subtitle={subtitle}
    >
      <div className="flex-col-centered min-h-80 min-w-80">{content}</div>
    </Modal>
  );
}

export default function ProjectGroupConfigurationModal({
  onClosedAction,
  initialTarget,
}: ProjectGroupConfigurationModalProps): ReactNode {
  return (
    <ProjectGroupConfigurationProvider initialTarget={initialTarget}>
      <ProjectGroupConfigurationModalContent onClosedAction={onClosedAction} />
    </ProjectGroupConfigurationProvider>
  );
}
