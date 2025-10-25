import ProjectVariantInfo from "@/shared/project-variant-info";
import ColumnComponent from "@/components/column-schema/column-component";

export function ProjectVariant() {
  return (
    <ColumnComponent
      topComponent={() => <h1>Warianty</h1>}
      mainComponent={() => <ProjectVariantInfo size="xs" color="gray" />}
    />
  );
}
