import Modal from "@/components/modal";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import ProjectVariantInfo from "@/shared/project-variant-info";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { TargetTypes } from "@/interfaces/api/target";
import useProjectVariant from "@/hooks/course/useProjectVariant";
import {
  errorComponent,
  noProjectVariantsErrorComponent,
} from "@/shared/project-variant-info/errors";
import ColumnSwappableComponent from "@/components/column-schema/column-component/shared/column-swappable-component";
import { ProjectVariantWithCategoryNameResponseDTO } from "@/interfaces/api/project";
import { useMediaQuery } from "react-responsive";

export default function ProjectVariantModal({
  onClosedAction,
}: SpeedDialModalProps) {
  const userDetails = useUserDetails();
  const target = {
    type: TargetTypes.STUDENT,
    id: userDetails.id,
  };
  const { data, isLoading, isError } = useProjectVariant({ target });
  const isSm = useMediaQuery({ minWidth: 640 });

  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Wariant projektu"
      subtitle="Oto przydzielone Tobie warianty projektu:"
    >
      <ColumnSwappableComponent<ProjectVariantWithCategoryNameResponseDTO[]>
        data={data}
        isDataLoading={isLoading}
        isDataError={isError}
        renderComponent={(data, key) => (
          <ProjectVariantInfo
            key={key}
            projectVariants={data}
            size={isSm ? "sm" : "xs"}
          />
        )}
        renderDataErrorComponent={() => errorComponent}
        renderEmptyDataErrorComponent={() => noProjectVariantsErrorComponent}
        minHeightClassName="min-[26rem]:min-h-[210px] sm:min-h-[260px] "
        className="min-[26rem]:w-96 sm:w-[430px]"
        selectedTarget={target}
      />
    </Modal>
  );
}
