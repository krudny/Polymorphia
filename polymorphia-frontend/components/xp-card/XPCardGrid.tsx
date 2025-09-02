import "../pagination/index.css";
import { Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useXPGridAnimation } from "@/animations/XPGrid";
import "./index.css";
import { CardGridProps } from "@/components/xp-card/types";
import Pagination from "@/components/pagination/Pagination";
import { setResizeObserver } from "@/components/course/event-section/EventSectionUtils";

export default function XPCardGrid({
  containerRef,
  cards,
  maxColumns = 3,
}: CardGridProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageRows, setPageRows] = useState(3);
  const [pageCols, setPageCols] = useState(2);
  const [mobile, setMobile] = useState(false);
  const [pageToShow, setPageToShow] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [firstRender, setFirstRender] = useState(true);

  const { handlePageChange } = useXPGridAnimation(
    pageToShow,
    setDirection,
    sliderRef,
    setPageToShow,
    setCurrentPage,
    cards,
    direction,
    firstRender,
    setFirstRender
  );

  useEffect(() => {
    return setResizeObserver(
      containerRef,
      setMobile,
      setPageCols,
      setPageRows,
      maxColumns
    );
  }, [containerRef, maxColumns]);

  const pageSize = pageRows * pageCols;
  const pageCount = Math.ceil(cards.length / pageSize);
  const cardsPage = cards.slice(
    pageToShow * pageSize,
    pageToShow * pageSize + pageSize
  );

  const pagination = (
    <Pagination
      pageCount={pageCount}
      onPageChange={handlePageChange}
      forcePage={pageCount > 0 ? currentPage : undefined}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      containerClassName="ml-3"
    />
  );

  return (
    <>
      {cardsPage.length >= 1 ? (
        <div className="xp-card-grid-center-vertically">
          <div className="xp-card-grid-point-summary-layout">
            <div className="xp-card-fading-edges">
              <div
                ref={sliderRef}
                className={clsx(
                  "xp-card-grid",
                  `grid-cols-${pageCols}`,
                  `grid-rows-${pageRows}`
                )}
              >
                {cardsPage.map((card, index) => (
                  <Fragment key={index}>{card}</Fragment>
                ))}
              </div>
            </div>
            {mobile && cardsPage.length > 0 && pagination}
          </div>
          {!mobile && pagination}
        </div>
      ) : (
        <div className="xp-card-no-grid">Brak aktywności.</div>
      )}
    </>
  );
}
