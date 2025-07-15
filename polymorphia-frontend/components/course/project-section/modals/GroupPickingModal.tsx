"use state";
import { UserDetailsDTO } from "@/interfaces/api/DTO";
import Modal from "@/components/modal/Modal";
import Loading from "@/components/loading/Loading";
import XPCard from "@/components/xp-card/XPCard";
import { API_STATIC_URL } from "@/services/api";
import { useState } from "react";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";

export default function GroupPickingModal({
  onClosed,
  data,
  isLoading,
  isError,
}: {
  onClosed: () => void;
  data: UserDetailsDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}) {
  const [selectedUser, setSelectedUser] = useState<UserDetailsDTO | null>(null);

  const handleSelect = (user: UserDetailsDTO) => {
    if (selectedUser === user) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosed}
      title="Grupa"
      subtitle="Zaproś jedną osobę do grupy"
    >
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
        <div className="flex flex-col gap-3 min-w-[21rem] max-h-88 pr-4 -mr-4 overflow-y-scroll custom-scrollbar">
          {data?.map((user, index) => (
            <div
              key={index}
              className={`h-24`}
              onClick={() => handleSelect(user)}
            >
              <XPCard
                key={index}
                title={user.studentName}
                subtitle={user.evolutionStage}
                image={{
                  url: `${API_STATIC_URL}/${user.imageUrl}`,
                  alt: user.evolutionStage,
                }}
                size="xs"
                color={user === selectedUser ? "gold" : undefined}
              />
            </div>
          ))}
        </div>
      )}
      <div className="w-full mt-4">
        <ButtonWithBorder
          text="Potwierdź"
          className="w-full rounded-xl"
          onClick={onClosed}
        />
      </div>
    </Modal>
  );
}
