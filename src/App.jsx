import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedSections from "./components/FeaturedSections";
import SearchBar from "./components/SearchBar";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetail from "./components/RecipeDetail";
import Testimonials from "./components/Reviews";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CategoryPage from "./components/CategoryPage";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("ko");
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchRandomRecipes = async () => {
    setLoading(true);
    setSearchQuery("");
    setActiveCategory("");
    setError(null);
    try {
      const promises = Array.from({ length: 12 }, () =>
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
          .then((res) => res.json())
          .then((data) => data.meals[0])
          .catch(() => null)
      );

      const fetchedMeals = await Promise.all(promises);
      const validMeals = fetchedMeals.filter((meal) => meal !== null);

      if (validMeals.length > 0) {
        setRecipes(validMeals);
      } else {
        throw new Error("랜덤 레시피를 불러올 수 없습니다");
      }
    } catch (error) {
      console.error("레시피를 불러오는데 실패했습니다:", error);
      setError("레시피를 불러오는데 실패했습니다. 다시 시도해주세요.");
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
        );
        const data = await response.json();
        if (data.meals) {
          setRecipes(data.meals.slice(0, 12));
          setError(null);
        }
      } catch (e) {
        console.error("대체 검색도 실패:", e);
      }
    } finally {
      setLoading(false);
    }
  };

  const searchRecipes = async (query) => {
    if (!query.trim()) {
      fetchRandomRecipes();
      return;
    }
    setLoading(true);
    setSearchQuery(query);
    setActiveCategory("");
    setError(null);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) throw new Error("검색 실패");
      const data = await response.json();

      let filteredRecipes = data.meals || [];

      // Pasta 검색 시 Pasta 카테고리만 필터링
      if (query.toLowerCase() === "pasta") {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.strCategory === "Pasta"
        );
      }

      setRecipes(filteredRecipes);
    } catch (error) {
      console.error("검색에 실패했습니다:", error);
      setError("검색에 실패했습니다. 다시 시도해주세요.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage("category");
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setSelectedCategory("");
    setActiveCategory("");
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const handleOpenRoulette = async () => {
    console.log("🎲 랜덤 레시피 버튼 클릭됨!");
    try {
      console.log("API 호출 시작...");
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      console.log("받은 데이터:", data);
      if (data.meals && data.meals[0]) {
        console.log("레시피 설정:", data.meals[0].strMeal);
        setSelectedRecipe(data.meals[0]);
      } else {
        console.error("레시피 데이터가 없습니다");
      }
    } catch (error) {
      console.error("랜덤 레시피를 불러오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    if (currentPage === "home") {
      fetchRandomRecipes();
    }
  }, [currentPage]);

  if (currentPage === "category") {
    return (
      <CategoryPage
        category={selectedCategory}
        language={language}
        onLanguageChange={setLanguage}
        onBack={handleBackToHome}
        onCategoryChange={handleCategoryClick}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white relative noise-overlay">
      <Header
        scrolled={scrolled}
        onCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
        language={language}
        onLanguageChange={setLanguage}
      />

      <Hero onRandomClick={handleOpenRoulette} language={language} />

      <FeaturedSections language={language} onRecipeClick={fetchRecipeDetail} />

      <main className="relative z-10">
        <SearchBar
          onSearch={searchRecipes}
          onRandom={fetchRandomRecipes}
          searchQuery={searchQuery}
          language={language}
        />

        <RecipeGrid
          recipes={recipes}
          loading={loading}
          onRecipeClick={fetchRecipeDetail}
          onCategoryClick={handleCategoryClick}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onRandom={fetchRandomRecipes}
          language={language}
        />

        <Testimonials language={language} />
      </main>

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

export default App;
