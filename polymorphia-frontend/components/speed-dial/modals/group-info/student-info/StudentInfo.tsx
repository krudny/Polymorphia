import Loading from "@/components/loading";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import ErrorComponent from "@/components/error";
import "./index.css";
import { useProjectGroup } from "@/hooks/course/projects/useProjectGroup";

export default function StudentInfo() {
  const { data, isLoading, isError } = useProjectGroup();

  if (isLoading) {
    return (
      <div className="gradable-event-section h-50 relative">
        <Loading />
      </div>
    );
  }
  if (isError || data === undefined) {
    return (
      <ErrorComponent message="Nie udało się załadować informacji o składzie grupy." />
    );
  }

  if (data.length === 0) {
    return <ErrorComponent message="Nie należysz do żadnej grupy." />;
  }

  return (
    <div className="flex flex-col gap-2 min-w-80">
      {data?.map((student) => {
        const { animalName, fullName, evolutionStage, imageUrl } =
          student.userDetails;

        if (!fullName) {
          throw new Error("No userName defined!");
        }

        return (
          <XPCard
            key={animalName}
            title={fullName}
            subtitle={evolutionStage}
            leftComponent={
              <XPCardImage imageUrl={imageUrl} alt={evolutionStage} />
            }
            size="xs"
          />
        );
      })}
    </div>
  );
}
