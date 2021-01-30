import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  fetchDrinkDetailsById,
  fetchFoodDetailsById,
  fetchGlobalMeal,
  fetchGlobalDrink,
} from '../services/API';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import CardList from './CardList';

const copy = require('clipboard-copy');

function Details({ itemId, mealType }) {
  console.log(JSON.stringify(itemId), 'itemId');
  const quinze = 15;
  const zero = 0;
  const tresMil = 3000;
  const history = useHistory();

  const [details, setDetails] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [showMessage, setShowMessage] = useState('hidden');
  const [beginBtn, setBeginBtn] = useState('Iniciar');
  const [hideBtn, setHideBtn] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const { strInstructions } = details;

  useEffect(() => {
    const getRecommendation = async () => {
      let fetchRecommendation = [];
      if (mealType === 'Drink') fetchRecommendation = await fetchGlobalMeal();
      if (mealType === 'Meal') fetchRecommendation = await fetchGlobalDrink();
      if (fetchRecommendation) {
        fetchRecommendation.length = 6;
        await setRecommendation(fetchRecommendation);
      }
    };
    getRecommendation();
  }, [mealType]);

  useEffect(() => {
    // localStorage.setItem('doneRecipes', JSON.stringify([{ id: '52977' }]));
    const checkForCompletion = () => {
      const list = JSON.parse(localStorage.getItem('doneRecipes'));
      if (list !== null && list.filter((item) => item.id === itemId).length > zero) {
        setHideBtn('hidden');
      }
    };

    const checkForProgress = async () => {
      const list = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (list !== null) {
        let keys = [];
        if (mealType === 'Meal') { keys = Object.keys(list.meals); } else {
          keys = Object.keys(list.cocktails);
        }
        if (keys.includes(itemId)) setBeginBtn('Continuar Receita');
      }
    };

    const checkFavorites = () => {
      const list = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (list !== null && list.filter((item) => item.id === itemId).length > zero) {
        setIsFavorite(true);
      }
    };
    checkFavorites();
    checkForCompletion();
    checkForProgress();
  }, [itemId, mealType, recommendation]);

  useEffect(() => {
    const getDetails = async () => {
      let fromFetch = [];
      if (mealType === 'Drink') fromFetch = await fetchDrinkDetailsById(itemId);
      if (mealType === 'Meal') fromFetch = await fetchFoodDetailsById(itemId);
      if (fromFetch) setDetails(fromFetch[0]);
    };

    getDetails();
  }, [itemId, mealType, recommendation]);

  const forwardToInProgress = () => {
    let progressList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progressList === null) {
      progressList = { cocktails: {}, meals: {} };
    }
    if (mealType === 'Meal') progressList.meals[itemId] = [];
    else progressList.cocktails[itemId] = [];

    localStorage.setItem('inProgressRecipes', JSON.stringify(progressList));
    if (mealType === 'Meal') {
      history.push(`/comidas/${itemId}/in-progress`);
    }
    if (mealType === 'Drink') {
      history.push(`/bebidas/${itemId}/in-progress`);
    }
  };

  const loadIngredients = () => {
    const ingredientsList = [];
    for (let i = 1; i <= quinze; i += 1) {
      if (details[`strIngredient${i}`]) {
        ingredientsList.push({
          ingredient: details[`strIngredient${i}`],
          measure: details[`strMeasure${i}`],
        });
      }
    }
    return (
      <ul>
        {ingredientsList.map((item, index) => (
          <li
            key={ `ìngredient${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            <img
              width="30px"
              src={ `https://www.themealdb.com/images/ingredients/${item.ingredient}.png` }
              alt="ingredient"
            />
            {`${item.measure} - ${item.ingredient}`}
          </li>
        ))}
      </ul>
    );
  };

  const copyLink = () => {
    const url = window.location.href;
    copy(url);
    setShowMessage('');
    setTimeout(() => { setShowMessage('hidden'); }, tresMil);
  };

  const addToFavorites = () => {
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
    if (favList) {
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

  return (
    <div className="details">
      <img
        alt="Meal Thumbnail"
        width="100%"
        data-testid="recipe-photo"
        src={ details[`str${mealType}Thumb`] }
        tagName="img" // sei lá se é isso
      />
      <h3 data-testid="recipe-title">{details[`str${mealType}`]}</h3>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => copyLink() }
      >
        Compartilhar
      </button>
      <a
        type="button"
        data-testid="favorite-btn"
        onClick={ () => addToFavorites() }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        />
        Favoritar
      </a>
      <h5 hidden={ showMessage }>Link copiado!</h5>
      <h5 width="90%" data-testid="recipe-category">
        {
          mealType === 'Meal'
            ? details.strCategory
            : details.strAlcoholic
        }
      </h5>
      { loadIngredients()}
      <p width="90%" data-testid="instructions">{strInstructions}</p>
      {mealType === 'Meal'
        && (<iframe
          data-testid="video"
          width="420"
          height="315"
          src={ details.strYoutube }
          width="80%"
        />)}
      <CardList
        arrayOfCard={ recommendation }
        typeOfCard={ mealType === 'Meal' ? 'Drink' : 'Meal' }
        sideScroll=" sideScroll"
        recommendation
      />
      <button
        className="button-begin"
        type="button"
        width="100%"
        data-testid="start-recipe-btn"
        onClick={ () => forwardToInProgress() }
        hidden={ hideBtn }
      >
        {beginBtn}
      </button>
    </div>
  );
}

Details.propTypes = {
  itemId: PropTypes.string.isRequired,
  mealType: PropTypes.string.isRequired,
};

export default Details;
