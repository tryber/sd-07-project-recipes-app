import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ingredientsListMeals } from '../services/functions';
import { apiFoods } from '../services/Services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './ProcessoComidas.css';

const copy = require('clipboard-copy');

function ProcessoComidas({ match: { params: { id } }, history }) {
  const [foodInProgress, setFoodInProgress] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copyLink, setCopyLink] = useState(false);

  const zero = 0;
  const fourTeen = 14;

  const handleClick = () => {
    const url = history.location.pathname;
    const newUrl = url.slice(zero, fourTeen);
    copy(`http://localhost:3000${newUrl}`);
    return true;
  };

  const fetchFood = async () => {
    const getFood = await apiFoods(`lookup.php?i=${id}`);
    setFoodInProgress(getFood);
  };

  useEffect(() => {
    fetchFood();
  }, []);

  if (foodInProgress && foodInProgress.length === zero) return (<h1>Carregando...</h1>);

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strArea,
  } = foodInProgress[0];

  const detail = foodInProgress[0];

  function favoriteRecipes() {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorite(!isFavorite);

    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const currentFavoritesRecipes = {
      id,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };

    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...favoritesRecipes, currentFavoritesRecipes]));
  }

  function allRecipesFavorite() {
    setIsFavorite(!isFavorite);
    const favoriteRecipess = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const newFavorites = favoriteRecipess.filter((favorite) => favorite.id !== id);

    localStorage.setItem('favoriteRecipes',
      JSON.stringify(newFavorites));
  }

  return (
    <div>
      <p>comidas in processo</p>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
        width="200px"
      />
      <h4 data-testid="recipe-title">{ strMeal }</h4>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => setCopyLink(handleClick()) }
        src={ shareIcon }
      >
        <img
          src={ shareIcon }
          alt="share"
          width="30px"
        />
      </button>
      { copyLink && <p>Link copiado!</p> }
      <button
        data-testid="favorite-btn"
        type="button"
        src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
        onClick={ !isFavorite ? favoriteRecipes : allRecipesFavorite }
      >
        <img
          src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
          alt="whiteHeart"
          width="50px"
        />
      </button>
      <h6 data-testid="recipe-category">{ strCategory }</h6>
      <h6><b>Ingredientes</b></h6>
      <ul>
        { (ingredientsListMeals(detail))
          .map(
            (ingredient, index) => (
              <div
                key={ index }
                data-testid="ingredient-step"
              >
                <input
                  id={ ingredient }
                  type="checkbox"
                  key={ index }
                />
                <label
                  htmlFor={ ingredient }
                >
                  { ingredient }
                </label>
              </div>
            ),
          ) }
      </ul>
      <h6><b>Instructions</b></h6>
      <p data-testid="instructions">{ strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

ProcessoComidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.func.isRequired,
};

export default ProcessoComidas;
