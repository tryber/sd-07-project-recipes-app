export const randomCocktail = () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};

export const getCocktailById = (id) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};

export const getCocktailsRecommendations = () => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json.drinks);
};
