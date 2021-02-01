const quinze = 15;
const zero = 0;
const tresMil = 3000;

export const filteredList = (value, list) => list.filter((item) => item !== value);

export const getIngredients = (details) => {
  const ingredientsList = [];
  for (let i = 1; i <= quinze; i += 1) {
    if (details[`strIngredient${i}`]) {
      ingredientsList.push({
        ingredient: details[`strIngredient${i}`],
        measure: details[`strMeasure${i}`],
      });
    }
  }
  return ingredientsList;
};

export const checkOut = (checkedList, value) => {
  let isChecked = false;
  if (checkedList.length > zero) {
    isChecked = checkedList.some((item) => item === value);
  }
  localStorage.setItem('checkedList', isChecked
    ? filteredList(value, checkedList)
    : [...checkedList, value]);
  return (isChecked
    ? filteredList(value, checkedList)
    : [...checkedList, value]);
};

export const addToCheckedList = (checkedList,
  setDisableButton,
  setCheckedList,
  details) => {
  if (checkedList + 1 === getIngredients(details).length) {
    console.log('entrou na condicao');
    setDisableButton(false);
  }
  setCheckedList(checkedList + 1);
};

const copy = require('clipboard-copy');

export const copyLink = (url, setShowMessage) => {
  const replacedUrl = url.replace('/in-progress', '');
  copy(replacedUrl);
  setShowMessage('');
  setTimeout(() => { setShowMessage('hidden'); }, tresMil);
};

export const addToFavorites = (itemId, mealType, details, setIsFavorite) => {
  const data = {
    id: itemId,
    type: mealType === 'Meal' ? 'comida' : 'bebida',
    area: mealType === 'Meal' ? details.strArea : '',
    category: details.strCategory,
    alcoholicOrNot: mealType === 'Drink' ? details.strAlcoholic : '',
    name: details[`str${mealType}`],
    image: details[`str${mealType}Thumb`],
  };
  let favList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(favList);
  if (favList) {
    console.log('entrou');
    if (favList.filter((item) => item.id === itemId).length > zero) {
      favList = favList.filter((item) => item.id !== itemId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favList));
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favList, data]));
    }
  } else {
    setIsFavorite(true);
    localStorage.setItem('favoriteRecipes', JSON.stringify([data]));
  }
};
