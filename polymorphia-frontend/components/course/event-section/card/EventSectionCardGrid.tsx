import { EventSectionCardGridProps } from '@/interfaces/course/event-section/card/EventSectionCardInterfaces';
import EventSectionCard from './EventSectionCard';
import '../../../../styles/event-section-card.css';
import '../../../../styles/paginate.css';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { EventSectionService } from '@/services/course/event-section/EventSectionService';
import Loading from '@/components/general/Loading';
import { useEffect, useRef, useState } from 'react';
import { GradableEventCore } from '@/interfaces/course/event-section/EventSectionInterfaces';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import gsap from 'gsap';
import TestDetailsModal from '../TestDetailsModal';
import PointsSummary from '../points-summary/PointsSummary';
import {
  mapPropsToCards,
  setResizeObserver,
} from '@/services/course/event-section/EventSectionUtils';
import { useScaleShow } from '@/animations/General';

export default function EventSectionCardGrid({
  eventSection,
  presentEventsModally,
  containerRef,
}: EventSectionCardGridProps) {
  const router = useRouter();

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const paginationRef = useScaleShow();
  const noPagesErrorRef = useScaleShow();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageRows, setPageRows] = useState(3);
  const [pageCols, setPageCols] = useState(2);
  const [mobile, setMobile] = useState(false);

  const [pageToShow, setPageToShow] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const [currentGradableEventModal, setCurrentGradableEventModal] =
    useState<GradableEventCore | null>(null);

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
          setPageToShow(newPage);
          setCurrentPage(newPage);
        },
      });
    }
  };

  useEffect(() => {
    if (!gradableEventsData || !sliderRef.current) return;

    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { xPercent: direction * 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [pageToShow, gradableEventsData]); // eslint-disable-line -- adding 'direction' to dependency list breaks the animation

  useEffect(() => {
    return setResizeObserver(
      containerRef,
      summaryRef,
      setMobile,
      setPageCols,
      setPageRows
    );
  }, [containerRef, summaryRef]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading gradable events: {error.message}</div>;
  }

  if (!gradableEventsData) {
    return <div>No gradable events.</div>;
  }

  const cards = mapPropsToCards(
    gradableEventsData,
    presentEventsModally,
    setCurrentGradableEventModal,
    router,
    eventSection
  );

  const pagination = (
    <div ref={paginationRef} className="w-fit">
      <ReactPaginate
        pageCount={gradableEventsData.page.totalPages}
        onPageChange={handlePageChange}
        forcePage={currentPage}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        containerClassName="pagination-container"
        pageClassName="pagination-page"
        previousLabel={<ChevronLeft />}
        nextLabel={<ChevronRight />}
        breakLabel="..."
      />
    </div>
  );

  return (
    <>
      <div className="event-section-card-grid-center-vertically">
        <div className="event-section-card-grid-point-summary-layout">
          {cards.length > 0 ? (
            <div className="event-section-card-fading-edges">
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
                    size={mobile ? 'sm' : 'md'}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div ref={noPagesErrorRef} className="event-section-card-no-grid">
              Brak aktywności.
            </div>
          )}
          {mobile && cards.length > 0 && pagination}
          <PointsSummary ref={summaryRef} eventSection={eventSection} />
        </div>
        {!mobile && pagination}
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
