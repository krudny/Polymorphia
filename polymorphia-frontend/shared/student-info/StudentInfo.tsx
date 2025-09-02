import Loading from "@/components/loading/Loading";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import useRandomUsers from "@/hooks/course/useRandomUsers";

export default function StudentInfo() {
  const { data, isLoading, isError } = useRandomUsers();

  return (
    <>
      {isError && (
        <div className="gradable-event-section text-xl 2xl:text-2xl">
          Wystąpił błąd przy ładowaniu szczegółów.
        </div>
      )}
      {isLoading && (
        <div className="gradable-event-section h-50">
          <Loading />
        </div>
      )}
      {data && !isLoading && (
        <div className="flex flex-col gap-2 min-w-80">
          {data?.map((student) => (
            <XPCard
              key={student.animalName}
              title={student.userName}
              subtitle={student.evolutionStage}
              leftComponent={
                <XPCardImage
                  imageUrl={student.imageUrl}
                  alt={student.evolutionStage}
                />
              }
              size="xs"
            />
          ))}
        </div>
      )}
    </>
  );
}
