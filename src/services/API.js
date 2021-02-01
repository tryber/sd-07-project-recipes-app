const getCategories = async () => {
  const categories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((data) => data.json());
  return categories;
};

const searchByIngredient = async (ingredient) => {
  console.log('searchByingredinet');
  console.log(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const path = window.location.pathname;
  let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  if (path === '/bebidas') url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

  console.log('rodando searchByIngredient');
  const data = await fetch(`${url}${ingredient}`)
    .then((dataJson) => dataJson.json())
    .catch((err) => console.log(err));
  return data;
};

const mealRecomendations = async () => {
  console.log('rodando mealRecomendations');
  const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((dataJson) => dataJson.json())
    .catch((err) => console.log(err));
  return data;
};

const mealById = async (ID) => {
  console.log('rodando mealById');
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`)
    .then((dataJson) => dataJson.json())
    .catch((err) => console.log(err));
  return data;
};

const drinkById = async (ID) => {
  console.log('rodando drinkById');
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID}`)
    .then((dataJson) => dataJson.json())
    .catch((err) => console.log(err));
  return data;
};

const drinkRecomendations = async () => {
  console.log('rodando drinkRecomendations');
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((dataJson) => dataJson.json())
    .catch((err) => console.log(err));
  return data;
};

const searchByName = async (name) => {
  const path = window.location.pathname;
  let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  if (path === '/bebidas') url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  console.log('rodando searchByName');
  const data = await fetch(`${url}${name}`)
    .then((dataJson) => dataJson.json());
  return data;
};

const searchByFirstLetter = async (letter) => {
  const path = window.location.pathname;
  let url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
  if (path === '/bebidas') url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

  console.log('rodando searchByFirstLetter');
  if (letter.length > 1) {
    alert('Sua busca deve conter somente 1 (um) caracter');
    return { meals: null };
  }
  const data = await fetch(`${url}${letter}`)
    .then((dataJson) => dataJson.json());
  return data;
};

const searchGeneral = async ({ text, option }) => {
  let data = { meals: null };
  if (option === 'primeira letra') data = await searchByFirstLetter(text);
  if (option === 'ingrediente') data = await searchByIngredient(text);
  if (option === 'nome') data = await searchByName(text);

  const path = window.location.pathname;
  const alertMessage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  if (path === '/comidas' && !data.meals) alert(alertMessage);
  console.log(data);
  if (path === '/bebidas' && !data) {
    alert(alertMessage);
    return { drinks: null };
  }
  if (path === '/bebidas' && !data.drinks) {
    alert(alertMessage);
  }
  return data;
};

const getMeals = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  let response = {};
  try {
    response = await fetch(endPoint);
    return response.json();
  } catch (error) {
    return error.response;
  }
};

const getDrinks = async () => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  let response = {};
  try {
    response = await fetch(endPoint);
    return response.json();
  } catch (error) {
    return error.response;
  }
};

const getMealsCategories = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  let response = {};
  try {
    response = await fetch(endPoint);
    return response.json();
  } catch (error) {
    return error.response;
  }
};

const getDrinksCategories = async () => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  let response = {};
  try {
    response = await fetch(endPoint);
    return response.json();
  } catch (error) {
    return error.response;
  }
};

const getMealsByCategories = async (category) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  let response = {};
  try {
    response = await fetch(endPoint);
    return response.json();
  } catch (error) {
    return error.response;
  }
};

const getDrinksByCategories = async (category) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  let response = {};
  try {
    response = await fetch(endPoint);
    return response.json();
  } catch (error) {
    return error.response;
  }
};

export {
  getCategories,
  searchGeneral,
  getMeals,
  getDrinks,
  getMealsCategories,
  getDrinksCategories,
  getMealsByCategories,
  getDrinksByCategories,
  mealById,
  mealRecomendations,
  drinkById,
  drinkRecomendations,
};
