"use client";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useState } from "react";
import { Check } from "lucide-react";
import "../../../styles/general.css";
import CustomSelect from "@/components/button/CustomSelect";

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
  const [selectedValues, setSelectedValues] = useState<(typeof options)[0][]>([]);

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
            <CustomSelect isOpen={isOpen} setIsOpen={setIsOpen} possibleValues={options} selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
          </div>
        </div>
      </div>
    </div>
  );
}
