"use client"

import Modal from "@/components/modal/Modal";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import CustomSelect from "@/components/button/CustomSelect";
import {useState} from "react";




export default function FiltersModal({ isModalOpen, setIsModalOpen }) {
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isGroup2Open, setIsGroup2Open] = useState(false);
  const [asc, setAsc] = useState(false);
  const [selectedValues, setSelectedValues] = useState<(typeof options)[0][]>([]);
  const [selectedValues2, setSelectedValues2] = useState<(typeof options2)[0][]>([]);

  const options = [
    { value: "all", label: "Wszystkie" },
    { value: "mi-15-00", label: "MI-15-00" },
    { value: "bm-16-00", label: "BM-16-00" },
    { value: "bm-17-00", label: "BM-17-00" },
    { value: "bm-18-00", label: "BM-18-00" },
    { value: "bm-19-00", label: "BM-19-00" },
    { value: "bm-20-00", label: "BM-20-00" },
    { value: "bm-21-00", label: "BM-21-00" },
  ];

  const options2 = [
    { value: "Laboratoria", label: "Laboratoria" },
    { value: "Laboratoria2", label: "Laboratoria2" },
    { value: "Kartkówki", label: "Kartkówki" },
    { value: "Projekt", label: "Projekt" },
    { value: "Bonusy", label: "Bonusy" },

  ]


  return (
    <div className="relative ">
      <Modal
        title="Filtry"
        onClosed={() => setIsModalOpen(false)}
      >
        <div className="overflow-visible">
          <div className="w-72 flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl ">Sortowanie</h1>
              <ButtonWithBorder text={asc ? "Rosnąco" : "Malejąco"} onClick={() => setAsc(!asc)} className="!mx-0 !border-0 !border-b-2 w-32" size="sm" />
            </div>

            <div className="flex justify-between items-center">
              <h1 className="text-2xl ">Grupy</h1>
              <div className=" w-32">
                <CustomSelect isOpen={isGroupOpen} setIsOpen={setIsGroupOpen} possibleValues={options} selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h1 className="text-2xl ">Wyświetlanie</h1>
              <div className=" w-32">
                <CustomSelect isOpen={isGroup2Open} setIsOpen={setIsGroup2Open} possibleValues={options2} selectedValues={selectedValues2} setSelectedValues={setSelectedValues2} />
              </div>
            </div>

          </div>
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