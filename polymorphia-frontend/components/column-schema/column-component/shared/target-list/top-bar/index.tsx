import { ReactNode } from "react";
import Search from "@/components/search";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useMediaQuery } from "react-responsive";
import "./index.css";
import useTargetContext from "@/hooks/contexts/useTargetContext";

export default function TargetListTopBar(): ReactNode {
  const isMd = useMediaQuery({ minWidth: "786px" });
  const { search, setSearch, setAreFiltersOpen } = useTargetContext();

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
