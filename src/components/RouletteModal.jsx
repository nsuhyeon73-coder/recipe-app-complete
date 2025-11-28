import { useState, useEffect } from "react";

function RouletteModal({ onClose, onSelectRecipe, language }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  // 룰렛 섹션 정의 (12시부터 시계방향)
  const cuisines = [
    {
      name: language === "ko" ? "한식" : "Korean",
      color: "#FFB6C1",
      area: "Korean",
    },
    {
      name: language === "ko" ? "양식" : "Western",
      color: "#FFE66D",
      area: "American",
    },
    {
      name: language === "ko" ? "중식" : "Chinese",
      color: "#87CEEB",
      area: "Chinese",
    },
    {
      name: language === "ko" ? "일식" : "Japanese",
      color: "#98D8C8",
      area: "Japanese",
    },
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const fetchRandomRecipe = async (area) => {
    setLoading(true);
    console.log("========================================");
    console.log("🔍 검색할 지역:", area);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      const data = await response.json();
      console.log("📦 받은 레시피 개수:", data.meals ? data.meals.length : 0);

      if (data.meals && data.meals.length > 0) {
        const randomMeal =
          data.meals[Math.floor(Math.random() * data.meals.length)];
        console.log("✅ 선택된 레시피 ID:", randomMeal.idMeal);

        const detailResponse = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`
        );
        const detailData = await detailResponse.json();

        if (detailData.meals) {
          const recipe = detailData.meals[0];
          console.log("📝 레시피 이름:", recipe.strMeal);
          console.log("🌍 레시피 지역:", recipe.strArea);
          console.log("========================================");

          setSelectedRecipe(recipe);
          setLoading(false);

          setTimeout(() => {
            onSelectRecipe(recipe.idMeal);
            onClose();
          }, 2500);
        }
      } else {
        console.log("❌ 해당 지역 레시피 없음, 랜덤으로 대체");
        const fallbackResponse = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        const fallbackData = await fallbackResponse.json();

        if (fallbackData.meals) {
          setSelectedRecipe(fallbackData.meals[0]);
          setLoading(false);

          setTimeout(() => {
            onSelectRecipe(fallbackData.meals[0].idMeal);
            onClose();
          }, 2500);
        }
      }
    } catch (error) {
      console.error("❌ 에러:", error);
      setLoading(false);
    }
  };

  const spinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    // 5-8바퀴 랜덤 회전
    const minSpins = 5;
    const maxSpins = 8;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);

    // 0-3 중 하나 선택 (4개 섹션)
    const targetIndex = Math.floor(Math.random() * 4);

    // 각 섹션의 중앙 각도
    // 인덱스 0(한식): 45도
    // 인덱스 1(양식): 135도
    // 인덱스 2(중식): 225도
    // 인덱스 3(일식): 315도
    const targetAngle = 45 + targetIndex * 90;

    // 화살표가 12시 방향에 고정되어 있으므로
    // 룰렛을 회전시켜서 선택된 섹션이 12시에 오도록
    // 12시 = 0도이므로, targetAngle만큼 더 회전해야 함
    const finalRotation = spins * 360 + (360 - targetAngle);

    console.log("========================================");
    console.log("🎲 목표 인덱스:", targetIndex);
    console.log("🎯 목표 각도:", targetAngle);
    console.log("🔄 총 회전 각도:", finalRotation);
    console.log("🍽️ 선택될 요리:", cuisines[targetIndex].name);
    console.log("🌍 검색할 지역:", cuisines[targetIndex].area);

    setRotation(finalRotation);

    setTimeout(() => {
      const selected = cuisines[targetIndex];
      console.log("✨ 최종 선택:", selected.name, `(${selected.area})`);

      setSelectedCuisine(selected);
      setIsSpinning(false);

      // 선택된 요리의 레시피 가져오기
      setTimeout(() => {
        fetchRandomRecipe(selected.area);
      }, 500);
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

          {/* 레시피 선택 전 */}
          {!selectedRecipe && (
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

              {/* Roulette Wheel */}
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
                      // 각 섹션: 90도씩
                      // index 0: 0-90도 (12시-3시) = 한식
                      // index 1: 90-180도 (3시-6시) = 양식
                      // index 2: 180-270도 (6시-9시) = 중식
                      // index 3: 270-360도 (9시-12시) = 일식
                      const startAngle = (index * 90 - 90) * (Math.PI / 180);
                      const endAngle =
                        ((index + 1) * 90 - 90) * (Math.PI / 180);

                      const x1 = 50 + 50 * Math.cos(startAngle);
                      const y1 = 50 + 50 * Math.sin(startAngle);
                      const x2 = 50 + 50 * Math.cos(endAngle);
                      const y2 = 50 + 50 * Math.sin(endAngle);

                      const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                      // 텍스트 위치 (섹션 중앙)
                      const textAngle =
                        (index * 90 + 45 - 90) * (Math.PI / 180);
                      const textX = 50 + 30 * Math.cos(textAngle);
                      const textY = 50 + 30 * Math.sin(textAngle);

                      return (
                        <g key={index}>
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
                              index * 90 + 45
                            }, ${textX}, ${textY})`}
                          >
                            {cuisine.name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Arrow - Fixed at top (12시 방향) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 pointer-events-none">
                  <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[40px] border-t-red-600 drop-shadow-lg"></div>
                </div>

                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-800 z-10"></div>
              </div>

              {/* Spin Button */}
              <button
                onClick={spinRoulette}
                disabled={isSpinning || loading}
                className="px-10 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full text-lg
                         hover:from-red-400 hover:to-red-500 transition-all shadow-xl shadow-red-500/30 
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
              >
                {isSpinning || loading ? (
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

              {selectedCuisine && !isSpinning && !loading && (
                <div className="mt-6 p-4 bg-green-100 rounded-xl border border-green-300">
                  <p className="text-green-800 font-bold text-xl">
                    🎉 {selectedCuisine.name}{" "}
                    {language === "ko" ? "선택!" : "Selected!"}
                  </p>
                  <p className="text-green-600 text-sm mt-1">
                    API: {selectedCuisine.area}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 레시피 로딩 중 */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-20 h-20 border-8 border-gold-200 border-t-gold-600 rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {language === "ko" ? "레시피 추천 중..." : "Finding Recipe..."}
              </h3>
              <p className="text-gray-600">
                {language === "ko"
                  ? `${selectedCuisine?.name} 중에서 맛있는 레시피를 찾고 있어요!`
                  : `Finding delicious ${selectedCuisine?.name} recipe!`}
              </p>
            </div>
          )}

          {/* 레시피 선택됨 */}
          {selectedRecipe && !loading && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {language === "ko"
                  ? "🎊 오늘의 추천 메뉴!"
                  : "🎊 Today's Recommendation!"}
              </h2>

              {/* Recipe Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6">
                <img
                  src={selectedRecipe.strMealThumb}
                  alt={selectedRecipe.strMeal}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-block px-4 py-2 rounded-full bg-gold-500 text-white font-bold mb-3">
                    {selectedCuisine?.name} • {selectedRecipe.strArea}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {selectedRecipe.strMeal}
                  </h3>
                  <p className="text-white/80">{selectedRecipe.strCategory}</p>
                </div>
              </div>

              <div className="p-4 bg-green-100 rounded-xl border border-green-300">
                <p className="text-green-800 font-bold text-lg">
                  {language === "ko"
                    ? "잠시 후 레시피 상세 정보를 보여드릴게요!"
                    : "Recipe details coming up!"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RouletteModal;
