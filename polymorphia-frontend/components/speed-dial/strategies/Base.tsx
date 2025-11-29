import { SpeedDialItem } from "@/components/speed-dial/types";
import GradeModal from "@/components/speed-dial/modals/grade";
import ProjectVariantModal from "@/components/speed-dial/modals/project-variant";
import GroupModal from "@/components/speed-dial/modals/group-info";
import ImportCSVModal from "@/components/speed-dial/modals/import-csv";
import {
  ImportCSVType,
  ImportCSVTypes,
  InviteTypes,
} from "@/interfaces/general";
import {
  useEditMarkdownSpeedDialDynamicBehavior,
  useRejectMarkdownSpeedDialDynamicBehavior,
  useResetMarkdownSpeedDialDynamicBehavior,
  useSaveMarkdownSpeedDialDynamicBehavior,
} from "@/hooks/speed-dial-dynamic-behavior/markdown";
import {
  useAppendToPathSpeedDialDynamicBehavior,
  useGoBackSpeedDialDynamicBehavior,
  useNavigateToParentUrlSpeedDialDynamicBehavior,
} from "@/hooks/speed-dial-dynamic-behavior/navigation";
import { Role } from "@/interfaces/api/user";
import { useProfileFiltersModalSpeedDialDynamicBehavior } from "@/hooks/speed-dial-dynamic-behavior/profile";
import InviteUserModal from "@/components/speed-dial/modals/invite-user";
import SubmissionsModal from "@/components/speed-dial/modals/submission";
import ProjectGroupConfigurationModal from "../modals/project-group-configuration";
import { useEditProjectGroupConfigurationModalSpeedDialDynamicBehavior } from "@/hooks/speed-dial-dynamic-behavior/project-group-configuration";

export abstract class BaseSpeedDialStrategy {
  abstract getItems(role: Role): SpeedDialItem[];

  protected createRewards(): SpeedDialItem {
    return {
      id: 1,
      orderIndex: 5,
      label: "Nagrody",
      icon: "trophy",
      useDynamicBehavior: () => ({
        modal: (onClose) => <GradeModal onClosedAction={onClose} />,
      }),
    };
  }

  protected createSave(): SpeedDialItem {
    return {
      id: 5,
      orderIndex: 1,
      label: "Zapisz markdown",
      icon: "save",
      useDynamicBehavior: useSaveMarkdownSpeedDialDynamicBehavior,
      color: "#048635",
    };
  }

  protected createEdit(): SpeedDialItem {
    return {
      id: 6,
      orderIndex: 1,
      label: "Edytuj treść",
      icon: "edit",
      useDynamicBehavior: useEditMarkdownSpeedDialDynamicBehavior,
    };
  }

  protected createReject(): SpeedDialItem {
    return {
      id: 7,
      orderIndex: 0,
      label: "Anuluj edycję",
      icon: "close",
      useDynamicBehavior: useRejectMarkdownSpeedDialDynamicBehavior,
      color: "#a30d0d",
    };
  }

  protected createProjectVariant(): SpeedDialItem {
    return {
      id: 2,
      orderIndex: 2,
      label: "Wariant",
      icon: "arrow_split",
      useDynamicBehavior: () => ({
        modal: (onClose) => <ProjectVariantModal onClosedAction={onClose} />,
      }),
    };
  }

  protected createProjectGroup(): SpeedDialItem {
    return {
      id: 3,
      orderIndex: 3,
      label: "Grupa",
      icon: "person",
      useDynamicBehavior: () => ({
        modal: (onClose) => <GroupModal onClosedAction={onClose} />,
      }),
    };
  }

  protected createImportCSV(importType: ImportCSVType): SpeedDialItem {
    const importLabels = {
      [ImportCSVTypes.STUDENT_INVITE]: "Zaproś studentów do kursu z CSV",
      [ImportCSVTypes.GRADE_IMPORT]: "Wczytaj oceny z CSV",
      [ImportCSVTypes.GROUP_INVITE]: "Zaproś studentów do grupy z CSV",
    } as const;

    return {
      id: 4,
      orderIndex: 9,
      label: importLabels[importType] ?? "Import CSV",
      icon: "cloud_upload",
      useDynamicBehavior: () => ({
        modal: (onClose) => (
          <ImportCSVModal onClosedAction={onClose} importType={importType} />
        ),
      }),
    };
  }

  protected createInviteUserToCourse(): SpeedDialItem {
    return {
      id: 5,
      orderIndex: 7,
      label: "Zaproś użytkownika do kursu",
      icon: "person_add",
      useDynamicBehavior: () => ({
        modal: (onClose) => (
          <InviteUserModal
            onClosedAction={onClose}
            inviteType={InviteTypes.COURSE}
          />
        ),
      }),
    };
  }

  protected createInviteUserToGroup(): SpeedDialItem {
    return {
      id: 6,
      orderIndex: 8,
      label: "Zaproś użytkownika do grupy",
      icon: "group_add",
      useDynamicBehavior: () => ({
        modal: (onClose) => (
          <InviteUserModal
            onClosedAction={onClose}
            inviteType={InviteTypes.GROUP}
          />
        ),
      }),
    };
  }

  protected createGoBack(): SpeedDialItem {
    return {
      id: 10,
      orderIndex: 50,
      label: "Wróć",
      icon: "undo",
      useDynamicBehavior: useGoBackSpeedDialDynamicBehavior,
    };
  }

  protected createRedirectToGrading(): SpeedDialItem {
    return {
      id: 11,
      orderIndex: 51,
      label: "Ocenianie",
      icon: "assignment_turned_in",
      useDynamicBehavior: () =>
        useAppendToPathSpeedDialDynamicBehavior("/grading"),
    };
  }

  protected createRedirectToMarkdown(): SpeedDialItem {
    return {
      id: 9,
      orderIndex: 0,
      label: "Zobacz polecenie",
      icon: "task",
      useDynamicBehavior: useNavigateToParentUrlSpeedDialDynamicBehavior,
    };
  }

  protected createMarkdownReset(): SpeedDialItem {
    return {
      id: 9,
      orderIndex: 0,
      label: "Zresetuj polecenie",
      icon: "history",
      useDynamicBehavior: useResetMarkdownSpeedDialDynamicBehavior,
    };
  }

  protected createEditing(): SpeedDialItem[] {
    return [this.createEdit(), this.createSave(), this.createReject()];
  }

  protected createProfileFilters(): SpeedDialItem {
    return {
      id: 12,
      orderIndex: 1,
      label: "Filtry",
      icon: "tune",
      useDynamicBehavior: useProfileFiltersModalSpeedDialDynamicBehavior,
    };
  }

  protected createSubmissions(): SpeedDialItem {
    return {
      id: 13,
      orderIndex: 1,
      label: "Oddawanie zadania",
      icon: "upload_file",
      useDynamicBehavior: () => ({
        modal: (onClose) => <SubmissionsModal onClosedAction={onClose} />,
      }),
    };
  }

  protected createNewProjectGroupConfiguration(): SpeedDialItem {
    return {
      id: 14,
      orderIndex: -2,
      label: "Nowa grupa projektowa",
      icon: "group_add",
      useDynamicBehavior: () => ({
        modal: (onClose) => (
          <ProjectGroupConfigurationModal
            onClosedAction={onClose}
            initialTarget={null}
          />
        ),
      }),
    };
  }

  protected createEditProjectGroupConfiguration(): SpeedDialItem {
    return {
      id: 15,
      orderIndex: -1,
      label: "Edytuj grupę projektową",
      icon: "edit",
      useDynamicBehavior:
        useEditProjectGroupConfigurationModalSpeedDialDynamicBehavior,
    };
  }
}
