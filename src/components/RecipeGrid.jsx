import RecipeCard from "./RecipeCard";

function RecipeGrid({
  recipes,
  loading,
  onRecipeClick,
  onCategoryClick,
  activeCategory,
  searchQuery,
  onRandom,
  language,
}) {
  const categories = [
    { id: "Beef", label: language === "ko" ? "소고기" : "Beef" },
    {
      id: "Chicken",
      label: language === "ko" ? "치킨" : "Chicken",
    },
    {
      id: "Seafood",
      label: language === "ko" ? "해산물" : "Seafood",
    },
    { id: "Pasta", label: language === "ko" ? "파스타" : "Pasta" },
    {
      id: "Dessert",
      label: language === "ko" ? "디저트" : "Dessert",
    },
    {
      id: "Vegetarian",
      label: language === "ko" ? "채식" : "Vegetarian",
    },
    {
      id: "Breakfast",
      label: language === "ko" ? "아침" : "Breakfast",
    },
    { id: "Pork", label: language === "ko" ? "돼지고기" : "Pork" },
  ];

  // Loading Skeleton
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Loading Text */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gold-500/10 border border-gold-500/20">
            <div className="w-5 h-5 border-2 border-gold-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gold-600 font-medium">
              {language === "ko"
                ? "맛있는 레시피를 불러오는 중..."
                : "Loading delicious recipes..."}
            </span>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm"
            >
              <div className="h-48 skeleton"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 w-3/4 skeleton rounded"></div>
                <div className="h-4 w-1/2 skeleton rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Empty State
  if (recipes.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language === "ko"
              ? "레시피를 찾을 수 없습니다"
              : "No recipes found"}
          </h2>
          <p className="text-gray-600 mb-8">
            {language === "ko"
              ? "다른 검색어로 시도하거나 랜덤 레시피를 확인해보세요!"
              : "Try different keywords or check out random recipes!"}
          </p>
          <button
            onClick={onRandom}
            className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 
                     text-white font-bold rounded-full text-lg
                     hover:from-gold-400 hover:to-gold-500 transition-all
                     shadow-xl shadow-gold-500/30 btn-shine"
          >
            {language === "ko" ? "랜덤 레시피 보기" : "View Random Recipes"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {activeCategory ? (
            <>
              <span className="gradient-text">
                {categories.find((c) => c.id === activeCategory)?.label ||
                  activeCategory}
              </span>{" "}
              {language === "ko" ? "레시피" : "Recipes"}
            </>
          ) : searchQuery ? (
            <>
              "<span className="gradient-text">{searchQuery}</span>"{" "}
              {language === "ko" ? "검색 결과" : "Search Results"}
            </>
          ) : (
            <>
              {language === "ko" ? "오늘의" : "Today's"}{" "}
              <span className="gradient-text">
                {language === "ko" ? "추천 레시피" : "Recommended Recipes"}
              </span>
            </>
          )}
        </h2>
        <p className="text-gray-600">
          {language === "ko" ? "총" : "Total"}{" "}
          <span className="text-gold-600 font-semibold">{recipes.length}</span>
          {language === "ko" ? "개의 레시피" : " recipes"}
        </p>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onClick={() => onRecipeClick(recipe.idMeal)}
            index={index}
            language={language}
          />
        ))}
      </div>
    </section>
  );
}

export default RecipeGrid;
