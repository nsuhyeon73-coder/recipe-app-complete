import { useState, useEffect } from "react";

function FeaturedSections({ language, onRecipeClick }) {
  const [activeTab, setActiveTab] = useState("special");
  const [specialRecipes, setSpecialRecipes] = useState([]);
  const [monthlyRecipes, setMonthlyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  const allSpecialSearches = [
    [
      { name: language === "ko" ? "생일" : "Birthday", search: "cake" },
      { name: language === "ko" ? "크리스마스" : "Christmas", search: "christmas" },
      { name: language === "ko" ? "추수감사절" : "Thanksgiving", search: "turkey" },
      { name: language === "ko" ? "발렌타인데이" : "Valentine's Day", search: "chocolate" },
      { name: language === "ko" ? "할로윈" : "Halloween", search: "pumpkin" },
      { name: language === "ko" ? "신년" : "New Year", search: "trifle" },
    ],
    [
      { name: language === "ko" ? "생일" : "Birthday", search: "birthday" },
      { name: language === "ko" ? "크리스마스" : "Christmas", search: "yule log" },
      { name: language === "ko" ? "추수감사절" : "Thanksgiving", search: "cranberry" },
      { name: language === "ko" ? "발렌타인데이" : "Valentine's Day", search: "strawberry" },
      { name: language === "ko" ? "할로윈" : "Halloween", search: "apple" },
      { name: language === "ko" ? "신년" : "New Year", search: "champagne" },
    ],
    [
      { name: language === "ko" ? "생일" : "Birthday", search: "dessert" },
      { name: language === "ko" ? "크리스마스" : "Christmas", search: "mince" },
      { name: language === "ko" ? "추수감사절" : "Thanksgiving", search: "sweet potato" },
      { name: language === "ko" ? "발렌타인데이" : "Valentine's Day", search: "cherry" },
      { name: language === "ko" ? "할로윈" : "Halloween", search: "butternut" },
      { name: language === "ko" ? "신년" : "New Year", search: "prosecco" },
    ],
  ];

  const allMonthlySearches = [
    [
      { name: language === "ko" ? "스테이크 & 감자" : "Steak & Potatoes", search: "steak", badge: language === "ko" ? "11월의 시그니처 메뉴" : "November's Signature" },
      { name: language === "ko" ? "새우 파스타" : "Shrimp Pasta", search: "shrimp", badge: language === "ko" ? "인기 메뉴" : "Popular Choice" },
      { name: language === "ko" ? "연어 구이" : "Grilled Salmon", search: "salmon", badge: language === "ko" ? "건강식 추천" : "Healthy Option" },
    ],
    [
      { name: language === "ko" ? "비프 웰링턴" : "Beef Wellington", search: "beef", badge: language === "ko" ? "특별 메뉴" : "Special Dish" },
      { name: language === "ko" ? "랍스터 요리" : "Lobster Dish", search: "seafood", badge: language === "ko" ? "고급 요리" : "Premium Choice" },
      { name: language === "ko" ? "닭가슴살 구이" : "Chicken Breast", search: "chicken breast", badge: language === "ko" ? "단백질 추천" : "Protein Rich" },
    ],
    [
      { name: language === "ko" ? "양고기 구이" : "Lamb Roast", search: "lamb", badge: language === "ko" ? "풍미 가득" : "Full of Flavor" },
      { name: language === "ko" ? "참치 스테이크" : "Tuna Steak", search: "tuna", badge: language === "ko" ? "신선한 해산물" : "Fresh Seafood" },
      { name: language === "ko" ? "돼지갈비" : "Pork Ribs", search: "pork", badge: language === "ko" ? "인기 메뉴" : "Fan Favorite" },
    ],
  ];

  useEffect(() => {
    fetchFeaturedRecipes(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSetIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % allSpecialSearches.length;
        fetchFeaturedRecipes(nextIndex);
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchFeaturedRecipes = async (setIndex) => {
    setLoading(true);
    try {
      const currentSpecialSearches = allSpecialSearches[setIndex];
      const currentMonthlySearches = allMonthlySearches[setIndex];

      const specialPromises = currentSpecialSearches.map(occasion =>
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${occasion.search}`)
          .then(res => res.json())
          .then(data => data.meals ? { ...data.meals[0], occasion: occasion.name } : null)
          .catch(() => null)
      );

      const monthlyPromises = currentMonthlySearches.map(monthly =>
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${monthly.search}`)
          .then(res => res.json())
          .then(data => data.meals ? { ...data.meals[0], badge: monthly.badge, customName: monthly.name } : null)
          .catch(() => null)
      );

      const [specialResults, monthlyResults] = await Promise.all([
        Promise.all(specialPromises),
        Promise.all(monthlyPromises)
      ]);

      setSpecialRecipes(specialResults.filter(recipe => recipe !== null));
      setMonthlyRecipes(monthlyResults.filter(recipe => recipe !== null));
    } catch (error) {
      console.error("Featured recipes fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  if (loading && specialRecipes.length === 0) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gold-500/10 border border-gold-500/20">
              <div className="w-5 h-5 border-2 border-gold-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gold-600 font-medium">
                {language === "ko" ? "추천 레시피 불러오는 중..." : "Loading featured recipes..."}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-12">
          <div className="inline-flex gap-4 p-2 rounded-full bg-gray-100 border border-gray-200">
            <button onClick={() => scrollToSection("special")} className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === "special" ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/25" : "text-gray-600 hover:text-gray-900"}`}>
              <span className="text-xl">🎉</span>
              {language === "ko" ? "기념 요리 추천" : "Special Occasion"}
            </button>
            <button onClick={() => scrollToSection("monthly")} className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === "monthly" ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/25" : "text-gray-600 hover:text-gray-900"}`}>
              <span className="text-xl">⭐</span>
              {language === "ko" ? "이달의 추천 메뉴" : "Monthly Recommendations"}
            </button>
          </div>
        </div>

        <div id="special" className="mb-24 scroll-mt-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-4">
              <span className="text-2xl">🎉</span>
              <span className="text-gold-600 font-medium">{language === "ko" ? "특별한 날을 위한" : "For Special Days"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {language === "ko" ? <><span className="gradient-text">기념일</span>을 위한 특별한 요리</> : <>Special <span className="gradient-text">Occasion</span> Recipes</>}
            </h2>
            <p className="text-gray-600">{language === "ko" ? "소중한 순간을 더 특별하게 만들어줄 레시피" : "Make your precious moments even more special"}</p>
            <p className="text-sm text-gold-600 font-semibold mt-2 animate-pulse">
              {language === "ko" ? "💫 2초마다 자동으로 바뀝니다" : "💫 Auto-rotating every 2 seconds"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialRecipes.map((recipe, index) => (
              <div key={`${recipe.idMeal}-${currentSetIndex}-${index}`} onClick={() => onRecipeClick(recipe.idMeal)} className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-gold-500/50 cursor-pointer card-hover shadow-sm hover:shadow-xl animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="relative h-64 overflow-hidden">
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-full object-cover recipe-card-img" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-3 right-3 px-4 py-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white text-sm font-bold shadow-lg">{recipe.occasion}</div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                    <span className="text-2xl">👀</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-gold-600 transition-colors line-clamp-2">{recipe.strMeal}</h3>
                  <p className="text-sm text-gray-600 mt-1">{recipe.strCategory}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        <div id="monthly" className="scroll-mt-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wine-500/10 border border-wine-500/20 mb-4">
              <span className="text-2xl">⭐</span>
              <span className="text-wine-600 font-medium">{language === "ko" ? "매달 업데이트" : "Updated Monthly"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {language === "ko" ? <>이달의 <span className="gradient-text">추천 메뉴</span></> : <><span className="gradient-text">Monthly</span> Recommendations</>}
            </h2>
            <p className="text-gray-600">{language === "ko" ? "이번 달 가장 인기있는 메뉴를 만나보세요" : "Discover this month's most popular dishes"}</p>
            <p className="text-sm text-wine-600 font-semibold mt-2 animate-pulse">
              {language === "ko" ? "💫 2초마다 자동으로 바뀝니다" : "💫 Auto-rotating every 2 seconds"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monthlyRecipes.map((recipe, index) => (
              <div key={`${recipe.idMeal}-${currentSetIndex}-${index}`} onClick={() => onRecipeClick(recipe.idMeal)} className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-wine-500/50 cursor-pointer card-hover shadow-sm hover:shadow-xl animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="relative h-72 overflow-hidden">
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-full object-cover recipe-card-img" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute top-3 left-3 px-4 py-2 rounded-full glass text-gray-900 text-sm font-medium border border-white/20 bg-white/90">{recipe.badge}</div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">{recipe.customName || recipe.strMeal}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <span>⭐</span>
                      <span>{language === "ko" ? "추천 메뉴" : "Recommended"}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-wine-500/0 group-hover:bg-wine-500/10 transition-colors duration-300"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-wine-500/0 to-transparent group-hover:via-wine-500 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedSections;
