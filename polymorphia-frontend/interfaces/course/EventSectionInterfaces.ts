import { ModalProps } from '../modal/ModalInterfaces';

export interface EventSectionCore {
  id: number;
  name: string;
  hidden?: boolean;
}

export interface EventSection {
  id: number;
  type: 'coursework' | 'tests' | 'project';
  name: string;
  gainedXp: string; // "1,2"
  bonuses: BonusInfo[];
  totalXp: string; // "1,2"
  gradableEvents: GradableEventCore[];
}

export interface GradableEventCore {
  id: number;
  name: string;
  topic?: string;
  gainedXp?: string; // "1,2", undefined if there is no grade
  hidden?: boolean;
}

export interface EventSectionProps {
  eventSection: EventSection;
}

export interface SectionViewProps extends EventSectionProps {
  presentEventsModally?: boolean;
}

export interface BonusInfo {
  name: string;
  bonusXp: string; // "1,2"
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
  bonusXp: string; // "1,2"
  bonusPercentage?: string; // "10"
}

export interface GradableEvent {
  id: number;
  name: string;
  maxXp: string; // "1,2"
  hidden?: boolean;
  grade?: Grade;
}

export type Test = GradableEvent

export interface Grade {
  gainedXp: string; // "1,2"
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
  testData?: {
    eventSectionId: number;
    gradableEventId: number;
  };
}
