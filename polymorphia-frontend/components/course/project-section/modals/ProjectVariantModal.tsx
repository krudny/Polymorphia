import Modal from "@/components/modal/Modal";

export default function ProjectVariantModal({
  isActive,
  onClosed,
  data,
  isLoading,
  isError,
}: {
  isActive: boolean;
  onClosed: () => void;
  data: { variant: string; description: Record<string, string> } | undefined;
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading || !data) {
    return;
  }

  return (
    <Modal
      isDataPresented={isActive}
      onClosed={onClosed}
      title="Wariant projektu"
      subtitle={`Twój wariant projektu to ${data?.variant}.`}
    >
      {isError && (
        <div className="gradable-event-section text-xl 2xl:text-2xl">
          Wystąpił błąd przy ładowaniu szczegółów.
        </div>
      )}
      {!isLoading && data && (
        <div className="flex flex-col gap-y-5 max-w-xl">
          {Object.entries(data.description)
            .reverse()
            .map(([key, value]) => (
              <div key={key}>
                <p className="text-2xl whitespace-pre-line">
                  {key} - {value}
                </p>
              </div>
            ))}
        </div>
      )}
    </Modal>
  );
}
