"use client";

import Modal from "@/components/modal/Modal";
import ButtonWithBorder from "@/components/general/ButtonWithBorder";
import CustomSelect from "@/components/general/CustomSelect";
import { HallOfFameContext } from "@/components/providers/HallOfFameContext";
import { useContext, useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import gsap from "gsap";

export default function FiltersModal() {
  const { filtersState, filtersDispatch } = useContext(HallOfFameContext);

  const refs = useRef({});

  useLayoutEffect(() => {
    filtersState.categories.forEach((category) => {
      const el = refs.current[category.id];
      if (!el) return;

      if (category.isOpen) {
        gsap.to(el, {
          height: "auto",
          opacity: 1,
          marginTop: "0.5rem",
          duration: 0.4,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          marginTop: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
    });
  }, [filtersState.categories]);

  const handleSelect = (categoryId, option) => {
    const category = filtersState.categories.find(
      (cat) => cat.id === categoryId
    );
    const isSelected = category.selectedOptions.includes(option.value);

    filtersDispatch({
      type: isSelected ? "REMOVE_CATEGORY_SELECTION" : "ADD_CATEGORY_SELECTION",
      payload: { categoryId, value: option.value },
    });
  };

  return (
    <Modal
      title="Filtry"
      onClosed={() => {
        filtersDispatch({ type: "CLOSE_ALL_CATEGORIES" });
        filtersDispatch({ type: "CLOSE_MODAL" });
      }}
    >
      <div className="overflow-visible">
        <div className="w-96 flex flex-col">
          {filtersState.categories.map((category) => (
            <div key={category.id} className="flex flex-col my-2 ">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl">{category.name}</h1>
                <div
                  className="flex items-center gap-x-1 cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() =>
                    filtersDispatch({
                      type: "TOGGLE_CATEGORY",
                      payload: { categoryId: category.id },
                    })
                  }
                >
                  {category.isOpen ? (
                    <>
                      <ArrowDown className="w-5 h-5 transition-transform duration-300" />
                      <h1 className="text-2xl">Zamknij</h1>
                    </>
                  ) : (
                    <>
                      <ArrowUp className="w-5 h-5 transition-transform duration-300" />
                      <h1 className="text-2xl">Otwórz</h1>
                    </>
                  )}
                </div>
              </div>

              <div
                ref={(el) => (refs.current[category.id] = el)}
                style={{
                  overflow: "hidden",
                  height: 0,
                  opacity: 0,
                  marginTop: 0,
                }}
              >
                <div className="grid grid-cols-4 gap-2 text-xl my-2 ">
                  {category.availableOptions.map((option) => {
                    const isSelected = category.selectedOptions.includes(
                      option.value
                    );

                    return (
                      <div
                        key={option.value}
                        onClick={() => handleSelect(category.id, option)}
                        className={`w-full rounded-md flex-centered px-2 py-1 text-primary-dark cursor-pointer transition-colors duration-150 ease-in-out ${
                          isSelected
                            ? "bg-secondary-light shadow-md"
                            : "bg-primary-gray "
                        }`}
                      >
                        {option.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full mt-5">
          <ButtonWithBorder
            text="Potwierdź"
            className="w-full rounded-md"
            size="sm"
            onClick={() => {}}
          />
        </div>
      </div>
    </Modal>
  );
}
