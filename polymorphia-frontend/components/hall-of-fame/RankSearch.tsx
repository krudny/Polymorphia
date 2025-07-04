import "../../styles/hall-of-fame.css";
import {useContext} from "react";
import {HallOfFameContext} from "@/components/providers/HallOfFameContext";

export default function RankSearch() {
    const { search, setSearch } = useContext(HallOfFameContext);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    return (
        <form
            className="hall-of-fame-search-form"
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="hall-of-fame-search-wrapper">
                <span>search</span>
                <input
                    type="text"
                    value={search}
                    onChange={handleInputChange}
                    placeholder="Znajdź zwierzaka..."
                    className="hall-of-fame-search-input"
                />
            </div>
        </form>
    );
}
