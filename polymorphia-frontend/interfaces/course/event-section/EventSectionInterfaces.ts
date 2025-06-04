import { ModalProps } from '../../modal/ModalInterfaces';

export type EventSectionType = 'coursework' | 'tests' | 'project';

export interface EventSectionCore {
  id: number;
  name: string;
  type: EventSectionType;
  hidden?: boolean;
}

export interface EventSection {
  id: number;
  type: EventSectionType;
  name: string;
  gainedXp: string; // "1.2"
  bonuses: BonusInfo[];
  totalXp: string; // "1.2"
}

export interface GradableEventCore {
  id: number;
  name: string;
  topic?: string;
  gainedXp?: string; // "1.2", undefined if there is no grade
  hidden?: boolean;
}

export interface GradableEventCoreResponse {
  data: GradableEventCore[];
  page: {
    totalPages: number;
  };
}

export interface SectionViewProps {
  eventSectionId: number;
}

export interface BonusInfo {
  name: string;
  bonusXp: string; // "1.2"
  bonusPercentage?: string; // "10"
  items: BonusInfoItem[];
}

export interface BonusInfoItem {
  assignedId: number;
  item: {
    id: number;
    name: string;
    imageUrl: string;
  };
  receivedDate: string; // "12.06.2026"
  bonusXp: string; // "1.2"
  bonusPercentage?: string; // "10"
}

export interface GradableEvent {
  id: number;
  name: string;
  maxXp: string; // "1.2"
  hidden?: boolean;
  grade?: Grade;
}

export type Test = GradableEvent;

export interface Grade {
  gainedXp: string; // "1.2"
  chests: GradeChest[];
}

export interface GradeChest {
  assignedId: number;
  chest: {
    id: number;
    name: string;
    imageUrl: string;
    opened: boolean;
  };
}

export interface RewardsInfoProps {
  grade?: Grade;
  maxXp: string;
}

export interface TestDetailsModalProps
  extends Omit<ModalProps, 'title' | 'isOpen' | 'children'> {
  eventSectionId: number;
  selectedGradableEventId: number | null;
}
