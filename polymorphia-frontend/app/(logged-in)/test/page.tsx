"use client";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useState } from "react";
import { Check } from "lucide-react";
import "../../../styles/general.css";

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

export default function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof options)[0][]>([]); // Multi-select

  const toggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: (typeof options)[0]) => {
    setSelected((prev) =>
      prev.some((o) => o.value === option.value)
        ? prev.filter((o) => o.value !== option.value) // Usuń
        : [...prev, option] // Dodaj
    );
  };

  return (
    <div className="w-full h-full bg-purple-50 flex-col-centered">
      <div className="w-lg aspect-square bg-primary-dark p-5 flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl ">Sortowanie</h1>
          <ButtonWithBorder text="Rosnąco" className="!mx-0 !border-0 !border-b-2 w-32" size="sm" />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-xl ">Grupy</h1>

          <div className="relative w-32">
            <button
              type="button"
              onClick={toggle}
              className="w-full border-b-2 border-secondary-light
                hover:bg-secondary-light hover:text-primary-dark
                px-6 py-1 text-xl  flex-centered transition-colors
                duration-400 ease-[cubic-bezier(0.34,1,0.2,1)]"
            >
              {selected.length === 1
                ? selected[0].label
                :
                  "Wiele"
                  }
            </button>

            {isOpen && (
              <ul className="absolute z-10 mt-1 w-[calc(100%+10px)] border-b-2 border-secondary-light rounded shadow-md max-h-60 overflow-auto custom-scrollbar">
                {options.map((option) => {
                  const isSelected = selected.some((o) => o.value === option.value);
                  return (
                    <li
                      key={option.value}
                      onClick={() => handleSelect(option)}
                      className={`px-4 py-2 text-center flex justify-between items-center cursor-pointer border-b-2 border-secondary-light transition-colors
                      hover:bg-secondary-light hover:text-primary-dark ${
                        isSelected ? "bg-secondary-light text-primary-dark font-semibold" : ""
                      }`}
                    >
                      {option.label}
                      {isSelected && <Check className="w-4 h-4 ml-2 text-primary-dark" />}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
