import Loading from "@/components/loading/Loading";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardProjectVariant from "@/components/xp-card/components/XPCardProjectVariant";
import useProjectVariant from "@/hooks/course/useProjectVariant";
import { ProjectVariantInfoProps } from "@/shared/project-variant-info/types";
import "./index.css";

export default function ProjectVariantInfo({
  size = "sm",
  color = "gray",
}: ProjectVariantInfoProps) {
  const { data, isLoading, isError } = useProjectVariant();

  return (
    <>
      {isError && (
        <div className="project-variant-info">
          Wystąpił błąd przy ładowaniu szczegółów.
        </div>
      )}
      {isLoading && (
        <div className="project-variant-info h-50">
          <Loading />
        </div>
      )}
      {!isLoading && data && (
        <div className="project-variant-info">
          {data.map((projectVariant, index) => (
            <XPCard
              title={projectVariant.name}
              subtitle={projectVariant.categoryName}
              key={index}
              leftComponent={
                <XPCardImage
                  imageUrl={projectVariant.imageUrl}
                  alt={projectVariant.name}
                />
              }
              rightComponent={
                <XPCardProjectVariant
                  shortCode={projectVariant.shortCode}
                  color={color}
                />
              }
              size={size}
            />
          ))}
        </div>
      )}
    </>
  );
}
