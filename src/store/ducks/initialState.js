const INITIAL_STATE = {
  auth: {
    user: {
      email: '',
    },
  },
  recipes: {
    mealsToken: 1,
    cocktailsToken: 1,
    doneRecipes: [],
    favoriteRecipes: [],
    inProgressRecipes: {},
    detailsRecipe: {
      id: 0,
    },
    isFetching: false,
    data: [],
    recomendations: [],
    error: '',
    categories: [],
    areas: [],
    ingredients: [],
    filter: {
      type: '', // name, category, ingredient, firstLetter, area, random
      term: '', // term of search or filter
    },
  },
};

export default INITIAL_STATE;
