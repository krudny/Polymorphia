"use client";
import { UserDetailsDTO } from "@/interfaces/api/DTO";
import Modal from "@/components/modal/Modal";
import { useEffect, useState } from "react";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { API_STATIC_URL } from "@/services/api";
import XPCard from "@/components/xp-card/XPCard";
import UserService from "@/app/(logged-in)/profile/UserService";
import { useModal } from "@/components/providers/modal/ModalContext";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";

function GroupPickingModalContent() {
  const { closeModal } = useModal();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  // TODO: temporary logic
  const [group, setGroup] = useState<UserDetailsDTO[]>([]);

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => UserService.getCurrentUser(),
  });

  useEffect(() => {
    if (currentUser) {
      setGroup([currentUser]);
    }
  }, [currentUser]);

  const { data, isError } = useQuery({
    queryKey: ["allUsers", debouncedSearch],
    queryFn: () => EventSectionService.getRandomPeople(debouncedSearch),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleClick = (user: UserDetailsDTO) => {
    if (currentUser && group.length < 2) {
      setGroup((prev) => [...prev, user]);
    }
  };

  return (
    <>
      {isError && (
        <div className="gradable-event-section text-xl 2xl:text-2xl">
          Wystąpił błąd przy ładowaniu szczegółów.
        </div>
      )}
      <form
        className="w-full flex-col-centered"
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="w-full h-full flex align-center text-2xl border-b-2  border-primary-dark dark:border-secondary-light min-w-92">
          <span className="material-symbols text-3xl text-primary-dark dark:text-secondary-light">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            placeholder="Znajdź zwierzaka..."
            className="w-full ml-2 text-primary-dark dark:text-secondary-light placeholder-primary-dark dark:placeholder-secondary-light focus:outline-none"
          />
        </div>
        {debouncedSearch && (
          <div className="w-full h-[250px] mt-2 overflow-y-scroll flex flex-col gap-y-1 z-[999] custom-scrollbar">
            {data && data.length > 0 ? (
              data?.map((user, index) => (
                <div key={index} className="min-h-fit">
                  <XPCard
                    title={user.studentName}
                    subtitle={user.group + " | " + user.evolutionStage}
                    image={{
                      url: `${API_STATIC_URL}/${user.imageUrl}`,
                      alt: user.evolutionStage,
                    }}
                    size="xs"
                    onClick={() => handleClick(user)}
                  />
                </div>
              ))
            ) : (
              <div className="w-full h-full flex-col-centered text-2xl">
                Nie znaleziono pasujących osób
              </div>
            )}
          </div>
        )}
      </form>
      <h3 className="text-3xl mt-4">Twoja grupa</h3>
      <div className="w-full mt-2 overflow-y-scroll flex flex-col gap-y-1 z-[999]">
        {group?.map((user, index) => (
          <div key={index} className="min-h-fit">
            <XPCard
              title={user.studentName}
              subtitle={user.group + " | " + user.evolutionStage}
              image={{
                url: `${API_STATIC_URL}/${user.imageUrl}`,
                alt: user.evolutionStage,
              }}
              size="xs"
            />
          </div>
        ))}
      </div>
      <div className="w-full mt-4">
        <ButtonWithBorder
          text="Potwierdź"
          className="w-full rounded-xl"
          onClick={closeModal}
        />
      </div>
    </>
  );
}

export default function GroupPickingModal({ onClosed }: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosed}
      title="Grupa"
      subtitle="Zaproś jedną osobę do grupy"
    >
      <GroupPickingModalContent />
    </Modal>
  );
}
