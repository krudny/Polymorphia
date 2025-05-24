export interface EventSectionCore {
  id: number;
  name: string;
}

export interface EventSection {
  id: number;
  type: 'coursework' | 'tests' | 'project';
  name: string;
  gainedXp: number;
  // flatBonusXp: number;
  // percentageBonus: number;
  // percentageBonusXp: number;
  bonuses: BonusInfo[],
  totalXp: number;
  gradableEvents: GradableEventCore[];
}

export interface GradableEventCore {
  id: number;
  name: string;
  topic?: string;
  gainedXp?: number; // need to decide now to handle no grade
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
  bonusXp: string;
  bonusPercentage?: string;
  items: BonusInfoItem[];
}

export interface BonusInfoItem {
  assignedId: number;
  itemId: number;
  imageUrl: string;
  name: string;
  receivedDate: string;
  bonusXp: string;
  bonusPercentage?: string;
}
