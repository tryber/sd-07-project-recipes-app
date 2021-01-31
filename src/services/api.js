const URLFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URLDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const URLCatFood = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const URLCatDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const fetchAPIFoodsIngredient = async (filter) => {
  try {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter}`);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

const fetchAPIFoodsName = async (filter) => {
  try {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${filter}`);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

const fetchAPIFoodsLetterFirst = async (filter) => {
  try {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${filter}`);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

const fetchAPIDrinksIngredient = async (filter) => {
  try {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter}`);
    const { drinks } = await request.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

const fetchAPIDrinksName = async (filter) => {
  try {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filter}`);
    const { drinks } = await request.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

const fetchAPIDrinksLetterFirst = async (filter) => {
  try {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filter}`);
    const { drinks } = await request.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAPIFoodsFilters = async (name, radioFilter) => {
  let responseFiltered;

  if (radioFilter === 'ingredient') {
    responseFiltered = await fetchAPIFoodsIngredient(name);
    return responseFiltered;
  }
  if (radioFilter === 'name') {
    responseFiltered = await fetchAPIFoodsName(name);
    return responseFiltered;
  }
  if (radioFilter === 'firstLetter') {
    responseFiltered = await fetchAPIFoodsLetterFirst(name);
    return responseFiltered;
  }
};

export const fetchAPIDrinksFilters = async (name, radioFilter) => {
  let responseFiltered;

  if (radioFilter === 'ingredient') {
    responseFiltered = await fetchAPIDrinksIngredient(name);
    return responseFiltered;
  }
  if (radioFilter === 'name') {
    responseFiltered = await fetchAPIDrinksName(name);
    return responseFiltered;
  }
  if (radioFilter === 'firstLetter') {
    responseFiltered = await fetchAPIDrinksLetterFirst(name);
    return responseFiltered;
  }
};

export const fetchAPIFood = async () => {
  try {
    const response = await fetch(URLFood);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAPIDrinks = async () => {
  try {
    const response = await fetch(URLDrinks);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAPICategoriesFood = async () => {
  try {
    const response = await fetch(URLCatFood);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAPICategoriesDrinks = async () => {
  try {
    const response = await fetch(URLCatDrinks);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAPIDrinksRecommendations = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAPIFoodsRecommendations = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAPIFoodsSurprise = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAPIDrinksSurprise = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};
