import { ReactNode } from "react";
import Search from "@/components/search";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useMediaQuery } from "react-responsive";
import { TargetListTopBarProps } from "@/components/column-schema/column-component/shared/target-list/top-bar/types";
import "./index.css";

export default function TargetListTopBar({
  search,
  setSearch,
  setAreFiltersOpen,
}: TargetListTopBarProps): ReactNode {
  const isMd = useMediaQuery({ minWidth: "786px" });

  return (
    <div className="target-list-search-wrapper">
      <Search
        search={search}
        setSearch={setSearch}
        placeholder="Szukaj studenta..."
      />
      <ButtonWithBorder
        text="Filtry"
        size={isMd ? "md" : "sm"}
        className="!mx-0 !py-0 !border-0 !border-b-2 !rounded-none"
        onClick={() => setAreFiltersOpen(true)}
      />
    </div>
  );
}
