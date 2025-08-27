import { handlePageChange } from "@/components/providers/hall-of-fame/utils/handlePageChange";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import Pagination from "@/components/pagination/Pagination";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";

export default function HallOfFamePagination() {
  const { hallOfFame, isLoading, setPage } = useHallOfFameContext();
  const wrapperRef = useFadeInAnimate(!isLoading);

  if (isLoading || !hallOfFame) {
    return <div className="min-h-14"></div>;
  }

  return (
    <div className="hall-of-fame-pagination-wrapper justify-end" ref={wrapperRef}>
      {!isLoading && hallOfFame.page.totalPages > 0 && (
        <Pagination
          pageCount={hallOfFame.page.totalPages}
          forcePage={hallOfFame.page.pageNumber}
          onPageChange={handlePageChange(setPage)}
        />
      )}
    </div>
  );
}