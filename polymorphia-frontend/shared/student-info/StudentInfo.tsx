import Loading from "@/components/loading/Loading";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import useRandomUsers from "@/hooks/course/useRandomUsers";
import toast from "react-hot-toast";

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
          {data?.map((student) => {
            const { animalName, userName, evolutionStage, imageUrl } =
              student.userDetails;
            return (
              <XPCard
                key={animalName}
                title={userName ? userName : toast.error("No username found!")}
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
