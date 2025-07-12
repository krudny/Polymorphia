"use client";

import Modal from "@/components/modal/Modal";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "../index.css";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { ProjectService } from "@/components/course/project-section/ProjectService";

export default function PullRequest({
  isActive,
  onClosed,
  prUrl,
}: {
  isActive: boolean;
  onClosed: () => void;
  prUrl: string;
}) {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [pullRequest, setPullRequest] = useState<string>(
    "https://github.com/krudny/Polymorphia/pull/42"
  );
  const [inputValue, setInputValue] = useState<string>(
    "https://github.com/krudny/Polymorphia/pull/42"
  );

  const mutation = useMutation({
    mutationFn: ProjectService.addPrUrl,
    onSuccess: () => toast.success("Zapisano pull request"),
    onError: () => toast.error("Błędny pull request"),
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    const githubPrRegex = /^https:\/\/github\.com\/[\w-]+\/[\w-]+\/pull\/\d+$/;

    if (githubPrRegex.test(inputValue)) {
      setPullRequest(inputValue);
      setEditing(false);

      return;
    }
  };

  return (
    <Modal
      isDataPresented={isActive}
      onClosed={onClosed}
      title="Pull Request"
      subtitle={true ? "Twój pull request został zapisany!" : ""}
    >
      <div className="flex flex-col w-fit min-w-60">
        {(isEditing || pullRequest) && (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Wpisz link do pull requesta"
            readOnly={!isEditing}
            className="event-section-pr-modal-input border-b-2 text-xl truncate overflow-hidden whitespace-nowrap"
          />
        )}
        {!pullRequest && (
          <div className="w-full whitespace-nowrap mt-4">
            <ButtonWithBorder
              text={isEditing ? "Zapisz pull request" : "Dodaj pull request"}
              className="!mx-0 w-full"
              size="sm"
              onClick={isEditing ? () => handleSave : () => setEditing(true)}
            />
          </div>
        )}
        {pullRequest && (
          <div className="flex gap-x-2 mt-4">
            <div className="w-fit whitespace-nowrap">
              <ButtonWithBorder
                text="Zobacz zadanie"
                className="!mx-0"
                size="sm"
              />
            </div>
            <div className="w-fit whitespace-nowrap">
              <ButtonWithBorder
                text="Usuń zadanie"
                className="!mx-0"
                size="sm"
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
