import { SpeedDialItem } from "@/components/speed-dial/types";
import GradeModal from "@/components/speed-dial/modals/GradeModal";
import ProjectVariantModal from "@/components/speed-dial/modals/ProjectVariantModal";
import { SpeedDialContext } from "@/components/speed-dial/strategies/types";
import GroupModal from "@/components/speed-dial/modals/GroupModal";
import GroupPickingModal from "@/components/speed-dial/modals/GroupPickingModal";
import ImportCSVModal from "@/components/speed-dial/modals/ImportCSVModal";

export abstract class BaseSpeedDialStrategy {
  abstract getItems(context: SpeedDialContext): SpeedDialItem[];

  protected createRewardsItem(): SpeedDialItem {
    return {
      id: 1,
      orderIndex: 5,
      label: "Nagrody",
      icon: "trophy",
      modal: (onClose) => <GradeModal onClosedAction={onClose} />,
    };
  }

  protected createSaveItem(context: SpeedDialContext): SpeedDialItem {
    return {
      id: 5,
      orderIndex: 1,
      label: "Zapisz markdown",
      icon: "save",
      onClick: () => context.saveMarkdown(),
      color: "#048635",
    };
  }

  protected createEditItem(context: SpeedDialContext): SpeedDialItem {
    return {
      id: 6,
      orderIndex: 1,
      label: "Edytuj treść",
      icon: "edit",
      onClick: () => context.setIsEditing(true),
    };
  }

  protected createRejectItem(context: SpeedDialContext): SpeedDialItem {
    return {
      id: 7,
      orderIndex: 0,
      label: "Anuluj edycję",
      icon: "close",
      onClick: () => context.rejectMarkdown(),
      color: "#a30d0d",
    };
  }

  protected createProjectVariantItem(): SpeedDialItem {
    return {
      id: 2,
      orderIndex: 2,
      label: "Wariant",
      icon: "arrow_split",
      modal: (onClose) => <ProjectVariantModal onClosedAction={onClose} />,
    };
  }

  protected createProjectGroupItem(): SpeedDialItem {
    return {
      id: 3,
      orderIndex: 3,
      label: "Grupa",
      icon: "person",
      modal: (onClose) => <GroupModal onClosedAction={onClose} />,
    };
  }

  protected createProjectGroupPickingItem(): SpeedDialItem {
    return {
      id: 4,
      orderIndex: 4,
      label: "Utwórz grupę",
      icon: "person_add",
      modal: (onClose) => <GroupPickingModal onClosedAction={onClose} />,
    };
  }

  protected createImportCSVItem(): SpeedDialItem {
    return {
      id: 4,
      orderIndex: 9,
      label: "Import CSV",
      icon: "cloud_upload",
      modal: (onClose) => <ImportCSVModal onClosedAction={onClose} />,
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

  protected createEditingItems(context: SpeedDialContext): SpeedDialItem[] {
    return context.isEditing
      ? [this.createSaveItem(context), this.createRejectItem(context)]
      : [this.createEditItem(context)];
  }
}
