import { useState, useEffect } from "react";

function FeaturedSections({ language, onRecipeClick }) {
  const [activeTab, setActiveTab] = useState("special");
  const [specialRecipes, setSpecialRecipes] = useState([]);
  const [monthlyRecipes, setMonthlyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const translateRecipeName = (name) => {
    if (language !== "ko") return name;

    const translations = {
      "Victoria Sponge": "빅토리아 스펀지 케이크",
      "Carrot Cake": "당근 케이크",
      "Strawberry Cake": "딸기 케이크",
      "Christmas cake": "크리스마스 케이크",
      "Mince Pies": "민스 파이",
      Turkey: "칠면조",
      "Sweet Potato": "고구마",
      "Chocolate Brownies": "초콜릿 브라우니",
      "White chocolate": "화이트 초콜릿",
      "Pumpkin Pie": "호박 파이",
      Trifle: "트라이플",
      "Dundee cake": "던디 케이크",
      "Chocolate Cake": "초콜릿 케이크",
      "Lemon Cheesecake": "레몬 치즈케이크",
    };

    return translations[name] || name;
  };

  const allSpecialSearches = [
    {
      name: language === "ko" ? "생일" : "Birthday",
      search: "carrot cake",
      position: 0,
    },
    {
      name: language === "ko" ? "생일" : "Birthday",
      search: "strawberry cake",
      position: 0,
    },
    {
      name: language === "ko" ? "크리스마스" : "Christmas",
      search: "christmas cake",
      position: 1,
    },
    {
      name: language === "ko" ? "크리스마스" : "Christmas",
      search: "mince pies",
      position: 1,
    },
    {
      name: language === "ko" ? "추수감사절" : "Thanksgiving",
      search: "turkey",
      position: 2,
    },
    {
      name: language === "ko" ? "추수감사절" : "Thanksgiving",
      search: "sweet potato",
      position: 2,
    },
    {
      name: language === "ko" ? "발렌타인데이" : "Valentine's Day",
      search: "chocolate brownies",
      position: 3,
    },
    {
      name: language === "ko" ? "발렌타인데이" : "Valentine's Day",
      search: "white chocolate",
      position: 3,
    },
    {
      name: language === "ko" ? "할로윈" : "Halloween",
      search: "pumpkin pie",
      position: 4,
    },
    {
      name: language === "ko" ? "할로윈" : "Halloween",
      search: "apple frangipan",
      position: 4,
    },
    {
      name: language === "ko" ? "신년" : "New Year",
      search: "trifle",
      position: 5,
    },
    {
      name: language === "ko" ? "신년" : "New Year",
      search: "dundee cake",
      position: 5,
    },
  ];
  const monthlySearches = [
    {
      name: language === "ko" ? "스테이크 & 감자" : "Steak & Potatoes",
      search: "beef",
      badge:
        language === "ko" ? "11월의 시그니처 메뉴" : "November's Signature",
    },
    {
      name: language === "ko" ? "새우 파스타" : "Shrimp Pasta",
      search: "shrimp",
      badge: language === "ko" ? "인기 메뉴" : "Popular Choice",
    },
    {
      name: language === "ko" ? "연어 구이" : "Grilled Salmon",
      search: "salmon",
      badge: language === "ko" ? "건강식 추천" : "Healthy Option",
    },
  ];

  useEffect(() => {
    fetchAllRecipes();
    fetchMonthlyRecipes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentRecipeIndex((prev) => (prev + 1) % 12);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 600);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchAllRecipes = async () => {
    setLoading(true);
    try {
      const loadedRecipeIds = new Set();
      const recipePromises = allSpecialSearches.map(async (occasion) => {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${occasion.search}`
          );
          const data = await response.json();

          if (data.meals && data.meals.length > 0) {
            for (let meal of data.meals) {
              if (!loadedRecipeIds.has(meal.idMeal)) {
                loadedRecipeIds.add(meal.idMeal);
                return {
                  ...meal,
                  occasion: occasion.name,
                  position: occasion.position,
                };
              }
            }
          }
          return null;
        } catch (error) {
          return null;
        }
      });

      const results = await Promise.all(recipePromises);
      const validResults = results.filter((recipe) => recipe !== null);
      setSpecialRecipes(validResults);
    } catch (error) {
      console.error("Special recipes fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyRecipes = async () => {
    try {
      const monthlyPromises = monthlySearches.map((monthly) =>
        fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${monthly.search}`
        )
          .then((res) => res.json())
          .then((data) =>
            data.meals
              ? {
                  ...data.meals[0],
                  badge: monthly.badge,
                  customName: monthly.name,
                }
              : null
          )
          .catch(() => null)
      );

      const monthlyResults = await Promise.all(monthlyPromises);
      setMonthlyRecipes(monthlyResults.filter((recipe) => recipe !== null));
    } catch (error) {
      console.error("Monthly recipes fetch error:", error);
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

  const getDisplayRecipes = () => {
    if (specialRecipes.length === 0) return [];
    const displayRecipes = [];
    const positions = [0, 1, 2, 3, 4, 5];

    for (let pos of positions) {
      const recipesAtPosition = specialRecipes.filter(
        (r) => r.position === pos
      );
      if (recipesAtPosition.length > 0) {
        const index = currentRecipeIndex % 2;
        displayRecipes.push(recipesAtPosition[index] || recipesAtPosition[0]);
      }
    }
    return displayRecipes;
  };

  const displayRecipes = getDisplayRecipes();

  if (loading && specialRecipes.length === 0) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gold-500/10 border border-gold-500/20">
              <div className="w-5 h-5 border-2 border-gold-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gold-600 font-medium">
                {language === "ko"
                  ? "추천 레시피 불러오는 중..."
                  : "Loading featured recipes..."}
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
            <button
              onClick={() => scrollToSection("special")}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                activeTab === "special"
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/25"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {language === "ko" ? "기념 요리 추천" : "Special Occasion"}
            </button>
            <button
              onClick={() => scrollToSection("monthly")}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                activeTab === "monthly"
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/25"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {language === "ko"
                ? "이달의 추천 메뉴"
                : "Monthly Recommendations"}
            </button>
          </div>
        </div>

        <div id="special" className="mb-24 scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {language === "ko" ? (
                <>
                  <span className="gradient-text">기념일</span>을 위한 특별한
                  요리
                </>
              ) : (
                <>
                  Special <span className="gradient-text">Occasion</span>{" "}
                  Recipes
                </>
              )}
            </h2>
            <p className="text-gray-600">
              {language === "ko"
                ? "소중한 순간을 더 특별하게 만들어줄 레시피"
                : "Make your precious moments even more special"}
            </p>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-700 ease-in-out ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {displayRecipes.map((recipe, index) => (
              <div
                key={`${recipe.idMeal}-${currentRecipeIndex}-${index}`}
                onClick={() => onRecipeClick(recipe.idMeal)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-gold-500/50 cursor-pointer card-hover shadow-sm hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-full object-cover recipe-card-img"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-3 right-3 px-4 py-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white text-sm font-bold shadow-lg">
                    {recipe.occasion}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 group-hover:text-gold-600 transition-colors line-clamp-2 featured-recipe-title">
                    {translateRecipeName(recipe.strMeal)}
                  </h3>
                  <p className="text-gray-600 mt-1 featured-recipe-category">
                    {recipe.strCategory}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        <div id="monthly" className="scroll-mt-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wine-500/10 border border-wine-500/20 mb-4">
              <span className="text-wine-600 font-medium">
                {language === "ko" ? "매달 업데이트" : "Updated Monthly"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {language === "ko" ? (
                <>
                  이달의 <span className="gradient-text">추천 메뉴</span>
                </>
              ) : (
                <>
                  <span className="gradient-text">Monthly</span> Recommendations
                </>
              )}
            </h2>
            <p className="text-gray-600">
              {language === "ko"
                ? "이번 달 가장 인기있는 메뉴를 만나보세요"
                : "Discover this month's most popular dishes"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monthlyRecipes.map((recipe) => (
              <div
                key={recipe.idMeal}
                onClick={() => onRecipeClick(recipe.idMeal)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-wine-500/50 cursor-pointer card-hover shadow-sm hover:shadow-xl"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-full object-cover recipe-card-img"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute top-3 left-3 px-4 py-2 rounded-full glass text-gray-900 text-sm font-medium border border-white/20 bg-white/90">
                    {recipe.badge}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                      {recipe.customName || recipe.strMeal}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <span>
                        {language === "ko" ? "추천 메뉴" : "Recommended"}
                      </span>
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
