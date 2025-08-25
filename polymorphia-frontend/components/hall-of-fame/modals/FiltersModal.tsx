/* eslint-disable */
// @ts-nocheck

import Modal from "@/components/modal/Modal";
import { useContext, useRef } from "react";
import { HallOfFameContext } from "@/components/providers/hall-of-fame/HallOfFameContext";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import {
  HallOfFameFilterID,
  HallOfFameFilterOption,
} from "@/components/hall-of-fame/general/types";
import { useQueryClient } from "@tanstack/react-query";
import "./index.css";
import { hallOfFameConfirmAction } from "@/components/providers/hall-of-fame/utils/hallOfFameConfirmAction";
import { Accordion } from "@/components/accordion/Accordion";
import AccordionSection from "@/components/accordion/AccordionSection";
import { AccordionRef } from "@/components/providers/accordion/types";

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

  const accordionRef = useRef<AccordionRef>(null);

  const handleSelect = (
    filterId: HallOfFameFilterID,
    option: HallOfFameFilterOption
  ) => {
    filtersDispatch({
      type: option.isSelected ? "REMOVE_FROM_FILTER" : "ADD_TO_FILTER",
      payload: { id: filterId, value: option.value },
    });
  };

  return (
    <Modal
      isDataPresented={isModalOpen}
      title="Filtry"
      onClosed={() => {
        accordionRef.current?.closeAll();
        setIsModalOpen(false);
      }}
    >
      <div className="filters-modal">
        <Accordion
          ref={accordionRef}
          maxOpen={1}
          className="filters-modal-wrapper"
        >
          {filtersState.map((filter) => (
            <AccordionSection
              key={filter.id}
              id={filter.id}
              title={filter.name}
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
            </AccordionSection>
          ))}
        </Accordion>
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
                accordionRef.current?.closeAll();
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
