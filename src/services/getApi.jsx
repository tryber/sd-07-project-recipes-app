export const fetchApi = async (endpoint) => {
  let data = null;
  try {
    const response = await fetch(endpoint);
    data = await response.json();
  } catch (err) {
    console.error(err);
    console.warn(err);
  }
  return data;
};

export const allFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const allDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const getIngredientsFood = (inputText) => (
  `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`
);

export const getNameFood = (inputText) => (
  `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`
);

export const getLetterFood = (inputText) => (
  `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`
);

export const getFoodRecipeId = (id) => (
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
);

export const getIngredientsDrink = (inputText) => (
  `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputText}`
);

export const getNameDrink = (inputText) => (
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`
);

export const getLetterDrink = (inputText) => (
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputText}`
);

export const getDrinkRecipeId = (id) => (
  `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
);

const handleSucessAPIResponse = (recipesData, dispatchRecipes, type) => {
  if (recipesData && recipesData[type] !== null) {
    const recipesResults = recipesData;
    dispatchRecipes(recipesResults);
  }
};

const handleNullAPIResponse = (recipesData, _dispatchRecipes, type) => {
  if (recipesData === null || recipesData[type] === null) {
    const message = 'Não encontramos receita com o pesquisado';
    return message;
  }
};

export const handleAPIResponse = (recipesData, dispatchRecipes, { type }) => {
  handleNullAPIResponse(recipesData, dispatchRecipes, type);
  handleSucessAPIResponse(recipesData, dispatchRecipes, type);
};
