"use client";

import { useState } from "react";
import Modal from "@/components/modal/Modal";
import { InviteUserModalProps } from "./types";
import ImportCSVModal from "../import-csv";
import InviteUserToCourseModal from "./invite-to-course";
import { ImportCSVTypes, InviteTypes } from "@/interfaces/general";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";

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

  const handleCloseNestedModal = () => {
    setActiveModal(null);
  };

  if (activeModal === "MANUAL" && inviteType === InviteTypes.COURSE) {
    return <InviteUserToCourseModal onClosedAction={handleCloseNestedModal} />;
  }

  if (activeModal === "MANUAL" && inviteType === InviteTypes.GROUP) {
    // return <InviteUserToGroupModal onClosedAction={handleCloseNestedModal} />;
  }

  if (activeModal === "CSV" && inviteType === InviteTypes.COURSE) {
    return (
      <ImportCSVModal
        onClosedAction={handleCloseNestedModal}
        importType={ImportCSVTypes.STUDENT_INVITE}
      />
    );
  }

  if (activeModal === "CSV" && inviteType === InviteTypes.GROUP) {
    // return (
    //   <ImportCSVModal
    //     onClosedAction={handleCloseNestedModal}
    //     importType={ImportCSVTypes.GROUP_INVITE}
    //   />
    // );
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
