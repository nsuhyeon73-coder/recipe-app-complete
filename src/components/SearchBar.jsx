import { useState } from "react";

function SearchBar({ onSearch, onRandom, searchQuery, language }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const popularSearches = [
    "Chicken",
    "Pasta",
    "Salad",
    "Curry",
    "Soup",
    "Cake",
  ];

  return (
    <div id="recipes" className="relative py-12 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Search Form */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 to-wine-500/20 rounded-2xl blur-lg"></div>
          <form
            onSubmit={handleSubmit}
            className="relative flex gap-2 p-2 rounded-2xl bg-white border border-gray-200 shadow-lg"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  language === "ko"
                    ? "레시피 검색... (예: chicken, pasta, curry)"
                    : "Search recipes... (e.g., chicken, pasta, curry)"
                }
                className="w-full pl-12 pr-4 py-4 bg-transparent text-gray-900 placeholder-gray-400 
                         focus:outline-none text-lg"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-4 bg-gradient-to-r from-gold-500 to-gold-600 
                       text-white font-bold rounded-xl text-sm sm:text-base
                       hover:from-gold-400 hover:to-gold-500 transition-all
                       shadow-lg shadow-gold-500/25 btn-shine whitespace-nowrap"
            >
              {language === "ko" ? "검색" : "Search"}
            </button>
            <button
              type="button"
              onClick={onRandom}
              className="px-4 sm:px-6 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl
                       hover:bg-gray-200 transition-all border border-gray-200
                       flex items-center gap-2 whitespace-nowrap"
            >
              <span className="hidden sm:inline">
                {language === "ko" ? "랜덤" : "Random"}
              </span>
            </button>
          </form>
        </div>

        {/* Popular Searches */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-gray-500 text-sm">
            {language === "ko" ? "인기 검색:" : "Popular:"}
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => {
                setQuery(term);
                onSearch(term);
              }}
              className="px-2 py-1 text-gray-600 text-sm
                       hover:text-gold-600 transition-all cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Current Search Info */}
        {searchQuery && (
          <div className="mt-4 text-center">
            <span className="text-gray-600">
              "
              <span className="text-gold-600 font-semibold">{searchQuery}</span>
              " {language === "ko" ? "검색 결과" : "search results"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
