import Loading from "@/components/loading";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import useRandomUsers from "@/hooks/course/useRandomUsers";
import ErrorState from "@/components/error-state";
import "./index.css";

export default function StudentInfo() {
  const { data, isLoading, isError } = useRandomUsers();

  return (
    <>
      {isError && (
        <div className="gradable-event-section text-xl 2xl:text-2xl">
          <ErrorState message="Nie udało się załadować informacji o studentach." />
        </div>
      )}
      {isLoading && (
        <div className="gradable-event-section h-50">
          <Loading />
        </div>
      )}
      {data && !isLoading && (
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
      )}
    </>
  );
}
