import { handlePageChange } from "@/providers/hall-of-fame/utils/handlePageChange";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import Pagination from "@/components/pagination/Pagination";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "../desktop/index.css";
import { useMediaQuery } from "react-responsive";

export default function HallOfFamePagination() {
  const { hallOfFame, isLoading, setPage } = useHallOfFameContext();
  const wrapperRef = useFadeInAnimate(!isLoading);
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  if (isLoading || !hallOfFame) {
    return <div className="min-h-14"></div>;
  }

  return (
    <div
      className={`hall-of-fame-pagination-wrapper ${isDesktop && "justify-end"}`}
      ref={wrapperRef}
    >
      {!isLoading && hallOfFame.page.totalPages > 0 && (
        <Pagination
          pageCount={hallOfFame.page.totalPages}
          forcePage={hallOfFame.page.number}
          onPageChange={handlePageChange(setPage)}
        />
      )}
    </div>
  );
}
