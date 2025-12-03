import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import RecipeCard from "./RecipeCard";
import RecipeDetail from "./RecipeDetail";

function CategoryPage({
  category,
  language,
  onLanguageChange,
  onBack,
  onCategoryChange,
}) {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const categoryNames = {
    ko: {
      Beef: "소고기",
      Chicken: "치킨",
      Seafood: "해산물",
      Pasta: "파스타",
      Dessert: "디저트",
      Vegetarian: "채식",
      Breakfast: "아침",
      Pork: "돼지고기",
      Lamb: "양고기",
      Goat: "염소고기",
    },
    en: {
      Beef: "Beef",
      Chicken: "Chicken",
      Seafood: "Seafood",
      Pasta: "Pasta",
      Dessert: "Dessert",
      Vegetarian: "Vegetarian",
      Breakfast: "Breakfast",
      Pork: "Pork",
      Lamb: "Lamb",
      Goat: "Goat",
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchCategoryRecipes();
  }, [category]);

  const fetchCategoryRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
          category
        )}`
      );
      const data = await response.json();

      if (data.meals) {
        const meals = data.meals.slice(0, 12);

        const detailPromises = meals.map((meal) =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
          )
            .then((res) => res.json())
            .then((detailData) => detailData.meals[0])
            .catch(() => ({
              ...meal,
              strCategory: category,
              strArea: "",
              strTags: "",
            }))
        );

        const detailedRecipes = await Promise.all(detailPromises);
        setRecipes(detailedRecipes);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error("레시피를 불러오는데 실패했습니다:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeDetail = async (id) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      if (data.meals) {
        setSelectedRecipe(data.meals[0]);
      }
    } catch (error) {
      console.error("레시피 상세 정보를 불러오는데 실패했습니다:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white relative noise-overlay">
      <Header
        scrolled={scrolled}
        onCategoryClick={onCategoryChange}
        activeCategory={category}
        language={language}
        onLanguageChange={onLanguageChange}
        onLogoClick={onBack}
      />

      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gold-50 to-wine-50 pt-20">
        <div className="absolute inset-0 hero-pattern"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">
              {categoryNames[language][category] || category}
            </span>
          </h1>

          <p className="text-lg text-gray-600">
            {language === "ko"
              ? `${
                  categoryNames.ko[category] || category
                } 카테고리의 맛있는 레시피`
              : `Delicious ${category} recipes`}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gold-500/10 border border-gold-500/20">
                <div className="w-5 h-5 border-2 border-gold-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gold-600 font-medium">
                  {language === "ko"
                    ? "레시피를 불러오는 중..."
                    : "Loading recipes..."}
                </span>
              </div>
            </div>

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
          </>
        ) : recipes.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">😢</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === "ko"
                ? "레시피를 찾을 수 없습니다"
                : "No recipes found"}
            </h2>
            <p className="text-gray-600 mb-8">
              {language === "ko"
                ? "다른 카테고리를 확인해보세요!"
                : "Try checking other categories!"}
            </p>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 
                       text-white font-bold rounded-full text-lg
                       hover:from-gold-400 hover:to-gold-500 transition-all
                       shadow-xl shadow-gold-500/30"
            >
              {language === "ko" ? "홈으로 돌아가기" : "Back to Home"}
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <p className="text-gray-600">
                {language === "ko" ? "총" : "Total"}{" "}
                <span className="text-gold-600 font-semibold text-xl">
                  {recipes.length}
                </span>
                {language === "ko" ? "개의 레시피" : " recipes"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  onClick={() => fetchRecipeDetail(recipe.idMeal)}
                  index={index}
                  language={language}
                />
              ))}
            </div>
          </>
        )}
      </section>

      <Footer language={language} />

      <ScrollToTop scrolled={scrolled} />

      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          language={language}
        />
      )}
    </div>
  );
}

export default CategoryPage;
