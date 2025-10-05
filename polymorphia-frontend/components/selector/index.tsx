"use client";

import { SelectorProps } from "@/components/selector/types";
import { selectorVariants } from "@/components/selector/variants";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function Selector({
  options,
  value,
  onChange,
  placeholder = "Wybierz opcję",
  className = "",
  disabled = false,
  size = "md",
  padding = "md",
}: SelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const styles = selectorVariants({ size, padding });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    if (!disabled) {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={selectorRef} className={clsx(styles.container(), className)}>
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={clsx(
          styles.button(),
          disabled && "selector-disabled",
          isOpen && "selector-open"
        )}
      >
        <span className={styles.value()}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={clsx(styles.arrow(), isOpen && "selector-arrow-open")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && !disabled && (
        <div className={styles.dropdown()}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={clsx(
                styles.option(),
                option.value === value && "selector-option-selected"
              )}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
