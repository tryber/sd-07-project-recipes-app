async function RequestIngredientsFood() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const data = await fetch(endpoint).then((response) => response.json());
  const { meals } = data;
  return meals;
}

export default RequestIngredientsFood;
