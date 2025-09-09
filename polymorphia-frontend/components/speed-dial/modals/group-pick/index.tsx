"use client";
import { UserDetailsDTO } from "@/interfaces/api/user";
import Modal from "@/components/modal/Modal";
import { ChangeEvent, useEffect, useState } from "react";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useDebounce } from "use-debounce";
import XPCard from "@/components/xp-card/XPCard";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import useCurrentUser from "@/hooks/general/useUser";
import useRandomUsers from "@/hooks/course/useRandomUsers";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import useModalContext from "@/hooks/contexts/useModalContext";
import "./index.css";

function GroupPickingModalContent() {
  const { closeModal } = useModalContext();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  // TODO: temporary logic
  const [group, setGroup] = useState<UserDetailsDTO[]>([]);
  const { data: currentUser } = useCurrentUser();
  const { data: allUsers, isError } = useRandomUsers();

  useEffect(() => {
    if (currentUser) {
      setGroup([currentUser]);
    }
  }, [currentUser]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const handleClick = (user: UserDetailsDTO) => {
    if (currentUser && group.length < 2) {
      setGroup((prev) => [...prev, user]);
    }
  };

  return (
    <>
      {isError && (
        <div className="group-pick-error">
          Wystąpił błąd przy ładowaniu szczegółów.
        </div>
      )}
      <form
        className="group-pick"
        autoComplete="off"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="group-pick-wrapper">
          <span>search</span>
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            placeholder="Znajdź zwierzaka..."
            className="group-pick-input"
          />
        </div>
        {debouncedSearch && (
          <div className="group-pick-search">
            {allUsers && allUsers.length > 0 ? (
              allUsers?.map((user, index) => (
                <div key={index} className="group-pick-card">
                  <XPCard
                    title={user.studentName}
                    subtitle={user.group + " | " + user.evolutionStage}
                    leftComponent={
                      <XPCardImage
                        imageUrl={user.imageUrl}
                        alt={user.evolutionStage}
                      />
                    }
                    size="xs"
                    onClick={() => handleClick(user)}
                  />
                </div>
              ))
            ) : (
              <div className="group-pick-no-results">
                Nie znaleziono pasujących osób
              </div>
            )}
          </div>
        )}
      </form>
      <h3 className="group-pick-text">Twoja grupa</h3>
      <div className="group-pick-group">
        {group?.map((user, index) => (
          <div key={index} className="group-pick-card">
            <XPCard
              title={user.studentName}
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
      <div className="group-pick-button">
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
