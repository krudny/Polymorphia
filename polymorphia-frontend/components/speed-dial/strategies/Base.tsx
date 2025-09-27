import { SpeedDialItem } from "@/components/speed-dial/types";
import GradeModal from "@/components/speed-dial/modals/grade";
import ProjectVariantModal from "@/components/speed-dial/modals/project-variant";
import { SpeedDialContext } from "@/components/speed-dial/strategies/types";
import GroupModal from "@/components/speed-dial/modals/group-info";
import GroupPickingModal from "@/components/speed-dial/modals/group-pick";
import ImportCSVModal from "@/components/speed-dial/modals/import-csv";
import { ImportCSVType, ImportCSVTypes } from "@/interfaces/general";
import {
  useEditMarkdownSpeedDialAction,
  useRejectMarkdownSpeedDialAction,
  useSaveMarkdownSpeedDialAction,
} from "@/hooks/speed-dial-actions/markdown";
import {
  useAppendToPathSpeedDialAction,
  useGoBackSpeedDialAction,
  useNavigateToParentUrlSpeedDialAction,
} from "@/hooks/speed-dial-actions/navigation";

export abstract class BaseSpeedDialStrategy {
  abstract getItems(context: SpeedDialContext): SpeedDialItem[];

  protected createRewards(): SpeedDialItem {
    return {
      id: 1,
      orderIndex: 5,
      label: "Nagrody",
      icon: "trophy",
      useAction: () => ({
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
      useAction: useSaveMarkdownSpeedDialAction,
      color: "#048635",
    };
  }

  protected createEdit(): SpeedDialItem {
    return {
      id: 6,
      orderIndex: 1,
      label: "Edytuj treść",
      icon: "edit",
      useAction: useEditMarkdownSpeedDialAction,
    };
  }

  protected createReject(): SpeedDialItem {
    return {
      id: 7,
      orderIndex: 0,
      label: "Anuluj edycję",
      icon: "close",
      useAction: useRejectMarkdownSpeedDialAction,
      color: "#a30d0d",
    };
  }

  protected createProjectVariant(): SpeedDialItem {
    return {
      id: 2,
      orderIndex: 2,
      label: "Wariant",
      icon: "arrow_split",
      useAction: () => ({
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
      useAction: () => ({
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
      useAction: () => ({
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
      useAction: () => ({
        modal: (onClose) => (
          <ImportCSVModal onClosedAction={onClose} importType={importType} />
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
      useAction: useGoBackSpeedDialAction,
    };
  }

  protected createRedirectToGrading(): SpeedDialItem {
    return {
      id: 11,
      orderIndex: 51,
      label: "Ocenianie",
      icon: "assignment_turned_in",
      useAction: () => useAppendToPathSpeedDialAction("/grading"),
    };
  }

  protected createRedirectToMarkdown(): SpeedDialItem {
    return {
      id: 9,
      orderIndex: 0,
      label: "Zobacz polecenie",
      icon: "task",
      useAction: useNavigateToParentUrlSpeedDialAction,
    };
  }

  protected createEditing(): SpeedDialItem[] {
    return [this.createEdit(), this.createSave(), this.createReject()];
  }
}
