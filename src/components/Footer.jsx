function Footer({ language }) {
  const categories = [
    { name: language === "ko" ? "소고기" : "Beef", id: "Beef" },
    { name: language === "ko" ? "치킨" : "Chicken", id: "Chicken" },
    { name: language === "ko" ? "해산물" : "Seafood", id: "Seafood" },
    { name: language === "ko" ? "파스타" : "Pasta", id: "Pasta" },
    { name: language === "ko" ? "디저트" : "Dessert", id: "Dessert" },
  ];

  const links = [
    { name: language === "ko" ? "홈" : "Home", href: "#" },
    { name: language === "ko" ? "레시피" : "Recipes", href: "#recipes" },
    {
      name: language === "ko" ? "API 정보" : "API Info",
      href: "https://www.themealdb.com/",
    },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-wine-600 flex items-center justify-center text-2xl">
                🍳
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text font-display">
                  Recipe Cook
                </h3>
                <p className="text-xs text-gold-600/80 tracking-wider">
                  DELICIOUS RECIPES
                </p>
              </div>
            </a>
            <p className="text-gray-600 text-sm leading-relaxed">
              {language === "ko"
                ? "전 세계의 맛있는 레시피를 한 곳에서! 새로운 요리에 도전해보세요 오늘의 요리사는 여러분 입니다!"
                : "Delicious recipes from around the world in one place! Try new dishes today."}
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">
              {language === "ko" ? "인기 카테고리" : "Popular Categories"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href="#recipes"
                  className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm
                           hover:bg-gold-500/20 hover:text-gold-600 transition-all
                           border border-gray-200 hover:border-gold-500/30"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">
              {language === "ko" ? "링크" : "Links"}
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-gray-600 hover:text-gold-600 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2025 Recipe Cook.{" "}
            {language === "ko" ? "모든 레시피 출처:" : "All recipes from"}{" "}
            <a
              href="https://www.themealdb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-600 hover:underline"
            >
              TheMealDB
            </a>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">
              {language === "ko" ? "제작:" : "Made with"}
            </span>
            <span className="text-gray-500 text-sm">Su Hyun Noh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
