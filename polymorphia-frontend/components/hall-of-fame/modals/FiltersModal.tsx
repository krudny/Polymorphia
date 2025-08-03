import Modal from "@/components/modal/Modal";
import { useContext, useLayoutEffect, useRef } from "react";
import { HallOfFameContext } from "@/components/providers/hall-of-fame/HallOfFameContext";
import { ArrowDown, ArrowUp } from "lucide-react";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import {
  HallOfFameFilterID,
  HallOfFameFilterOption,
} from "@/components/hall-of-fame/general/types";
import { useQueryClient } from "@tanstack/react-query";
import "./index.css";
import { hallOfFameConfirmAction } from "@/components/providers/hall-of-fame/utils/hallOfFameConfirmAction";
import { animateFiltersModal } from "@/animations/FiltersModal";

export default function FiltersModal() {
  const queryClient = useQueryClient();
  const {
    filtersState,
    setAppliedFiltersState,
    filtersDispatch,
    isModalOpen,
    setIsModalOpen,
    setPage,
  } = useContext(HallOfFameContext);

  const handleSelect = (
    filterId: HallOfFameFilterID,
    option: HallOfFameFilterOption
  ) => {
    filtersDispatch({
      type: option.isSelected ? "REMOVE_FROM_FILTER" : "ADD_TO_FILTER",
      payload: { id: filterId, value: option.value },
    });
  };

  const setRef = (id: HallOfFameFilterID) => (el: HTMLDivElement | null) => {
    if (el) {
      refs.current[id] = el;
    }
  };

  const refs = useRef<Record<HallOfFameFilterID, HTMLDivElement | null>>({
    sort: null,
    sortBy: null,
    groups: null,
    rankingOptions: null,
  });

  useLayoutEffect(() => {
    animateFiltersModal(filtersState, refs.current);
  }, [filtersState]);

  return (
    <Modal
      isDataPresented={isModalOpen}
      title="Filtry"
      onClosed={() => {
        filtersDispatch({ type: "CLOSE_ALL_FILTERS" });
        setIsModalOpen(false);
      }}
    >
      <div className="filters-modal">
        <div className="filters-modal-wrapper">
          {filtersState.map((filter) => (
            <div key={filter.id} className="filters-modal-filter-wrapper">
              <div className="filters-modal-filter">
                <h1>{filter.name}</h1>
                <div
                  className="filters-modal-toggle-button"
                  onClick={() =>
                    filtersDispatch({
                      type: "OPEN_FILTER",
                      payload: { id: filter.id },
                    })
                  }
                >
                  {filter.isOpen ? (
                    <div className="filters-modal-toggle">
                      <ArrowUp className="filters-modal-toggle-arrow" />
                      <h2>Zamknij</h2>
                    </div>
                  ) : (
                    <div className="filters-modal-toggle">
                      <ArrowDown className="filters-modal-toggle-arrow" />
                      <h2>Otwórz</h2>
                    </div>
                  )}
                </div>
              </div>

              <div
                ref={setRef(filter.id)}
                style={{
                  overflow: "hidden",
                  height: 0,
                  opacity: 0,
                  marginTop: 0,
                }}
              >
                <div className="filters-modal-filter-grid">
                  {filter.options.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleSelect(filter.id, option)}
                      className={`filters-modal-filter-option ${
                        option.isSelected
                          ? "filters-modal-filter-option-selected "
                          : "filters-modal-filter-option-unselected"
                      }`}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="filters-modal-button-wrapper">
          <ButtonWithBorder
            text={"Potwierdź zmiany"}
            className="w-full rounded-md"
            size="sm"
            onClick={() => {
              if (
                hallOfFameConfirmAction(
                  filtersState,
                  setAppliedFiltersState,
                  queryClient
                )
              ) {
                filtersDispatch({ type: "CLOSE_ALL_FILTERS" });
                setIsModalOpen(false);
                setPage(0);
              }
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
