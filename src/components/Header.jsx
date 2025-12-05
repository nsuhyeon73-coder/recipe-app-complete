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
    { id: "Beef", label: language === "ko" ? "소고기" : "Beef" },
    { id: "Chicken", label: language === "ko" ? "치킨" : "Chicken" },
    { id: "Seafood", label: language === "ko" ? "해산물" : "Seafood" },
    { id: "Pasta", label: language === "ko" ? "파스타" : "Pasta" },
    { id: "Dessert", label: language === "ko" ? "디저트" : "Dessert" },
    { id: "Vegetarian", label: language === "ko" ? "채식" : "Vegetarian" },
    { id: "Breakfast", label: language === "ko" ? "아침" : "Breakfast" },
    { id: "Pork", label: language === "ko" ? "돼지고기" : "Pork" },
    { id: "Lamb", label: language === "ko" ? "양고기" : "Lamb" },
    { id: "Goat", label: language === "ko" ? "염소고기" : "Goat" },
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
            className="flex items-center group"
            onClick={handleLogoClick}
          >
            <div
              className="text-base font-bold gradient-text"
              style={{ textTransform: "none" }}
            >
              Recipe Cook
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.slice(0, 6).map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative
                          ${
                            activeCategory === category.id
                              ? "text-gold-600"
                              : "text-gray-700 hover:text-gold-600"
                          }`}
              >
                {category.label}
                {activeCategory === category.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-600"></div>
                )}
              </button>
            ))}

            {/* Language Toggle Button */}
            <button
              onClick={() => onLanguageChange(language === "ko" ? "en" : "ko")}
              className="ml-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
                       bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-400 hover:to-gold-500"
            >
              {language === "ko" ? "EN" : "KO"}
            </button>
          </nav>

          {/* Mobile Menu Button & Language Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onLanguageChange(language === "ko" ? "en" : "ko")}
              className="px-3 py-2 text-sm font-medium rounded-full transition-all duration-300
                       bg-gradient-to-r from-gold-500 to-gold-600 text-white"
            >
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
                className={`px-4 py-3 text-left rounded-xl transition-all font-medium relative
                          ${
                            activeCategory === category.id
                              ? "text-gold-600"
                              : "text-gray-700 hover:text-gold-600"
                          }`}
              >
                {category.label}
                {activeCategory === category.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
