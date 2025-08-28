import "./index.css";
import { ChangeEvent, useCallback } from "react";
import { SearchProps } from "@/components/search/types";

export default function Search({
                                 search,
                                 setSearch,
                                 placeholder,
                               }: SearchProps) {
  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.target.value);
  }, [setSearch]);

  return (
    <form
      className="search"
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="search-wrapper">
        <span>search</span>
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="search-input"
        />
      </div>
    </form>
  );
}
