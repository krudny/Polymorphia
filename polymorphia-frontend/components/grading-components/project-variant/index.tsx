import ProjectVariantInfo from "@/shared/project-variant-info";
import GradingComponentWrapper from "@/components/grading-components/grading-wrapper";

export function ProjectVariant() {
  return (
    <GradingComponentWrapper
      topComponent={<h1>Warianty</h1>}
      mainComponent={() => <ProjectVariantInfo size="xs" color="gray" />}
    />
  );
}
