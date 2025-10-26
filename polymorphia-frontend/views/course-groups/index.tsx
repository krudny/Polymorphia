import { useMediaQuery } from "react-responsive";
import SpeedDial from "@/components/speed-dial/SpeedDial";
import ColumnSchema from "@/components/column-schema";
import { SpeedDialKeys } from "@/components/speed-dial/types";
import { useCourseGroupsStrategy } from "@/hooks/strategy/useCourseGroupsStrategy";
import FiltersModal from "@/components/filters-modals/FiltersModal";
import useCourseGroupsContext from "@/hooks/contexts/useCourseGroupsContext";
import { CourseGroupsFilterId } from "@/providers/course-groups/types";

export default function CourseGroups() {
  const isXL = useMediaQuery({ minWidth: "1280px" });
  const isMd = useMediaQuery({ minWidth: "768px" });
  const components = useCourseGroupsStrategy();
  const { areFiltersOpen, setAreFiltersOpen, filters } =
    useCourseGroupsContext();

  if (!components) {
    return null;
  }

  const handleApplyFilters = () => {};

  return (
    <>
      <SpeedDial speedDialKey={SpeedDialKeys.COURSE_GROUP} />
      <ColumnSchema columns={isXL ? 3 : isMd ? 2 : 1} components={components} />
      <FiltersModal<CourseGroupsFilterId>
        filters={filters}
        isModalOpen={areFiltersOpen}
        setIsModalOpen={setAreFiltersOpen}
        onFiltersApplied={() => handleApplyFilters()}
      />
    </>
  );
}
