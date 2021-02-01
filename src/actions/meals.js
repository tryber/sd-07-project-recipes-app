import {
  getMealsByFirstLetter,
  getMealsByIngredient,
  getMealsByName,
  getRandomMeals,
  getMealsByCategory,
  getMealsCategories,
} from '../services/mealsAPI';

export const REQUEST_MEALS = 'REQUEST_MEALS';
export const REQUEST_MEALS_SUCCESS = 'REQUEST_MEALS_SUCCESS';
export const REQUEST_MEALS_FAILURE = 'REQUEST_MEALS_FAILURE ';

export const REQUEST_MEALS_CATEGORIES = 'REQUEST_MEALS_CATEGORIES';
export const REQUEST_MEALS_CATEGORIES_SUCCESS = 'REQUEST_MEALS_CATEGORIES_SUCCESS';
export const REQUEST_MEALS_CATEGORIES_FAILURE = 'REQUEST_MEALS_CATEGORIES_FAILURE ';

const requestMeals = () => ({ type: REQUEST_MEALS });

const setMealsSuccess = (meals) => (
  { type: REQUEST_MEALS_SUCCESS, meals });

const setMealsFailure = (error) => ({ type: REQUEST_MEALS_FAILURE, error });

const requestMealsCategories = () => ({ type: REQUEST_MEALS_CATEGORIES });

const setMealsCategoriesSuccess = (mealsCategories) => (
  { type: REQUEST_MEALS_CATEGORIES_SUCCESS, mealsCategories });

const setMealsCategoriesFailure = (error) => ({ type: REQUEST_MEALS_CATEGORIES_FAILURE, error });

export const fetchMealsByIngredient = (i) => (dispatch) => {
  dispatch(requestMeals());
  return getMealsByIngredient(i)
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};

export const fetchMealsByName = (name) => (dispatch) => {
  dispatch(requestMeals());
  return getMealsByName(name)
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};

export const fetchMealsByFirstLetter = (firstLetter) => (dispatch) => {
  dispatch(requestMeals());
  return getMealsByFirstLetter(firstLetter)
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};

export const fetchRandomMeals = () => (dispatch) => {
  dispatch(requestMeals());
  return getRandomMeals()
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};

export const fetchMealsByCategory = (category) => (dispatch) => {
  dispatch(requestMeals());
  return getMealsByCategory(category)
    .then((response) => dispatch(setMealsSuccess(response)))
    .catch((error) => dispatch(setMealsFailure(error)));
};

export const fetchMealsCategories = () => (dispatch) => {
  dispatch(requestMealsCategories());
  return getMealsCategories()
    .then((response) => dispatch(setMealsCategoriesSuccess(response)))
    .catch((error) => dispatch(setMealsCategoriesFailure(error)));
};
