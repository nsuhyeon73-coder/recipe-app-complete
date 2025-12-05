import { useState, useEffect, useRef } from "react";

function SearchBar({
  onSearch,
  onRandom,
  searchQuery,
  language,
  onRecipeClick,
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 2) {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
          );
          const data = await response.json();

          if (data.meals) {
            // 최대 5개만 표시
            setSuggestions(data.meals.slice(0, 5));
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        } catch (error) {
          console.error("자동완성 오류:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (meal) => {
    setQuery(meal.strMeal);
    setShowSuggestions(false);
    if (onRecipeClick) {
      onRecipeClick(meal.idMeal);
    }
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
        <div className="relative" ref={suggestionsRef}>
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
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                placeholder={
                  language === "ko"
                    ? "레시피 검색... (예: ap, chi, pas)"
                    : "Search recipes... (e.g., ap, chi, pas)"
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

          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
              {suggestions.map((meal) => (
                <button
                  key={meal.idMeal}
                  onClick={() => handleSuggestionClick(meal)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {meal.strMeal}
                    </div>
                    <div className="text-sm text-gray-500">
                      {meal.strCategory}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
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
              className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm
                       hover:bg-gold-500/20 hover:text-gold-600 transition-all
                       border border-gray-200 hover:border-gold-500/30"
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
