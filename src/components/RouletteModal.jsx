import { useState, useEffect } from "react";

function RouletteModal({ onClose, onSelectRecipe, language }) {
  const [stage, setStage] = useState(1); // 1: 요리 종류 선택, 2: 음식 선택
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const cuisines = [
    {
      id: "korean",
      name: language === "ko" ? "한식" : "Korean",
      color: "#FFB6C1",
      search: "korean",
    },
    {
      id: "western",
      name: language === "ko" ? "양식" : "Western",
      color: "#FFE66D",
      search: "american",
    },
    {
      id: "chinese",
      name: language === "ko" ? "중식" : "Chinese",
      color: "#87CEEB",
      search: "chinese",
    },
    {
      id: "japanese",
      name: language === "ko" ? "일식" : "Japanese",
      color: "#98D8C8",
      search: "japanese",
    },
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const spinFirstRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const spins = 5 + Math.random() * 3; // 5-8바퀴
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = rotation + spins * 360 + extraDegrees;

    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const adjustedRotation = (normalizedRotation + 45) % 360; // 45도 조정 (화살표가 12시 방향)
      const selectedIndex = Math.floor(adjustedRotation / 90);
      const selected = cuisines[selectedIndex % cuisines.length];

      setSelectedCuisine(selected);
      setIsSpinning(false);

      // 잠시 후 2단계로 이동
      setTimeout(() => {
        setStage(2);
        fetchRecipes(selected.search);
      }, 1500);
    }, 3000);
  };

  const fetchRecipes = async (area) => {
    try {
      // 해당 지역의 레시피 여러 개 가져오기
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      const data = await response.json();

      if (data.meals && data.meals.length > 0) {
        // 랜덤하게 섞기
        const shuffled = data.meals.sort(() => Math.random() - 0.5).slice(0, 8);
        setRecipes(shuffled);
      } else {
        // 대체 검색
        const fallbackResponse = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        const fallbackData = await fallbackResponse.json();
        const shuffled = fallbackData.meals
          .sort(() => Math.random() - 0.5)
          .slice(0, 8);
        setRecipes(shuffled);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const spinSecondRoulette = () => {
    if (isSpinning || recipes.length === 0) return;

    setIsSpinning(true);
    const spins = 5 + Math.random() * 3;
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = rotation + spins * 360 + extraDegrees;

    setRotation(totalRotation);

    setTimeout(async () => {
      const normalizedRotation = totalRotation % 360;
      const adjustedRotation =
        (normalizedRotation + 360 / recipes.length / 2) % 360;
      const selectedIndex = Math.floor(
        adjustedRotation / (360 / recipes.length)
      );
      const selected = recipes[selectedIndex % recipes.length];

      // 상세 정보 가져오기
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selected.idMeal}`
        );
        const data = await response.json();
        if (data.meals) {
          setSelectedRecipe(data.meals[0]);
          setIsSpinning(false);

          // 잠시 후 레시피 상세 보기
          setTimeout(() => {
            onSelectRecipe(data.meals[0].idMeal);
            onClose();
          }, 2000);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setIsSpinning(false);
      }
    }, 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl mx-4 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-2xl p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-100
                     flex items-center justify-center text-gray-600 hover:text-gray-900 
                     hover:bg-gray-200 transition-all"
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

          {/* Stage 1: 요리 종류 선택 */}
          {stage === 1 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {language === "ko"
                  ? "🎯 어떤 요리를 드시겠어요?"
                  : "🎯 What cuisine?"}
              </h2>
              <p className="text-gray-600 mb-8">
                {language === "ko"
                  ? "룰렛을 돌려 요리 종류를 선택하세요!"
                  : "Spin the roulette to select cuisine type!"}
              </p>

              {/* Roulette Wheel - Stage 1 - Pie Chart Style */}
              <div className="relative w-80 h-80 mx-auto mb-8">
                {/* Wheel - SVG Pie Chart */}
                <div
                  className="w-full h-full relative"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning
                      ? "transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                      : "none",
                  }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full rounded-full border-8 border-gray-800 shadow-2xl"
                  >
                    {cuisines.map((cuisine, index) => {
                      const startAngle = (index * 90 - 90) * (Math.PI / 180);
                      const endAngle =
                        ((index + 1) * 90 - 90) * (Math.PI / 180);

                      const x1 = 50 + 50 * Math.cos(startAngle);
                      const y1 = 50 + 50 * Math.sin(startAngle);
                      const x2 = 50 + 50 * Math.cos(endAngle);
                      const y2 = 50 + 50 * Math.sin(endAngle);

                      const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                      // 텍스트 위치 계산 (각 섹션의 중앙)
                      const textAngle = startAngle + Math.PI / 4;
                      const textX = 50 + 30 * Math.cos(textAngle);
                      const textY = 50 + 30 * Math.sin(textAngle);

                      return (
                        <g key={cuisine.id}>
                          <path
                            d={pathData}
                            fill={cuisine.color}
                            stroke="#fff"
                            strokeWidth="0.5"
                          />
                          <text
                            x={textX}
                            y={textY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#333"
                            fontSize="8"
                            fontWeight="bold"
                            transform={`rotate(${
                              index * 90
                            }, ${textX}, ${textY})`}
                          >
                            {cuisine.name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Arrow - Fixed at top (not rotating) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 pointer-events-none">
                  <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[40px] border-t-gray-800 drop-shadow-lg"></div>
                </div>

                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-800 z-10"></div>
              </div>

              {/* Spin Button */}
              <button
                onClick={spinFirstRoulette}
                disabled={isSpinning}
                className="px-10 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full text-lg
                         hover:from-red-400 hover:to-red-500 transition-all shadow-xl shadow-red-500/30 
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
              >
                {isSpinning ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    {language === "ko" ? "돌리는 중..." : "Spinning..."}
                  </>
                ) : (
                  <>
                    <span className="text-2xl">✓</span>
                    {language === "ko" ? "선택완료" : "Confirm"}
                  </>
                )}
              </button>

              {selectedCuisine && !isSpinning && (
                <div className="mt-6 p-4 bg-green-100 rounded-xl border border-green-300">
                  <p className="text-green-800 font-bold text-xl">
                    🎉 {selectedCuisine.name}{" "}
                    {language === "ko" ? "선택!" : "Selected!"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Stage 2: 음식 선택 */}
          {stage === 2 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {language === "ko" ? "🍽️ 오늘의 메뉴는?" : "🍽️ Today's Menu?"}
              </h2>
              <p className="text-gray-600 mb-2">
                <span className="text-gold-600 font-bold">
                  {selectedCuisine?.name}
                </span>{" "}
                {language === "ko" ? "중에서 선택!" : "Cuisine"}
              </p>
              <p className="text-gray-500 text-sm mb-8">
                {language === "ko"
                  ? "룰렛을 돌려 메뉴를 선택하세요!"
                  : "Spin to select your menu!"}
              </p>

              {/* Roulette Wheel - Stage 2 */}
              <div className="relative w-80 h-80 mx-auto mb-8">
                {/* Wheel */}
                <div
                  className="w-full h-full relative"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning
                      ? "transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                      : "none",
                  }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full rounded-full border-8 border-gray-800 shadow-2xl"
                  >
                    {recipes.map((recipe, index) => {
                      const colors = [
                        "#FFB6C1",
                        "#FFE66D",
                        "#87CEEB",
                        "#98D8C8",
                        "#F38181",
                        "#AA96DA",
                        "#FCBAD3",
                        "#A8E6CF",
                      ];
                      const anglePerSlice = 360 / recipes.length;
                      const startAngle =
                        (index * anglePerSlice - 90) * (Math.PI / 180);
                      const endAngle =
                        ((index + 1) * anglePerSlice - 90) * (Math.PI / 180);

                      const x1 = 50 + 50 * Math.cos(startAngle);
                      const y1 = 50 + 50 * Math.sin(startAngle);
                      const x2 = 50 + 50 * Math.cos(endAngle);
                      const y2 = 50 + 50 * Math.sin(endAngle);

                      const largeArcFlag = anglePerSlice > 180 ? 1 : 0;
                      const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                      // 텍스트 위치
                      const textAngle =
                        startAngle + (anglePerSlice * Math.PI) / 180 / 2;
                      const textX = 50 + 30 * Math.cos(textAngle);
                      const textY = 50 + 30 * Math.sin(textAngle);

                      return (
                        <g key={recipe.idMeal}>
                          <path
                            d={pathData}
                            fill={colors[index % colors.length]}
                            stroke="#fff"
                            strokeWidth="0.5"
                          />
                          <text
                            x={textX}
                            y={textY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#333"
                            fontSize="4"
                            fontWeight="bold"
                            transform={`rotate(${
                              index * anglePerSlice
                            }, ${textX}, ${textY})`}
                          >
                            {recipe.strMeal.length > 12
                              ? recipe.strMeal.substring(0, 10) + "..."
                              : recipe.strMeal}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Arrow - Fixed at top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 pointer-events-none">
                  <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[40px] border-t-gray-800 drop-shadow-lg"></div>
                </div>

                {/* Center Image or Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white border-4 border-gray-800 shadow-lg overflow-hidden z-10">
                  {selectedRecipe && (
                    <img
                      src={selectedRecipe.strMealThumb}
                      alt="Selected"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {!selectedRecipe && (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl">🍴</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Spin Button */}
              <button
                onClick={spinSecondRoulette}
                disabled={isSpinning || recipes.length === 0}
                className="px-10 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full text-lg
                         hover:from-red-400 hover:to-red-500 transition-all shadow-xl shadow-red-500/30 
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
              >
                {isSpinning ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    {language === "ko" ? "돌리는 중..." : "Spinning..."}
                  </>
                ) : (
                  <>
                    <span className="text-2xl">✓</span>
                    {language === "ko" ? "선택완료" : "Confirm"}
                  </>
                )}
              </button>

              {selectedRecipe && !isSpinning && (
                <div className="mt-6 p-4 bg-green-100 rounded-xl border border-green-300">
                  <p className="text-green-800 font-bold text-xl">
                    🎊 {selectedRecipe.strMeal}
                  </p>
                  <p className="text-green-600 text-sm mt-1">
                    {language === "ko"
                      ? "레시피를 확인하세요!"
                      : "Check the recipe!"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RouletteModal;
