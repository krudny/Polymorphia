export interface EventSectionCore {
  id: number;
  name: string;
}

export interface EventSection {
  id: number;
  type: 'coursework' | 'tests' | 'project';
  name: string;
  gainedXp: number;
  flatBonusXp: number;
  percentageBonus: number;
  percentageBonusXp: number;
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

export interface TestsSectionProps {
  eventSection: EventSection;
}
