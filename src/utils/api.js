// API 기본 설정
const API_CONFIG = {
  BASE_URL: "https://www.themealdb.com/api/json/v1/1",
  API_KEY: "1", // 무료 테스트 키
  ENDPOINTS: {
    RANDOM: "/random.php",
    SEARCH: "/search.php",
    LOOKUP: "/lookup.php",
    FILTER_BY_CATEGORY: "/filter.php",
    FILTER_BY_AREA: "/filter.php",
    FILTER_BY_INGREDIENT: "/filter.php",
    LIST_CATEGORIES: "/list.php?c=list",
    LIST_AREAS: "/list.php?a=list",
    LIST_INGREDIENTS: "/list.php?i=list",
  },
};

// API 호출 헬퍼 함수
const apiRequest = async (endpoint, params = {}) => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);

  // 파라미터 추가
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

// API 메서드들
export const recipeAPI = {
  // 랜덤 레시피 가져오기
  getRandom: async () => {
    const data = await apiRequest(API_CONFIG.ENDPOINTS.RANDOM);
    return data.meals ? data.meals[0] : null;
  },

  // 여러 개의 랜덤 레시피 가져오기
  getMultipleRandom: async (count = 12) => {
    const promises = Array.from({ length: count }, () => recipeAPI.getRandom());
    const results = await Promise.all(promises);
    return results.filter((meal) => meal !== null);
  },

  // 레시피 검색
  search: async (query) => {
    const data = await apiRequest(API_CONFIG.ENDPOINTS.SEARCH, { s: query });
    return data.meals || [];
  },

  // ID로 레시피 상세 정보 가져오기
  getById: async (id) => {
    const data = await apiRequest(API_CONFIG.ENDPOINTS.LOOKUP, { i: id });
    return data.meals ? data.meals[0] : null;
  },

  // 카테고리별 레시피 필터링
  filterByCategory: async (category) => {
    const data = await apiRequest(API_CONFIG.ENDPOINTS.FILTER_BY_CATEGORY, {
      c: category,
    });
    return data.meals || [];
  },

  // 지역별 레시피 필터링
  filterByArea: async (area) => {
    const data = await apiRequest(API_CONFIG.ENDPOINTS.FILTER_BY_AREA, {
      a: area,
    });
    return data.meals || [];
  },

  // 재료별 레시피 필터링
  filterByIngredient: async (ingredient) => {
    const data = await apiRequest(API_CONFIG.ENDPOINTS.FILTER_BY_INGREDIENT, {
      i: ingredient,
    });
    return data.meals || [];
  },

  // 모든 카테고리 목록
  getCategories: async () => {
    const data = await apiRequest(API_CONFIG.ENDPOINTS.LIST_CATEGORIES);
    return data.meals || [];
  },

  // 모든 지역 목록
  getAreas: async () => {
    const data = await apiRequest(API_CONFIG.ENDPOINTS.LIST_AREAS);
    return data.meals || [];
  },

  // 모든 재료 목록
  getIngredients: async () => {
    const data = await apiRequest(API_CONFIG.ENDPOINTS.LIST_INGREDIENTS);
    return data.meals || [];
  },

  // 카테고리별 레시피 상세 정보 가져오기 (여러 개)
  getCategoryRecipesWithDetails: async (category, limit = 12) => {
    const recipes = await recipeAPI.filterByCategory(category);
    const limitedRecipes = recipes.slice(0, limit);

    const detailPromises = limitedRecipes.map((recipe) =>
      recipeAPI.getById(recipe.idMeal)
    );

    const detailedRecipes = await Promise.all(detailPromises);
    return detailedRecipes.filter((recipe) => recipe !== null);
  },
};

// API 설정 내보내기
export { API_CONFIG };

export default recipeAPI;
