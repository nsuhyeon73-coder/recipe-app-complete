import { useState } from "react";

function Header({
  scrolled,
  onCategoryClick,
  activeCategory,
  language,
  onLanguageChange,
  onLogoClick,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { id: "Beef", label: language === "ko" ? "소고기" : "Beef", emoji: "🥩" },
    {
      id: "Chicken",
      label: language === "ko" ? "치킨" : "Chicken",
      emoji: "🍗",
    },
    {
      id: "Seafood",
      label: language === "ko" ? "해산물" : "Seafood",
      emoji: "🦐",
    },
    { id: "Pasta", label: language === "ko" ? "파스타" : "Pasta", emoji: "🍝" },
    {
      id: "Dessert",
      label: language === "ko" ? "디저트" : "Dessert",
      emoji: "🍰",
    },
    {
      id: "Vegetarian",
      label: language === "ko" ? "채식" : "Vegetarian",
      emoji: "🥗",
    },
    {
      id: "Breakfast",
      label: language === "ko" ? "아침" : "Breakfast",
      emoji: "🍳",
    },
    { id: "Pork", label: language === "ko" ? "돼지고기" : "Pork", emoji: "🥓" },
    { id: "Lamb", label: language === "ko" ? "양고기" : "Lamb", emoji: "🍖" },
    { id: "Goat", label: language === "ko" ? "염소고기" : "Goat", emoji: "🐐" },
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onLogoClick) {
      onLogoClick();
    } else {
      window.location.reload();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-gold-700/20"
          : "bg-white/50 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            onClick={handleLogoClick}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-wine-600 flex items-center justify-center text-2xl">
                🍳
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 to-wine-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text font-display">
                Recipe Cook
              </h1>
              <p className="text-xs text-gold-600/80 tracking-wider">
                DELICIOUS RECIPES
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.slice(0, 6).map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
                          ${
                            activeCategory === category.id
                              ? "bg-gold-500/20 text-gold-600 border border-gold-500/30"
                              : "text-gray-700 hover:text-gold-600 hover:bg-gray-100"
                          }`}
              >
                <span className="mr-1">{category.emoji}</span>
                {category.label}
              </button>
            ))}

            {/* Language Toggle Button */}
            <button
              onClick={() => onLanguageChange(language === "ko" ? "en" : "ko")}
              className="ml-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
                       bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-400 hover:to-gold-500
                       flex items-center gap-2"
            >
              <span className="text-base">
                {language === "ko" ? "🇰🇷" : "🇺🇸"}
              </span>
              {language === "ko" ? "EN" : "KO"}
            </button>
          </nav>

          {/* Mobile Menu Button & Language Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onLanguageChange(language === "ko" ? "en" : "ko")}
              className="px-3 py-2 text-sm font-medium rounded-full transition-all duration-300
                       bg-gradient-to-r from-gold-500 to-gold-600 text-white
                       flex items-center gap-1"
            >
              <span>{language === "ko" ? "🇰🇷" : "🇺🇸"}</span>
              {language === "ko" ? "EN" : "KO"}
            </button>

            <button
              className="text-gray-700 hover:text-gold-600 transition-colors p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[500px] pb-6" : "max-h-0"
          }`}
        >
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gold-700/20">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryClick(category.id);
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-3 text-left rounded-xl transition-all font-medium flex items-center gap-2
                          ${
                            activeCategory === category.id
                              ? "bg-gold-500/20 text-gold-600 border border-gold-500/30"
                              : "text-gray-700 hover:text-gold-600 hover:bg-gray-100 border border-transparent"
                          }`}
              >
                <span className="text-xl">{category.emoji}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
