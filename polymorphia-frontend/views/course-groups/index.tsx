import { useMediaQuery } from "react-responsive";
import SpeedDial from "@/components/speed-dial/SpeedDial";
import ColumnSchema from "@/components/column-schema";
import { SpeedDialKeys } from "@/components/speed-dial/types";
import { useCourseGroupsStrategy } from "@/hooks/strategy/useCourseGroupsStrategy";
import "./index.css";
import { CourseGroupsFilterId } from "@/providers/course-groups/types";
import FiltersModal from "@/components/filters-modals/FiltersModal";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import useCourseGroupsContext from "@/hooks/contexts/useCourseGroupsContext";

export default function CourseGroups() {
  const isXL = useMediaQuery({ minWidth: "1280px" });
  const isMd = useMediaQuery({ minWidth: "768px" });
  const components = useCourseGroupsStrategy();
  const { filters } = useCourseGroupsContext();
  const { areFiltersOpen, setAreFiltersOpen, handleApplyFilters } =
    useTargetContext();

  if (!components) {
    return null;
  }

  return (
    <div className="course-groups">
      <SpeedDial speedDialKey={SpeedDialKeys.COURSE_GROUP} />
      <ColumnSchema columns={isXL ? 3 : isMd ? 2 : 1} components={components} />
      <FiltersModal<CourseGroupsFilterId>
        filters={filters}
        isModalOpen={areFiltersOpen}
        setIsModalOpen={setAreFiltersOpen}
        onFiltersApplied={() => handleApplyFilters()}
      />
    </div>
  );
}
