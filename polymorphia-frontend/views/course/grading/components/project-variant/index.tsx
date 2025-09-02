import ProjectVariantInfo from "@/shared/project-variant-info";
import GradingComponentWrapper from "@/views/course/grading/components/grading-wrapper";

export function ProjectVariant() {
  return (
    <GradingComponentWrapper
      topComponent={<h1 className="text-5xl">Warianty</h1>}
      mainComponent={<ProjectVariantInfo size="xs" />}
    />
  );
}
