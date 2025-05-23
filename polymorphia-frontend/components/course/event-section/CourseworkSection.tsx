import { useScaleShow } from '@/animations/General';
import '../../../styles/general.css';
import '../../../styles/event-section.css';
import CardGrid from '@/components/card/CardGrid';
import PointsSummary from './points-summary/PointsSummary';
import { CourseworkSectionProps } from '@/interfaces/course/EventSectionInterfaces';
import { CardProps } from '@/interfaces/card/CardInterfaces';
import { PointsSummaryElementProps } from '@/interfaces/course/PointsSummaryInterfaces';

export default function CourseworkSection({
  eventSection,
}: CourseworkSectionProps) {
  const wrapperRef = useScaleShow();

  const cards: CardProps[] = eventSection.gradableEvents
    .filter((event) => !event.hidden)
    .map((event) => {
      return {
        title: event.name,
        subtitle: event.topic,
        xp: event.gainedXp ? `${event.gainedXp} xp` : undefined,
        link: `/course/${eventSection.id}/${event.id}`,
      };
    });

  const pointsSummaryElements: PointsSummaryElementProps[] = [
    {
      title: 'Zdobyte xp',
      xp: `${eventSection.gainedXp} xp`,
    },
    {
      title: 'Bonusy punktowe',
      xp: `+${eventSection.flatBonusXp} xp`,
    },
    {
      title: 'Bonusy procentowe',
      xp: `+${eventSection.percentageBonusXp} xp`,
    },
    {
      title: 'Łącznie',
      xp: `${eventSection.totalXp} xp`,
    },
  ];

  return (
    <div ref={wrapperRef} className="basic-container coursework-section">
      <CardGrid cards={cards} />
      <PointsSummary elements={pointsSummaryElements} />
    </div>
  );
}
