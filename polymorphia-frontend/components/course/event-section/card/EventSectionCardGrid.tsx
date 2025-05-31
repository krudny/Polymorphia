import {
  EventSectionCardGridProps,
  EventSectionCardProps,
} from '@/interfaces/course/event-section/card/EventSectionCardInterfaces';
import EventSectionCard from './EventSectionCard';
import '../../../../styles/event-section-card.css';
import '../../../../styles/paginate.css';
import { useScaleShow } from '@/animations/General';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { EventSectionService } from '@/services/course/event-section/EventSectionService';
import Loading from '@/components/general/Loading';
import { useEffect, useRef, useState } from 'react';
import { GradableEventCore } from '@/interfaces/course/event-section/EventSectionInterfaces';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from 'lucide-react';
import clsx from 'clsx';

export default function EventSectionCardGrid({
  eventSectionId,
  eventSectionType,
  presentEventsModally,
  containerRef,
  summaryRef
}: EventSectionCardGridProps) {
  const router = useRouter();
  const wrapperRef = useScaleShow();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageRows, setPageRows] = useState(3);
  const [pageCols, setPageCols] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && summaryRef.current) {
        const height = containerRef.current.offsetHeight;
        const width = containerRef.current.offsetWidth;

        const rows = Math.floor((height + 20) / (160 + 20));
        const cols = Math.floor((width - summaryRef.current.offsetWidth + 20) / (400 + 20))
        
        setPageRows(Math.max(Math.min(rows, 6), 1));
        setPageCols(Math.max(Math.min(cols, 3), 1));
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [containerRef]);


  const {
    data: gradableEventsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['eventSectionGradableEvents', eventSectionId, currentPage, pageRows, pageCols],
    queryFn: () =>
      EventSectionService.getEventSectionGradableEvents({
        eventSectionId,
        page: currentPage,
        pageSize: pageRows * pageCols,
      }),
  });

  const [currentGradableEventModal, setCurrentGradableEventModal] =
    useState<GradableEventCore | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="basic-container">
        Error loading gradable events: {error.message}
      </div>
    );
  }

  if (!gradableEventsData) {
    return <div className="basic-container">No gradable events.</div>;
  }

  console.log(gradableEventsData)

  const cards: (EventSectionCardProps & { id: number })[] =
    gradableEventsData.data
      .filter((event) => !event.hidden)
      .map((event) => {
        return {
          id: event.id,
          title: event.name,
          subtitle: event.topic,
          xp: event.gainedXp ? `${event.gainedXp} xp` : undefined,
          onClick: presentEventsModally
            ? () => {
                setCurrentGradableEventModal(event);
              }
            : () => {
                router.push(
                  `/course/${eventSectionType}/${eventSectionId}/${event.id}`
                );
              },
        };
      });

  return (
    <div ref={wrapperRef} className="flex flex-col justify-between">
      <div className={clsx("event-section-card-grid", `grid-cols-${pageCols}`, `grid-rows-${pageRows}`)}>
        {cards.map((card) => (
          <EventSectionCard key={card.id} {...card} />
        ))}
      </div>
      <ReactPaginate
        pageCount={gradableEventsData.page.totalPages}
        onPageChange={(event) => setCurrentPage(event.selected)}
        forcePage={currentPage}
        containerClassName="pagination-container"
        pageClassName="pagination-page"
        previousLabel={<ChevronLeft />}
        nextLabel={<ChevronRight />}
        breakLabel="..."
      />
    </div>
  );
}
