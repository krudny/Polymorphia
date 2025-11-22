import ProjectVariantInfo from "@/shared/project-variant-info";
import ColumnComponent from "@/components/column-schema/column-component";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import ColumnSwappableComponent from "../../shared/column-swappable-component";
import { ProjectVariantResponseDTO } from "@/interfaces/api/project";
import {
  errorComponent,
  noProjectVariantsErrorComponent,
} from "@/shared/project-variant-info/errors";

export function ProjectVariant() {
  const { projectVariants, isSpecificDataLoading, isSpecificDataError } =
    useGradingContext();
  const { state: targetState } = useTargetContext();

  const topComponent = () => <h1>Warianty</h1>;

  const mainComponent = () => (
    <ColumnSwappableComponent<ProjectVariantResponseDTO[]>
      data={projectVariants}
      isDataLoading={isSpecificDataLoading}
      isDataError={isSpecificDataError}
      renderComponent={(data, key) => (
        <ProjectVariantInfo
          key={key}
          projectVariants={data}
          size="xs"
          color="gray"
        />
      )}
      renderDataErrorComponent={() => errorComponent}
      renderEmptyDataErrorComponent={() => noProjectVariantsErrorComponent}
      minHeightClassName="min-h-[250px]"
      selectedTarget={targetState.selectedTarget}
    />
  );

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
      hidden={targetState.selectedTarget === null}
    />
  );
}
