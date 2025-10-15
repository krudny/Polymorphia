"use client";

import { useState } from "react";
import Modal from "@/components/modal/Modal";
import { InviteUserModalProps } from "./types";
import ImportCSVModal from "../import-csv";
import InviteUserToCourseModal from "./invite-to-course";
import { ImportCSVTypes, InviteTypes } from "@/interfaces/general";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";
import toast from "react-hot-toast";

export default function InviteUserModal({
  onClosedAction,
  inviteType,
}: InviteUserModalProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleManualClick = () => {
    setActiveModal("MANUAL");
  };

  const handleCSVClick = () => {
    setActiveModal("CSV");
  };

  if (activeModal === "MANUAL" && inviteType === InviteTypes.COURSE) {
    return <InviteUserToCourseModal onClosedAction={onClosedAction} />;
  }

  if (activeModal === "MANUAL" && inviteType === InviteTypes.GROUP) {
    toast.error("Not implemented");
  }

  if (activeModal === "CSV" && inviteType === InviteTypes.COURSE) {
    return (
      <ImportCSVModal
        onClosedAction={onClosedAction}
        importType={ImportCSVTypes.STUDENT_INVITE}
      />
    );
  }

  if (activeModal === "CSV" && inviteType === InviteTypes.GROUP) {
    return (
      <ImportCSVModal
        onClosedAction={onClosedAction}
        importType={ImportCSVTypes.GROUP_INVITE}
      />
    );
  }

  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Zaproś użytkownika"
    >
      <div className="invite-user-wrapper">
        <ButtonWithBorder
          text="Manualnie"
          onClick={handleManualClick}
          className="!w-full"
        />
        <ButtonWithBorder
          text="Z CSV"
          onClick={handleCSVClick}
          className="!w-full"
        />
      </div>
    </Modal>
  );
}
