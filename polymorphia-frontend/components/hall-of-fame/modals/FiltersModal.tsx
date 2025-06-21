"use client"

import Modal from "@/components/modal/Modal";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import CustomSelect from "@/components/general/CustomSelect";
import {HallOfFameContext} from "@/components/providers/HallOfFameContext";
import {useContext} from "react";





export default function FiltersModal() {
  const {filtersState, filtersDispatch} = useContext(HallOfFameContext)

  return (
    <div className="relative ">
      <Modal
        title="Filtry"
        onClosed={() => filtersDispatch({ type: 'CLOSE_MODAL' })}
      >
        <div className="overflow-visible">
          <div className="w-72 flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl ">Sortowanie</h1>
              <ButtonWithBorder text={filtersState.isSortedAsc ? "Rosnąco" : "Malejąco"} onClick={() => filtersDispatch({ type: 'TOGGLE_SORT_ORDER'})} className="!mx-0 !border-0 !border-b-2 w-32" size="sm" />
            </div>
          </div>

          {filtersState.categories.map((category) => (
            <div key={category.id} className="flex justify-between items-center my-2">
              <h1 className="text-2xl ">{category.name}</h1>
              <div className=" w-32">
                <CustomSelect isOpen={category.isOpen} possibleValues={category.availableOptions} selectedValues={category.selectedOptions} categoryId={category.id}
                              filtersDispatch={filtersDispatch} />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full mt-5">
          <ButtonWithBorder
            text="Potwierdź"
            className="w-full rounded-xl"
            size="sm"
            onClick={() => {}}
          />
        </div>
      </Modal>
    </div>
  )
}