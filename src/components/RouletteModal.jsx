import { useState, useEffect } from "react";

function RouletteModal({ onClose, onSelectRecipe, language }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const cuisines = [
    {
      id: "korean",
      name: language === "ko" ? "한식" : "Korean",
      color: "#FFB6C1",
      area: "Korean", // TheMealDB API area 값
    },
    {
      id: "western",
      name: language === "ko" ? "양식" : "Western",
      color: "#FFE66D",
      area: "American", // 양식 = American
    },
    {
      id: "chinese",
      name: language === "ko" ? "중식" : "Chinese",
      color: "#87CEEB",
      area: "Chinese", // 중식 = Chinese
    },
    {
      id: "japanese",
      name: language === "ko" ? "일식" : "Japanese",
      color: "#98D8C8",
      area: "Japanese", // 일식 = Japanese
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
    console.log("Fetching recipe for area:", area); // 디버깅용

    try {
      // 해당 지역의 레시피 가져오기
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      const data = await response.json();
      console.log("API Response:", data); // 디버깅용

      if (data.meals && data.meals.length > 0) {
        // 랜덤하게 하나 선택
        const randomMeal =
          data.meals[Math.floor(Math.random() * data.meals.length)];
        console.log("Selected meal:", randomMeal); // 디버깅용

        // 상세 정보 가져오기
        const detailResponse = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`
        );
        const detailData = await detailResponse.json();

        if (detailData.meals) {
          setSelectedRecipe(detailData.meals[0]);
          setLoading(false);

          // 2초 후 레시피 상세 모달 열기
          setTimeout(() => {
            onSelectRecipe(detailData.meals[0].idMeal);
            onClose();
          }, 2500);
        }
      } else {
        console.log("No meals found for area:", area); // 디버깅용
        // 해당 지역에 레시피가 없으면 랜덤 레시피
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
      console.error("Error fetching recipe:", error);
      setLoading(false);
    }
  };

  const spinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const spins = 5 + Math.random() * 3; // 5-8바퀴
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = rotation + spins * 360 + extraDegrees;

    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const adjustedRotation = (normalizedRotation + 45) % 360; // 45도 조정
      const selectedIndex = Math.floor(adjustedRotation / 90);
      const selected = cuisines[selectedIndex % cuisines.length];

      console.log("Selected cuisine:", selected); // 디버깅용
      setSelectedCuisine(selected);
      setIsSpinning(false);

      // 선택된 요리 종류의 랜덤 레시피 가져오기
      fetchRandomRecipe(selected.area); // area 사용
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

                {/* Arrow - Fixed at top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 pointer-events-none">
                  <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[40px] border-t-gray-800 drop-shadow-lg"></div>
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
                    {selectedCuisine?.name}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {selectedRecipe.strMeal}
                  </h3>
                  <p className="text-white/80">
                    {selectedRecipe.strCategory} • {selectedRecipe.strArea}
                  </p>
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
