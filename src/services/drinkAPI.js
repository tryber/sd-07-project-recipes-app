export const getCurrenceRecipesDrinksIngredients = (filter) => {
  const ingredients = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter}`;
  return fetch(ingredients)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ));
};

export const getCurrenceRecipesDrinksName = (filter) => {
  const name = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filter}`;
  return fetch(name)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ));
};

export const getCurrenceRecipesDrinksFirstLetter = (filter) => {
  const firstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filter}`;
  return fetch(firstLetter)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ));
};

export const getCategoryDrinks = () => {
  const categoryEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
  return fetch(categoryEndPoint).then((response) =>
    response
      .json()
      .then((json) =>
        response.ok ? Promise.resolve(json) : Promise.reject(json),
      ),
  );
};

export const getRecipesDrinksByCategory = (filter) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
  return fetch(endpoint).then((response) =>
    response
      .json()
      .then((json) =>
        response.ok ? Promise.resolve(json) : Promise.reject(json),
      ),
  );
};