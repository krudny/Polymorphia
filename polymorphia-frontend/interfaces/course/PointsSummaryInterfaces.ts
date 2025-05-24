import { ModalProps } from '../modal/ModalInterfaces';
import { BonusInfo, EventSection } from './EventSectionInterfaces';

export interface PointsSummaryProps {
  eventSection: EventSection;
}

export interface PointsSummaryElementProps {
  bonus: BonusInfo,
  onClick?: () => void;
  horizontal?: boolean;
}

export interface BonusInfoModalProps extends Omit<ModalProps, 'title' | 'isOpen'> {
  bonusInfo: BonusInfo | null,
}
