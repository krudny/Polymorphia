"use client";

import { useState } from "react";
import { SelectorOption } from "@/components/selector/types";
import Selector from "@/components/selector";

export default function Test() {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const options: SelectorOption[] = [
    { value: "option1", label: "Opcja 1" },
    { value: "option2", label: "Opcja 2" },
    { value: "option3", label: "Opcja 3" },
  ];

  return (
    <div className="w-[500px] h-[500px] border-primary-dark border-2 m-auto flex-col-centered">
      <div className="w-60 flex flex-col gap-y-6">
        <Selector
          options={options}
          value={selectedValue}
          onChange={setSelectedValue}
          placeholder="Wybierz wartość"
          size="sm"
        />

        <Selector
          options={options}
          value={selectedValue}
          onChange={setSelectedValue}
          placeholder="Wybierz wartość"
          size="md"
        />

        <Selector
          options={options}
          value={selectedValue}
          onChange={setSelectedValue}
          placeholder="Wybierz wartość"
          size="lg"
        />

        <Selector
          options={options}
          value={selectedValue}
          onChange={setSelectedValue}
          placeholder="Wybierz wartość"
          size="xl"
        />

        <Selector
          options={options}
          value={selectedValue}
          onChange={setSelectedValue}
          placeholder="Wybierz wartość"
          size="2xl"
          padding="xs"
        />

        <p className="mt-4">Wybrana wartość: {selectedValue || "Brak"}</p>
      </div>
    </div>
  );
}
