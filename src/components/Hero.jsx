import { useEffect, useState } from "react";

function Hero({ onRandomClick, language }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClick = () => {
    console.log("버튼 클릭됨!");
    if (onRandomClick) {
      console.log("함수 호출");
      onRandomClick();
    } else {
      console.error("함수가 없습니다!");
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-50 via-white to-wine-50 animate-gradient"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZGJhNzQiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTEyIDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0wIDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] animate-slide"></div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-wine-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-3s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-gold-500/5 to-wine-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div
          className={`mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-gold-600 text-sm font-medium">
            {language === "ko"
              ? "전 세계 맛있는 레시피를 만나보세요"
              : "Discover Delicious Recipes from Around the World"}
          </span>
        </div>

        <h1
          className={`hero-title font-bold leading-tight mb-6 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
          }}
        >
          <span className="text-gray-900">
            {language === "ko" ? "오늘 뭐 먹지?" : "What to Cook Today?"}
          </span>
          <br />
          <span className="gradient-text font-display">Recipe Cook</span>
        </h1>

        <p
          className={`text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {language === "ko" ? (
            <>
              랜덤 레시피로 새로운 요리에 도전하거나,
              <br className="hidden sm:block" />
              원하는 재료로 완벽한 레시피를 찾아보세요!
            </>
          ) : (
            <>
              Challenge yourself with random recipes or
              <br className="hidden sm:block" />
              find the perfect recipe with your ingredients!
            </>
          )}
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <button
            onClick={handleClick}
            type="button"
            className="group px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold rounded-full text-lg hover:from-gold-400 hover:to-gold-500 transition-all shadow-xl shadow-gold-500/30 btn-shine flex items-center justify-center gap-2 cursor-pointer"
          >
            {language === "ko" ? "랜덤 레시피 추천받기" : "Get Random Recipe"}
            <span className="inline-block group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-12 max-w-xl mx-auto">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold gradient-text mb-1">
              300+
            </div>
            <div className="text-xs text-gray-600">
              {language === "ko" ? "레시피" : "Recipes"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold gradient-text mb-1">
              50+
            </div>
            <div className="text-xs text-gray-600">
              {language === "ko" ? "카테고리" : "Categories"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold gradient-text mb-1">
              150+
            </div>
            <div className="text-xs text-gray-600">
              {language === "ko" ? "국가별 요리" : "Countries"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
