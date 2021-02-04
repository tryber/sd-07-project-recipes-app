import React, { useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import RecipeDetailsContext from '../context/RecipeContext';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';
import './foodAndDrinkDetails.css';
import {
  unLikeRecipe,
  setLikeImage,
} from '../components/func_details';

function DrinkProcess(props) {
  const contextGlobal = useContext(GlobalContext);
  const { setTitle } = contextGlobal;
  const context = useContext(RecipeDetailsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [inProgressRecipes, setInProgressRecipes] = useState(true);
  const [btnImg, setBtnImg] = useState('');
  const { 
    getRecipeTitle,
    setRecipeTitle,
    getRecipeImage,
    setRecipeImage,
    getRecipeArea,
    setRecipeArea,
    getRecipeAlc,
    setRecipeAlc,    
    getRecipeCategory,
    setRecipeCategory,
    getRecipeIngredients,
    setRecipeIngredients,
    getRecipeInstructions,
    setRecipeInstructions,
    setRecipeTags,
    getRecipeTags,
  } = context;
  const { match, history: { location: { pathname } } } = props;
  const { params } = match;
  const { id } = params;

  const ingredientsMount = (fnSetRecipeIngredients, value) => {
      const initialIndex = 0;
      const halfIndex = 2;
      const ingredients = Object.entries(value.drinks[0])
        .filter(
          (item) => item[0].includes('Ingredient') || item[0].includes('Measure'),
        )
        .filter(
          (amount) => amount[1] !== null && amount[1] !== ' ' && amount[1] !== '',
        )
        .map((ar2) => ar2[1]);
      const ingredientsMeasures = [];
      for (let i = initialIndex; i < ingredients.length / halfIndex; i += 1) {
        ingredientsMeasures.push(
          `${ingredients[i]} - ${ingredients[i + ingredients.length / halfIndex]}`,
        );
      }
      fnSetRecipeIngredients(ingredientsMeasures);
    }

  const fetchRecipe = async () => {
    const path = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipe = await fetch(path);
    const result = await getRecipe.json();
    setRecipeTitle(result.drinks[0].strDrink);
    setRecipeCategory(result.drinks[0].strCategory);
    setRecipeImage(result.drinks[0].strDrinkThumb);
    setRecipeInstructions(result.drinks[0].strInstructions);
    setRecipeArea(result.drinks[0].strArea);
    setRecipeAlc(result.drinks[0].strAlcoholic);
    ingredientsMount(setRecipeIngredients, result);
    setIsLoading(false);
  };

  const saveProgress = (ingredient) => {
    const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(previousProgress)
    if (previousProgress.cocktails[id]) {
      if (previousProgress.cocktails[id].includes(ingredient)) {
        previousProgress.cocktails[id] = previousProgress.cocktails[id]
          .filter((item) => item !== ingredient);
      } else {
        previousProgress.cocktails[id].push(ingredient);
      }
    } else {
      previousProgress.cocktails[id] = [ingredient];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(previousProgress));
    setInProgressRecipes(previousProgress);
  };

  const handleChecked = ({ target: { name } }) => {
    saveProgress(name);
  };

  const handleImage = () => {
    if (btnImg === likeIcon) {
      setBtnImg(fullLikeIcon);
      saveFavoriteRecipe();
    } else {
      setBtnImg(likeIcon);
      unLikeRecipe(id);
    }
  };

  const handleToogle = (item) => {
    if (localStorage.getItem('inProgressRecipes')) {
      const prevLocalStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes'));
      console.log(prevLocalStorage);
      const onHere = prevLocalStorage.meals[id]
        .find((currentItem) => currentItem === item);
      if (onHere) {
        return 'is-checked';
      }
    }
    return 'is-not-checked';
  };

  const saveFavoriteRecipe = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = {
      id,
      type: 'bebida',
      area: getRecipeArea,
      category: getRecipeCategory,
      alcoholicOrNot: getRecipeAlc,
      name: getRecipeTitle,
      image: getRecipeImage,
    };
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    recipes.push(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
  };

  useEffect(() => {
    setTitle('Drink In Progress');
    fetchRecipe();
    setLikeImage(setBtnImg, id, fullLikeIcon, likeIcon);
  }, [])
  return(
    <div className="recipe-details-container">
      <img
        src={ getRecipeImage }
        alt={ getRecipeTitle }
        data-testid="recipe-photo"
        className="recipe-details-image"
      />
      <h1 data-testid="recipe-title" className="recipe-details-name">
        { getRecipeTitle }
      </h1>
      <div className="favorite-and-share-btn-container">
        <button type="button" onClick={ handleImage } className="favorite-btn">
          <img src={ btnImg } alt="like" data-testid="favorite-btn" />
        </button>
        <ShareButton path={ pathname } />
      </div>
      <h3 className="recipe-in-progress-category">
        Category-
        <span data-testid="recipe-category">{getRecipeCategory}</span>
      </h3>
      <ul className="ingredients-checklist">
      { !isLoading && getRecipeIngredients.map((item, index) => (
          <li
            key={ item }
            className="checked"
            data-testid={ `${index}-ingredient-step` }
          >
            <label
              htmlFor={ item }
              className={ handleToogle(item) }
            >
              <input
                type="checkbox"
                name={ item }
                id={ item }
                onChange={ handleChecked }
              />
              { item }
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions" className="recipe-details-instructions">
        {getRecipeInstructions}
      </p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-recipe-btn"
        >
          Finalizar receita
        </button>
      </Link>
    </div>
  )
  // return(
  //   <div className="recipe-details-container">
  //     <img
  //       src={ getRecipeImage }
  //       alt={ getRecipeTitle }
  //       data-testid="recipe-photo"
  //       className="recipe-details-image"
  //     />
  //     <h1 data-testid="recipe-title" className="recipe-details-name">
  //       { getRecipeTitle }
  //     </h1>
  //     <div className="favorite-and-share-btn-container">
  //       <button type="button" onClick={ handleImage } className="favorite-btn">
  //         <img src={ btnImg } alt="like" data-testid="favorite-btn" />
  //       </button>
  //       <ShareButton path={ pathname } />
  //     </div>
  //     <h3 className="recipe-in-progress-category">
  //       Category-
  //       <span data-testid="recipe-category">{getRecipeCategory}</span>
  //     </h3>
  //     <ul className="ingredients-checklist">
  //     { !isLoading && getRecipeIngredients.map((item, index) => (
  //         <li
  //           key={ item }
  //           data-testid={ `${index}-ingredient-step` }
  //         >
  //           <label
  //             htmlFor={ item }
  //             className={ handleToogle(item) }
  //           >
  //             <input
  //               type="checkbox"
  //               name={ item }
  //               id={ item }
  //               onChange={ handleChecked }
  //             />
  //             { item }
  //           </label>
  //         </li>
  //       ))}
  //     </ul>
  //     <p data-testid="instructions" className="recipe-details-instructions">
  //       {getRecipeInstructions}
  //     </p>
  //     <Link to="/receitas-feitas">
  //       <button
  //         type="button"
  //         data-testid="finish-recipe-btn"
  //         className="finish-recipe-btn"
  //       >
  //         Finalizar receita
  //       </button>
  //     </Link>
  //   </div>
  // )
}

DrinkProcess.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
};

export default DrinkProcess;
