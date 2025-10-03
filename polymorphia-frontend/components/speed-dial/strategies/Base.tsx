import { SpeedDialItem } from "@/components/speed-dial/types";
import GradeModal from "@/components/speed-dial/modals/grade";
import ProjectVariantModal from "@/components/speed-dial/modals/project-variant";
import GroupModal from "@/components/speed-dial/modals/group-info";
import GroupPickingModal from "@/components/speed-dial/modals/group-pick";
import ImportCSVModal from "@/components/speed-dial/modals/import-csv";
import { ImportCSVType, ImportCSVTypes } from "@/interfaces/general";
import {
  useEditMarkdownSpeedDialDynamicBehavior,
  useRejectMarkdownSpeedDialDynamicBehavior,
  useResetMakrdownSpeedDialDynamicBehavior,
  useSaveMarkdownSpeedDialDynamicBehavior,
} from "@/hooks/speed-dial-dynamic-behavior/markdown";
import {
  useAppendToPathSpeedDialDynamicBehavior,
  useGoBackSpeedDialDynamicBehavior,
  useNavigateToParentUrlSpeedDialDynamicBehavior,
} from "@/hooks/speed-dial-dynamic-behavior/navigation";
import { Role } from "@/interfaces/api/user";
import { useProfileFiltersModalSpeedDialDynamicBehavior } from "@/hooks/speed-dial-dynamic-behavior/profile";

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

  protected createProjectGroupPicking(): SpeedDialItem {
    return {
      id: 4,
      orderIndex: 4,
      label: "Utwórz grupę",
      icon: "person_add",
      useDynamicBehavior: () => ({
        modal: (onClose) => <GroupPickingModal onClosedAction={onClose} />,
      }),
    };
  }

  protected createImportCSV(importType: ImportCSVType): SpeedDialItem {
    const importLabels = {
      [ImportCSVTypes.STUDENT_INVITE]: "Zaproś studentów z CSV",
      [ImportCSVTypes.GRADE_IMPORT]: "Wczytaj oceny z CSV",
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

  protected createInviteStudent(): SpeedDialItem {
    return {
      id: 5,
      orderIndex: 7,
      label: "Zaproś studenta",
      icon: "person_add",
      useDynamicBehavior: () => ({
        modal: (onClose) => (
          // TODO: import type
          <ImportCSVModal
            onClosedAction={onClose}
            importType={ImportCSVTypes.GRADE_IMPORT}
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
      useDynamicBehavior: useResetMakrdownSpeedDialDynamicBehavior,
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
}
