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
import gsap from 'gsap';
import TestDetailsModal from '../TestDetailsModal';
import PointsSummary from '../points-summary/PointsSummary';

export default function EventSectionCardGrid({
  eventSection,
  presentEventsModally,
  containerRef,
}: EventSectionCardGridProps) {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageRows, setPageRows] = useState(3);
  const [pageCols, setPageCols] = useState(2);
  const [pageToShow, setPageToShow] = useState(0); // delayed page shown in DOM
  const [direction, setDirection] = useState<1 | -1>(1); // animation direction

  const handlePageChange = (selected: { selected: number }) => {
    const newPage = selected.selected;
    if (newPage === pageToShow) return;

    const dir = newPage > pageToShow ? 1 : -1;
    setDirection(dir);

    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        xPercent: -dir * 20,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          setPageToShow(newPage); // triggers data change
          setCurrentPage(newPage); // query depends on this
        },
      });
    }
  };

  const {
    data: gradableEventsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      'eventSectionGradableEvents',
      eventSection.id,
      currentPage,
      pageRows,
      pageCols,
    ],
    queryFn: () =>
      EventSectionService.getEventSectionGradableEvents({
        eventSectionId: eventSection.id,
        page: currentPage,
        pageSize: pageRows * pageCols,
      }),
  });

  useEffect(() => {
    if (!gradableEventsData || !sliderRef.current) return;

    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { xPercent: direction * 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [pageToShow, gradableEventsData]);

  useEffect(() => {
    console.log(containerRef, summaryRef)
    if (!containerRef.current) return;

    const handleResize = () => {
      console.log(containerRef, summaryRef);
      if (!containerRef.current) return;
      console.log(2);

      const height = containerRef.current.offsetHeight;
      const width = containerRef.current.offsetWidth;

      const expandedSidebar = document.getElementById('sidebar-animated');
      const sidebarOffset =
        expandedSidebar !== null ? expandedSidebar.offsetWidth : 0;
        // expandedSidebar !== null ? 288 : 0;
      console.log(sidebarOffset);

      const rows = Math.floor((height - 80 + 20) / (160 + 20));
      const cols = Math.floor(
        (width - 40 - 100 - (summaryRef?.current?.offsetWidth ?? 300) + sidebarOffset + 20) /
          (416 + 20)
      );

      console.log(rows, cols);
      console.log(height);

      const maxRows = height <= 650 ? 2 : height >= 900 ? 4 : 3;

      setPageRows(Math.max(Math.min(rows, maxRows), 1));
      setPageCols(Math.max(Math.min(cols, 3), 1));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);
    if (summaryRef.current !== null) {
      resizeObserver.observe(summaryRef.current);
    }

    handleResize(); // Run once immediately

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef, summaryRef]);

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
                  `/course/${eventSection.type}/${eventSection.id}/${event.id}`
                );
              },
        };
      });

  return (
    <>
      <div className="flex flex-col justify-between w-full max-h-full">
        <div className="flex flex-row justify-between items-center gap-10">
          <div className="fading-edges">
            <div
              ref={sliderRef}
              className={clsx(
                'event-section-card-grid',
                `grid-cols-${pageCols}`,
                `grid-rows-${pageRows}`
              )}
              
            >
              {cards.map((card) => (
                <EventSectionCard
                  key={card.id}
                  {...card}
                  color={card.xp !== undefined ? 'green' : 'silver'}
                  xp={card.xp !== undefined ? card.xp : '0.0 xp'}
                />
              ))}
            </div>
          </div>
          
          <PointsSummary ref={summaryRef} eventSection={eventSection} />
        </div>
        <ReactPaginate
          pageCount={gradableEventsData.page.totalPages}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          containerClassName="pagination-container"
          pageClassName="pagination-page"
          previousLabel={<ChevronLeft />}
          nextLabel={<ChevronRight />}
          breakLabel="..."
        />
      </div>
      {presentEventsModally && eventSection.type === 'tests' && (
        <TestDetailsModal
          testData={
            currentGradableEventModal
              ? {
                  eventSectionId: eventSection.id,
                  gradableEventId: currentGradableEventModal.id,
                }
              : undefined
          }
          onClose={() => setCurrentGradableEventModal(null)}
        />
      )}
    </>
  );
}
