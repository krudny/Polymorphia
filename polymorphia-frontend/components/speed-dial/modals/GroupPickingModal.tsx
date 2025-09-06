"use client";
import isStudent, { StudentDetailsDTO } from "@/interfaces/api/user";
import Modal from "@/components/modal/Modal";
import { ChangeEvent, useEffect, useState } from "react";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useDebounce } from "use-debounce";
import XPCard from "@/components/xp-card/XPCard";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import useRandomUsers from "@/hooks/course/useRandomUsers";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import useModalContext from "@/hooks/contexts/useModalContext";
import useUserContext from "@/hooks/contexts/useUserContext";

function GroupPickingModalContent() {
  const { closeModal } = useModalContext();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  // TODO: temporary logic
  const [group, setGroup] = useState<StudentDetailsDTO[]>([]);
  const currentUser = useUserContext();
  const { data: allUsers, isError } = useRandomUsers();
  if (!isStudent(currentUser)) {
    throw new Error("User is not a student");
  }

  useEffect(() => {
    if (currentUser && isStudent(currentUser)) {
      setGroup([currentUser.userDetails]);
    }
  }, [currentUser]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const handleClick = (user: StudentDetailsDTO) => {
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
          <div className="w-full h-fit max-h-[250px] mt-2 overflow-y-scroll flex flex-col gap-y-1 z-[999] custom-scrollbar">
            {allUsers && allUsers.length > 0 ? (
              allUsers?.map((user, index) => (
                <div key={index} className="min-h-fit">
                  <XPCard
                    title={user.userDetails.userName}
                    subtitle={
                      user.userDetails.group +
                      " | " +
                      user.userDetails.evolutionStage
                    }
                    leftComponent={
                      <XPCardImage
                        imageUrl={user.userDetails.imageUrl}
                        alt={user.userDetails.evolutionStage}
                      />
                    }
                    size="xs"
                    onClick={() => handleClick(user.userDetails)}
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
              title={user.userName}
              subtitle={user.group + " | " + user.evolutionStage}
              leftComponent={
                <XPCardImage
                  imageUrl={user.imageUrl}
                  alt={user.evolutionStage}
                />
              }
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

export default function GroupPickingModal({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Grupa"
      subtitle="Zaproś jedną osobę do grupy"
    >
      <GroupPickingModalContent />
    </Modal>
  );
}
