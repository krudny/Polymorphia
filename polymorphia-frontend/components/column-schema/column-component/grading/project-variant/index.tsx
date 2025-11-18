import ProjectVariantInfo from "@/shared/project-variant-info";
import ColumnComponent from "@/components/column-schema/column-component";
import useTargetContext from "@/hooks/contexts/useTargetContext";

export function ProjectVariant() {
  const { state } = useTargetContext();

  return (
    <ColumnComponent
      topComponent={() => <h1>Warianty</h1>}
      mainComponent={() => <ProjectVariantInfo size="xs" color="gray" />}
      hidden={state.selectedTarget === null}
    />
  );
}
