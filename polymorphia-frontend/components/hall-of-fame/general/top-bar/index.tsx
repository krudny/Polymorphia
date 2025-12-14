import Search from "@/components/search";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import useUserContext from "@/hooks/contexts/useUserContext";
import { Roles } from "@/interfaces/api/user";
import ButtonWithBorder from "@/components/button";
import { useMediaQuery } from "react-responsive";
import "./index.css";

export default function HallOfFameTopBar() {
  const isMd = useMediaQuery({ minWidth: 768 });
  const isLg = useMediaQuery({ minWidth: 1024 });
  const buttonVariant = isLg ? "md" : isMd ? "base" : "sm";

  const {
    setAreFiltersOpen,
    search,
    setSearch,
    setShouldScrollToMe,
    areAnimalNamesVisible,
    toggleAnimalNamesVisibility,
  } = useHallOfFameContext();
  const { userRole } = useUserContext();

  return (
    <div className="hof-top-bar">
      <Search
        search={search}
        setSearch={setSearch}
        placeholder="Znajdź zwierzaka..."
      />
      <div className="hof-top-bar-buttons">
        {userRole === Roles.STUDENT ? (
          <ButtonWithBorder
            text="Znajdź mnie"
            className="!mx-0 !py-0 !border-0 !border-b-2 !rounded-none !text-nowrap"
            size={buttonVariant}
            onClick={() => setShouldScrollToMe(true)}
          />
        ) : (
          <ButtonWithBorder
            text={areAnimalNamesVisible ? "Studenci" : "Zwierzaki"}
            className="!mx-0 !py-0 !border-0 !border-b-2 !rounded-none"
            size={buttonVariant}
            onClick={toggleAnimalNamesVisibility}
          />
        )}
        <ButtonWithBorder
          text="Filtry"
          className="!mx-0 !py-0 !border-0 !border-b-2 !rounded-none"
          size={buttonVariant}
          onClick={() => setAreFiltersOpen(true)}
        />
      </div>
    </div>
  );
}
