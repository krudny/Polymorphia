"use client"

import {Check} from "lucide-react";

export default function CustomSelect({isOpen, setIsOpen, selectedValues, setSelectedValues, possibleValues}) {
  const handleSelect = (option: (typeof possibleValues)[0]) => {
    setSelectedValues((prev) =>
      prev.some((o) => o.value === option.value)
        ? prev.filter((o) => o.value !== option.value)
        : [...prev, option]
    );
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full border-b-2 border-secondary-light
                  hover:bg-secondary-light hover:text-primary-dark
                  px-6 py-1 text-xl  flex-centered transition-colors
                  duration-400 ease-[cubic-bezier(0.34,1,0.2,1)] focus:outline-none"
      >
        {selectedValues.length === 1 ? selectedValues[0].label : "Wiele"}
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-[url(/background-modal-dark.png)]  shadow-md max-h-44 overflow-y-scroll custom-scrollbar select-none focus:outline-none">
          {possibleValues.map((option) => {
            const isSelected = selectedValues.some((o) => o.value === option.value);
            return (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`relative  py-2 flex items-center justify-center  cursor-pointer border-b-2 border-secondary-light transition-colors
                hover:bg-secondary-light hover:text-primary-dark ${
                  isSelected ? "" : ""
                }`}
              >
                <span className="pl-2">{option.label}</span>
                {isSelected && (
                  <Check className="w-4 h-4 absolute right-2" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}