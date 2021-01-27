const URL = 'https://www.themealdb.com/api/json/v1/1/';

const ENDPOINT = {
  searchName: 'search.php?s=',
  ingredient: 'filter.php?i=',
  name: 'search.php?s=',
  firstLetter: 'search.php?f=',
  lookupIngredient: 'lookup.php?i=',
  random: 'random.php',
  listIngredient: 'list.php?i=list',
};

async function getMeal(key, name) {
  const requestResponse = await fetch(`${URL}${ENDPOINT[key]}${name}`)
    .then((response) => response.json());
  return requestResponse;
}

export default getMeal;
