export default function RankSearch() {
    return (
        <form className="w-64 flex-centered">
            <div className="px-2 w-full h-14 flex items-center border-b-2  border-neutral-800 text-3xl">
                <span className="material-symbols text-4xl">search</span>
                <input
                    type="text"
                    placeholder="Znajdź zwierzaka..."
                    className="flex-1 h-full px-3 bg-transparent text-neutral-800 placeholder-neutral-800 focus:outline-none"
                />
            </div>
        </form>
    );
}