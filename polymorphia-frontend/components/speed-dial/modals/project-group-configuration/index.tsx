import { ProjectConfigurationModalProps } from "@/components/speed-dial/modals/project-group-configuration/types";
import { ProjectConfigurationProvider } from "@/providers/project-group-configuration";
import { ReactNode } from "react";
import { SpeedDialModalProps } from "../types";
import Modal from "@/components/modal/Modal";

function ProjectConfigurationModalContent({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Konfiguracja grupy"
    ></Modal>
  );
}

export default function ProjectConfigurationModal({
  onClosedAction,
  initialTarget,
}: ProjectConfigurationModalProps): ReactNode {
  return (
    <ProjectConfigurationProvider initialTarget={initialTarget}>
      <ProjectConfigurationModalContent onClosedAction={onClosedAction} />
    </ProjectConfigurationProvider>
  );
}
