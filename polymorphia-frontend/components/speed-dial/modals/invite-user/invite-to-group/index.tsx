"use client";

import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal/Modal";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "use-debounce";
import "./index.css";

function InviteUserToGroupModalContent() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  console.log(search);

  return (
    <>
      <div className="group-pick-wrapper">
        <span>search</span>
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder="Znajdź użytkownika..."
        />
      </div>
    </>
  );
}

export default function InviteUserToGroupModal({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Zaproś użytkownika do grupy"
    >
      <InviteUserToGroupModalContent />
    </Modal>
  );
}
