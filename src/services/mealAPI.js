export const randomMeal = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};

export const getMealById = (id) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};

export const getMealsRecommendations = () => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json.meals);
};
