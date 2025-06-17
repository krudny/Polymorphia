import "../../styles/hall-of-fame.css";

export default function RankSearch() {
  return (
    <form className="hall-of-fame-search-form">
      <div className="hall-of-fame-search-wrapper">
        <span>search</span>
        <input
          type="text"
          placeholder="Znajdź zwierzaka..."
          className="hall-of-fame-search-input"
        />
      </div>
    </form>
  );
}
