"use client"

import "../../styles/hall-of-fame.css";
import {useContext, useState} from "react";
import {HallOfFameContext} from "@/components/providers/HallOfFameContext";
import { useDebouncedSuggestions} from "@/components/hall-of-fame/debouncer";
import {API_STATIC_URL} from "@/services/api";
import Image from "next/image";

export default function RankSearch() {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { suggestions, loading } = useDebouncedSuggestions(search);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <form className="hall-of-fame-search-form" autoComplete="off">
      <div className="hall-of-fame-search-wrapper flex-col relative">
        <div className="flex ">
          <span>search</span>
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            placeholder="Znajdź zwierzaka..."
            className="hall-of-fame-search-input"
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            onFocus={() => setShowSuggestions(true)}
          />
        </div>
        {showSuggestions && search.length >= 2 && (
          <div className="top-full bg-primary-dark  w-full absolute  z-[999]">
            {!loading && suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="py-2 flex items-center border-b-2 first:border-t-2 border-secondary-light
                hover:bg-secondary-light hover:text-primary-dark
                transition-colors duration-200 ease-in-out"
                onMouseDown={() => handleSuggestionClick(suggestion)}
                style={{ cursor: "pointer" }}
              >
                <div className="relative w-9 mx-2 aspect-square ">
                <Image
                  src={`${API_STATIC_URL}/images/evolution-stages/6.jpg`}
                  alt="User profile"
                  fill
                  className="object-cover rounded-md aspect-square"
                  priority
                />
                </div>
                <p className="text-2xl">{suggestion}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
