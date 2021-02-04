import {
  REQUEST_MEALS,
  REQUEST_MEALS_SUCCESS,
  REQUEST_MEALS_FAILURE,
  REQUEST_MEALS_CATEGORIES,
  REQUEST_MEALS_CATEGORIES_SUCCESS,
  REQUEST_MEALS_CATEGORIES_FAILURE,
  REQUEST_MEALS_INGREDIENTS,
  REQUEST_MEALS_INGREDIENTS_SUCCESS,
  REQUEST_MEALS_INGREDIENTS_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  meals: [],
  mealsCategories: [],
  ingredients: [],
  isFetchingMeals: false,
  isFetchingCategories: false,
  isFetchingIngredients: false,
  error: '',
};

export default function meals(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_MEALS:
    return { ...state, isFetchingMeals: true };
  case REQUEST_MEALS_SUCCESS:
    return { ...state, isFetchingMeals: false, meals: [...action.meals.meals] };
  case REQUEST_MEALS_FAILURE:
    return { ...state, isFetchingMeals: false, error: action.error };
  case REQUEST_MEALS_CATEGORIES:
    return { ...state, isFetchingCategories: true };
  case REQUEST_MEALS_CATEGORIES_SUCCESS:
    return {
      ...state,
      isFetchingCategories: false,
      mealsCategories: [...action.categories.meals],
    };
  case REQUEST_MEALS_CATEGORIES_FAILURE:
    return { ...state, isFetchingCategories: false, error: action.error };
  case REQUEST_MEALS_INGREDIENTS:
    return { ...state, isFetchingIngredients: true };
  case REQUEST_MEALS_INGREDIENTS_SUCCESS:
    return {
      ...state,
      isFetchingIngredients: false,
      ingredients: [...action.ingredients.ingredients],
    };
  case REQUEST_MEALS_INGREDIENTS_FAILURE:
    return { ...state, isFetchingIngredients: false, error: action.error };
  default:
    return state;
  }
}
