import { Accordion } from "@/components/accordion/Accordion";
import AccordionSection from "@/components/accordion/AccordionSection";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { FilterOption } from "@/components/providers/filters/types";
import Modal from "@/components/modal/Modal";
import { AccordionRef } from "@/components/providers/accordion/types";
import { FilterablePageableContextInterface } from "@/components/providers/filters/types";
import { useContext, useRef } from "react";
import toast from "react-hot-toast";
import "./index.css";
import { FiltersModalProps } from "./types";

export default function FiltersModal<
  FilterIdType extends string,
  ContextType extends FilterablePageableContextInterface<FilterIdType>,
>({ context, onFiltersApplied }: FiltersModalProps<FilterIdType, ContextType>) {
  const { filters, isModalOpen, setIsModalOpen, setPage } = useContext(context);
  const {
    dispatch,
    configs,
    applyFilters,
    getFilterValues,
    resetFiltersToApplied,
  } = filters;

  const accordionRef = useRef<AccordionRef>(null);

  const handleSelect = (filterId: FilterIdType, option: FilterOption) => {
    dispatch({
      type: "TOGGLE",
      id: filterId,
      value: option.value,
    });
  };

  const handleConfirm = () => {
    const result = applyFilters();

    if (result.ok) {
      onFiltersApplied?.();
      accordionRef.current?.closeAll();
      setIsModalOpen(false);
      setPage(0);
    } else if (result.errors !== undefined) {
      (Object.keys(result.errors) as FilterIdType[]).forEach(
        (configId: FilterIdType) => {
          toast.error(result.errors![configId]);
        }
      );
    }
  };

  return (
    <Modal
      isDataPresented={isModalOpen}
      title="Filtry"
      onClosed={() => {
        accordionRef.current?.closeAll();
        resetFiltersToApplied();
        setIsModalOpen(false);
      }}
    >
      <div className="filters-modal">
        <Accordion
          ref={accordionRef}
          maxOpen={1}
          className="filters-modal-wrapper"
        >
          {configs.map((filterConfig) => (
            <AccordionSection
              key={filterConfig.id}
              id={filterConfig.id}
              title={filterConfig.title}
            >
              <div className="filters-modal-filter-grid">
                {filterConfig.options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(filterConfig.id, option)}
                    className={`filters-modal-filter-option ${
                      (getFilterValues(filterConfig.id) ?? []).includes(
                        option.value
                      )
                        ? "filters-modal-filter-option-selected "
                        : "filters-modal-filter-option-unselected"
                    }`}
                  >
                    {option.label ?? option.value}
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
            onClick={handleConfirm}
          />
        </div>
      </div>
    </Modal>
  );
}
