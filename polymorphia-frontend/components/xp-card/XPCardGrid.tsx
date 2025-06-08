import { EventSectionCardGridProps } from '@/interfaces/xp-card/XPCardInterfaces';
import XPCard from './XPCard';
import '../../styles/xp-card.css';
import '../../styles/paginate.css';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { EventSectionService } from '@/services/course/event-section/EventSectionService';
import Loading from '@/components/general/Loading';
import { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import TestDetailsModal from '../course/event-section/TestDetailsModal';
import PointsSummary from '../course/event-section/points-summary/PointsSummary';
import {
  mapPropsToCards,
  setResizeObserver,
} from '@/services/course/event-section/EventSectionUtils';
import { useEventSectionAnimation } from '@/animations/EventSection';

export default function XPCardGrid({
  eventSection,
  containerRef,
}: EventSectionCardGridProps) {
  const router = useRouter();

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageRows, setPageRows] = useState(3);
  const [pageCols, setPageCols] = useState(2);
  const [mobile, setMobile] = useState(false);

  const [pageToShow, setPageToShow] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [firstRender, setFirstRender] = useState(true);

  const [
    currentlySelectedGradableEventIdForModal,
    setCurrentlySelectedGradableEventIdForModal,
  ] = useState<number | null>(null);

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
        eventSectionType: eventSection.type,
        page: currentPage,
        pageSize: pageRows * pageCols,
      }),
  });

  const { handlePageChange } = useEventSectionAnimation(
    pageToShow,
    setDirection,
    sliderRef,
    setPageToShow,
    setCurrentPage,
    gradableEventsData,
    direction,
    firstRender,
    setFirstRender
  );

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
    setCurrentlySelectedGradableEventIdForModal,
    router,
    eventSection
  );

  const pagination = (
    <ReactPaginate
      pageCount={gradableEventsData.page.totalPages}
      onPageChange={handlePageChange}
      forcePage={
        gradableEventsData.page.totalPages > 0 ? currentPage : undefined
      }
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageClassName="pagination-page"
      previousLabel={<ChevronLeft />}
      nextLabel={<ChevronRight />}
      breakLabel="..."
    />
  );

  return (
    <>
      <div className="xp-card-grid-center-vertically">
        <div className="xp-card-grid-point-summary-layout">
          {cards.length > 0 ? (
            <div className="xp-card-fading-edges">
              <div
                ref={sliderRef}
                className={clsx(
                  'xp-card-grid',
                  `grid-cols-${pageCols}`,
                  `grid-rows-${pageRows}`
                )}
              >
                {cards.map((card) => (
                  <XPCard
                    key={card.id}
                    {...card}
                    color={card.xp !== undefined ? 'green' : 'silver'}
                    xp={card.xp !== undefined ? card.xp : '0.0 xp'}
                    size={mobile ? 'sm' : 'md'}
                    forceWidth={!mobile}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="xp-card-no-grid">Brak aktywności.</div>
          )}
          {mobile && cards.length > 0 && pagination}
          <PointsSummary ref={summaryRef} eventSection={eventSection} />
        </div>
        {!mobile && pagination}
      </div>
      {eventSection.type === 'test' && (
        <TestDetailsModal
          eventSectionId={eventSection.id}
          selectedGradableEventId={currentlySelectedGradableEventIdForModal}
          onClose={() => setCurrentlySelectedGradableEventIdForModal(null)}
        />
      )}
    </>
  );
}
