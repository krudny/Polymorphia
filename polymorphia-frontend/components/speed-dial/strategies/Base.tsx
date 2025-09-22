import {SpeedDialItem} from "@/components/speed-dial/types";
import GradeModal from "@/components/speed-dial/modals/grade";
import ProjectVariantModal from "@/components/speed-dial/modals/project-variant";
import {SpeedDialContext} from "@/components/speed-dial/strategies/types";
import GroupModal from "@/components/speed-dial/modals/group-info";
import GroupPickingModal from "@/components/speed-dial/modals/group-pick";
import ImportCSVModal from "@/components/speed-dial/modals/import-csv";
import {ImportCSVType, ImportCSVTypes} from "@/interfaces/general";
import InviteStudentModal from "@/components/speed-dial/modals/invite-student";

export abstract class BaseSpeedDialStrategy {
  abstract getItems(context: SpeedDialContext): SpeedDialItem[];

  protected createRewards(): SpeedDialItem {
    return {
      id: 1,
      orderIndex: 5,
      label: "Nagrody",
      icon: "trophy",
      modal: (onClose) => <GradeModal onClosedAction={onClose} />,
    };
  }

  protected createSave(context: SpeedDialContext): SpeedDialItem {
    return {
      id: 5,
      orderIndex: 1,
      label: "Zapisz markdown",
      icon: "save",
      onClick: () => context.saveMarkdown(),
      color: "#048635",
    };
  }

  protected createEdit(context: SpeedDialContext): SpeedDialItem {
    return {
      id: 6,
      orderIndex: 1,
      label: "Edytuj treść",
      icon: "edit",
      onClick: () => context.setIsEditing(true),
    };
  }

  protected createReject(context: SpeedDialContext): SpeedDialItem {
    return {
      id: 7,
      orderIndex: 0,
      label: "Anuluj edycję",
      icon: "close",
      onClick: () => context.rejectMarkdown(),
      color: "#a30d0d",
    };
  }

  protected createProjectVariant(): SpeedDialItem {
    return {
      id: 2,
      orderIndex: 2,
      label: "Wariant",
      icon: "arrow_split",
      modal: (onClose) => <ProjectVariantModal onClosedAction={onClose} />,
    };
  }

  protected createProjectGroup(): SpeedDialItem {
    return {
      id: 3,
      orderIndex: 3,
      label: "Grupa",
      icon: "person",
      modal: (onClose) => <GroupModal onClosedAction={onClose} />,
    };
  }

  protected createProjectGroupPicking(): SpeedDialItem {
    return {
      id: 4,
      orderIndex: 4,
      label: "Utwórz grupę",
      icon: "person_add",
      modal: (onClose) => <GroupPickingModal onClosedAction={onClose} />,
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
      modal: (onClose) => (
        <ImportCSVModal onClosedAction={onClose} importType={importType} />
      ),
    };
  }

  protected createInviteStudent(): SpeedDialItem {
    return {
      id: 5,
      orderIndex: 7,
      label: "Zaproś studenta",
      icon: "person_add",
      modal: (onClose) => (
        <InviteStudentModal onClosedAction={onClose}/>
      ),
    };
  }



  protected createGoBack(context: SpeedDialContext): SpeedDialItem {
    return {
      id: 10,
      orderIndex: 50,
      label: "Wróć",
      icon: "undo",
      onClick: () => context.router.back(),
    };
  }

  protected createRedirectToGrading(context: SpeedDialContext): SpeedDialItem {
    return {
      id: 11,
      orderIndex: 51,
      label: "Ocenianie",
      icon: "assignment_turned_in",
      onClick: () => {
        const newPath = context.currentPath + "/grading";
        context.router.push(newPath);
      },
    };
  }

  protected createRedirectToMarkdown(context: SpeedDialContext): SpeedDialItem {
    return {
      id: 9,
      orderIndex: 0,
      label: "Zobacz polecenie",
      icon: "task",
      onClick: () => {
        const newPath = context.currentPath.split("/").slice(0, -1).join("/");
        context.router.push(newPath);
      },
    };
  }

  protected createEditing(context: SpeedDialContext): SpeedDialItem[] {
    return context.isEditing
      ? [this.createSave(context), this.createReject(context)]
      : [this.createEdit(context)];
  }
}
