import { translateRecipeName } from "../utils/recipeTranslations.js";

function RecipeCard({ recipe, onClick, index, language }) {
  return (
    <div
      onClick={onClick}
      className="recipe-card group relative rounded-2xl overflow-hidden bg-white
                border border-gray-200 hover:border-gold-500/50 cursor-pointer card-hover
                shadow-sm hover:shadow-xl animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-card-img w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-colors duration-300"></div>

        {/* View Icon */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm 
                      flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-all duration-300 
                      transform scale-75 group-hover:scale-100"
        ></div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gold-600 transition-colors"
          style={{ fontSize: "14px" }}
        >
          {translateRecipeName(recipe.strMeal, language)}
        </h3>

        <div className="flex items-center justify-between">
          {/* Tags */}
          {recipe.strTags ? (
            <div className="flex flex-wrap gap-1">
              {recipe.strTags
                .split(",")
                .slice(0, 2)
                .map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-full bg-wine-500/20 text-wine-600 text-xs"
                  >
                    #{tag.trim()}
                  </span>
                ))}
            </div>
          ) : (
            <span className="text-sm text-gray-500">{recipe.strCategory}</span>
          )}

          {/* View Button */}
          <span className="text-gold-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            {language === "ko" ? "보기" : "View"} →
          </span>
        </div>
      </div>

      {/* Bottom Border Glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/0 to-transparent
                    group-hover:via-gold-500 transition-all duration-500"
      ></div>
    </div>
  );
}

export default RecipeCard;
