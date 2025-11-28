import { useState, useEffect } from "react";

// RecipeDetail 컴포넌트
function RecipeDetail({ recipe, onClose, language }) {
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const ingredientTranslations = {
    // 고기류
    Chicken: "닭고기",
    "Chicken Breast": "닭가슴살",
    "Chicken Breasts": "닭가슴살",
    "Chicken Thighs": "닭다리살",
    "Chicken Legs": "닭다리",
    "Chicken Stock": "닭육수",
    Beef: "소고기",
    "Ground Beef": "소고기 간것",
    "Beef Fillet": "소고기 안심",
    "Beef Stock": "소고기 육수",
    "Minced Beef": "다진 소고기",
    Pork: "돼지고기",
    "Pork Chops": "돼지 등심",
    Bacon: "베이컨",
    Lamb: "양고기",
    "Lamb Mince": "양고기 간것",
    "Lamb Shoulder": "양 어깨살",
    Turkey: "칠면조",
    Duck: "오리고기",
    Sausages: "소시지",
    Sausage: "소시지",

    // 해산물
    Salmon: "연어",
    Tuna: "참치",
    Cod: "대구",
    "Sea Bass": "농어",
    Prawns: "새우",
    Shrimp: "새우",
    "King Prawns": "대하",
    Lobster: "랍스터",
    Mussels: "홍합",
    Clams: "조개",
    Crab: "게",
    Squid: "오징어",
    Anchovies: "멸치",

    // 채소
    Onion: "양파",
    Onions: "양파",
    "Red Onion": "자주색 양파",
    Garlic: "마늘",
    "Garlic Clove": "마늘",
    Ginger: "생강",
    Tomato: "토마토",
    Tomatoes: "토마토",
    "Cherry Tomatoes": "방울토마토",
    "Tomato Puree": "토마토 퓨레",
    "Tinned Tomatos": "토마토 캔",
    Potato: "감자",
    Potatoes: "감자",
    "Sweet Potato": "고구마",
    Carrot: "당근",
    Carrots: "당근",
    Celery: "샐러리",
    "Bell Pepper": "피망",
    "Red Pepper": "빨간 피망",
    "Green Pepper": "청피망",
    Chilli: "고추",
    "Green Chilli": "청양고추",
    "Red Chilli": "홍고추",
    Mushrooms: "버섯",
    Spinach: "시금치",
    Lettuce: "상추",
    Cucumber: "오이",
    Zucchini: "주키니",
    Courgettes: "애호박",
    Eggplant: "가지",
    Aubergine: "가지",
    Broccoli: "브로콜리",
    Cauliflower: "콜리플라워",
    Cabbage: "양배추",
    "Spring Onions": "대파",
    Leek: "리크",
    Asparagus: "아스파라거스",

    // 곡물/면류
    Rice: "쌀",
    "Basmati Rice": "바스마티 쌀",
    "Jasmine Rice": "자스민 쌀",
    Pasta: "파스타",
    Spaghetti: "스파게티",
    Penne: "펜네",
    Fettuccine: "페투치네",
    Linguine: "링귀니",
    Noodles: "면",
    "Egg Noodles": "계란 면",
    "Rice Noodles": "쌀국수",
    Flour: "밀가루",
    "Plain Flour": "중력분",
    "Self-raising Flour": "박력분",
    Bread: "빵",
    "Bread Rolls": "롤빵",
    Breadcrumbs: "빵가루",

    // 유제품
    Milk: "우유",
    "Whole Milk": "전유",
    Cream: "크림",
    "Double Cream": "더블크림",
    "Single Cream": "싱글크림",
    "Heavy Cream": "생크림",
    "Sour Cream": "사워크림",
    Butter: "버터",
    "Unsalted Butter": "무염버터",
    Cheese: "치즈",
    Parmesan: "파마산 치즈",
    "Parmesan Cheese": "파마산 치즈",
    Mozzarella: "모짜렐라",
    "Cheddar Cheese": "체다 치즈",
    Feta: "페타 치즈",
    Ricotta: "리코타 치즈",
    Yogurt: "요거트",
    "Greek Yogurt": "그릭 요거트",

    // 조미료 및 소스
    Salt: "소금",
    "Sea Salt": "천일염",
    Pepper: "후추",
    "Black Pepper": "흑후추",
    "White Pepper": "백후추",
    "Olive Oil": "올리브유",
    "Vegetable Oil": "식용유",
    "Sesame Oil": "참기름",
    "Sunflower Oil": "해바라기유",
    "Soy Sauce": "간장",
    Sugar: "설탕",
    "Caster Sugar": "곱게 간 설탕",
    "Brown Sugar": "흑설탕",
    "Icing Sugar": "슈가파우더",
    Honey: "꿀",
    "Maple Syrup": "메이플 시럽",
    Vinegar: "식초",
    "White Wine Vinegar": "화이트 와인 식초",
    "Balsamic Vinegar": "발사믹 식초",
    "Rice Vinegar": "쌀식초",
    Lemon: "레몬",
    "Lemon Juice": "레몬즙",
    Lime: "라임",
    "Tomato Sauce": "토마토 소스",
    "Tomato Ketchup": "케첩",
    "Worcestershire Sauce": "우스터 소스",
    Tabasco: "타바스코",

    // 향신료
    Paprika: "파프리카",
    Cumin: "커민",
    Coriander: "고수",
    Turmeric: "강황",
    "Curry Powder": "카레 가루",
    "Chili Powder": "고춧가루",
    "Cayenne Pepper": "카이엔 페퍼",
    Cinnamon: "계피",
    Nutmeg: "육두구",
    Cardamom: "카다몬",
    "Bay Leaf": "월계수잎",
    "Bay Leaves": "월계수잎",
    Thyme: "타임",
    Rosemary: "로즈마리",
    Oregano: "오레가노",
    Basil: "바질",
    Parsley: "파슬리",
    Mint: "민트",

    // 기타
    Egg: "계란",
    Eggs: "계란",
    "Egg Yolks": "노른자",
    "Egg White": "흰자",
    Water: "물",
    Stock: "육수",
    "Vegetable Stock": "야채 육수",
    Wine: "와인",
    "White Wine": "화이트 와인",
    "Red Wine": "레드 와인",
    "Coconut Milk": "코코넛 밀크",
    "Coconut Cream": "코코넛 크림",
    "Peanut Butter": "땅콩버터",
    Almond: "아몬드",
    Almonds: "아몬드",
    Cashews: "캐슈넛",
    Walnuts: "호두",
    "Pine Nuts": "잣",
    Cocoa: "코코아",
    "Dark Chocolate": "다크 초콜릿",
    Vanilla: "바닐라",
    "Vanilla Extract": "바닐라 추출액",
    Orange: "오렌지",
    "Demerara Sugar": "데메라라 설탕",
    "Grand Marnier": "그랑 마르니에",
    "Christmas Pudding": "크리스마스 푸딩",
    Custard: "커스터드",
    Mascarpone: "마스카포네",
    "Flaked Almonds": "슬라이스 아몬드",
  };

  const measureTranslations = {
    tsp: "작은술",
    tbsp: "큰술",
    tablespoon: "큰술",
    tablespoons: "큰술",
    teaspoon: "작은술",
    teaspoons: "작은술",
    cup: "컵",
    cups: "컵",
    ml: "ml",
    g: "g",
    kg: "kg",
    oz: "온스",
    lb: "파운드",
    lbs: "파운드",
    pinch: "한꼬집",
    handful: "한줌",
    Handful: "한줌",
    "to taste": "적당량",
    chopped: "다진",
    diced: "깍둑썰기한",
    sliced: "슬라이스한",
    grated: "간",
    Grated: "간",
    minced: "다진",
    crushed: "으깬",
    finely: "곱게",
    roughly: "대충",
    thinly: "얇게",
  };

  const translateIngredient = (ingredient) => {
    if (language === "en") return ingredient;

    // 정확한 매칭 먼저 시도
    if (ingredientTranslations[ingredient]) {
      return ingredientTranslations[ingredient];
    }

    // 대소문자 구분 없이 매칭
    const lowerIngredient = ingredient.toLowerCase();
    for (const [key, value] of Object.entries(ingredientTranslations)) {
      if (key.toLowerCase() === lowerIngredient) {
        return value;
      }
    }

    return ingredient;
  };

  const translateMeasure = (measure) => {
    if (language === "en" || !measure) return measure;

    let translated = measure;
    Object.keys(measureTranslations).forEach((key) => {
      const regex = new RegExp(`\\b${key}\\b`, "gi");
      translated = translated.replace(regex, measureTranslations[key]);
    });

    return translated;
  };

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: translateIngredient(ingredient),
          measure: translateMeasure(measure?.trim() || ""),
          original: ingredient,
        });
      }
    }
    return ingredients;
  };

  const translateInstructions = async () => {
    if (showTranslation && translatedText) {
      setShowTranslation(false);
      return;
    }

    if (translatedText) {
      setShowTranslation(true);
      return;
    }

    setIsTranslating(true);
    try {
      const text = recipe.strInstructions;
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t&q=${encodeURIComponent(
          text
        )}`
      );
      const data = await response.json();
      const translated = data[0].map((item) => item[0]).join("");
      setTranslatedText(translated);
      setShowTranslation(true);
    } catch (error) {
      console.error("Translation error:", error);
      alert(language === "ko" ? "번역에 실패했습니다." : "Translation failed.");
    } finally {
      setIsTranslating(false);
    }
  };

  const ingredients = getIngredients();

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        className="relative w-full max-w-4xl mx-4 my-8 modal-animate"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm
                     flex items-center justify-center text-gray-600 hover:text-gray-900 
                     hover:bg-white transition-all border border-gray-200 shadow-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Hero Image */}
          <div className="relative h-64 sm:h-80 md:h-96">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>

            {/* Floating Info Cards */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-sm shadow-lg">
                🍽️ {recipe.strCategory}
              </span>
              {recipe.strArea && (
                <span className="px-4 py-2 rounded-full glass text-gray-900 font-medium text-sm border border-gray-200 bg-white/90">
                  🌍 {recipe.strArea}
                </span>
              )}
              {recipe.strTags && (
                <span className="px-4 py-2 rounded-full bg-wine-500/90 text-white font-medium text-sm border border-wine-600/20">
                  🏷️ {recipe.strTags.split(",")[0]}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {recipe.strMeal}
            </h2>

            {/* Ingredients Section */}
            <div className="mb-8">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                  📋
                </span>
                {language === "ko" ? "재료" : "Ingredients"}{" "}
                <span className="text-gold-600 font-normal text-base">
                  ({ingredients.length}
                  {language === "ko" ? "가지" : " items"})
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                {ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-gold-50 transition-colors border border-gray-100"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500/20 to-wine-500/20 flex items-center justify-center text-sm font-semibold text-gray-700">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-gray-900 font-medium">
                        {item.ingredient}
                      </span>
                      {item.measure && (
                        <span className="text-gray-600 ml-2">
                          - {item.measure}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-wine-400 to-wine-600 flex items-center justify-center">
                    👨‍🍳
                  </span>
                  {language === "ko" ? "조리 방법" : "Instructions"}
                </h3>

                {language === "ko" && (
                  <button
                    onClick={translateInstructions}
                    disabled={isTranslating}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-medium
                             hover:bg-blue-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isTranslating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        번역 중...
                      </>
                    ) : showTranslation ? (
                      <>
                        <span>🔄</span>
                        원문 보기
                      </>
                    ) : (
                      <>
                        <span>🌐</span>
                        한국어로 번역
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="prose prose-gray max-w-none">
                  {showTranslation
                    ? translatedText
                        .split("\n")
                        .filter((p) => p.trim())
                        .map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-gray-700 leading-relaxed mb-4 last:mb-0"
                          >
                            {paragraph}
                          </p>
                        ))
                    : recipe.strInstructions
                        .split("\n")
                        .filter((p) => p.trim())
                        .map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-gray-700 leading-relaxed mb-4 last:mb-0"
                          >
                            {paragraph}
                          </p>
                        ))}
                </div>
              </div>
            </div>

            {/* Video & Source Links */}
            <div className="flex flex-wrap gap-4">
              {recipe.strYoutube && (
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-6 py-4 
                           bg-red-600 text-white rounded-xl font-bold
                           hover:bg-red-500 transition-all shadow-lg shadow-red-600/25"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  {language === "ko" ? "YouTube에서 보기" : "Watch on YouTube"}
                </a>
              )}
              {recipe.strSource && (
                <a
                  href={recipe.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-4 
                           bg-gray-100 text-gray-700 rounded-xl font-medium
                           hover:bg-gray-200 transition-all border border-gray-200"
                >
                  🔗 {language === "ko" ? "원본 레시피" : "Original Recipe"}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
