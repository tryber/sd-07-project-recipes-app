import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../Context/Context';
import useFetch from '../hooks/useFetch';

function DrinksInProgress() {
  const {
    detailsRecipe,
    drinkStateButton,
    setDrinkStateButton,
  } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  const { recipeDetailsAPI } = useFetch();
  const [checked] = useState([]);

  const url = document.URL;
  const newUrlId = url.split('/')[4];
  const newUrlType = url.split('/')[3];

  useEffect(() => {
    recipeDetailsAPI(newUrlId, newUrlType)
      .then(() => setLoading(false));
  }, []);

  function verifyLocalStorage() {
    if (localStorage.getItem('inProgressRecipes') === null) {
      const recipesInProgress = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    }
  }

  function enableButton() {
    setDrinkStateButton(true);
    const markedCheckboxes = document.querySelectorAll('input:checked');
    const checkboxes = document.getElementsByClassName('check');
    console.log('check1', markedCheckboxes.length);
    console.log('check2', checkboxes.length);
    if (checkboxes.length === markedCheckboxes.length) {
      setDrinkStateButton(false);
    }
  }

  function handleProgress(e) {
    const data = e.target.value;
    console.log(data);
    checked.push(data);
    console.log(checked);
    const localStorageRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const drink = detailsRecipe.drinks[0];
    localStorageRecipes.cocktails[drink.idDrink] = checked;
    localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageRecipes));
    localStorage.setItem(e.target.value, e.target.checked);
    enableButton();
  }

  function handleClickEnd() {
    const drink = detailsRecipe.drinks[0];
    const time = new Date();
    const object = [
      {
        id: drink.idDrink,
        type: 'bebida',
        area: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        doneDate: time,
        tags: drink.strTags,
      },
    ];

    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', JSON.stringify(object));
    } else {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('doneRecipes')),
          ...object,
        ]),
      );
    }
  }

  useEffect(() => {
    verifyLocalStorage();
  }, []);

  if (loading) {
    return (<div>Loading...</div>);
  }

  const { strCategory,
    strDrink,
    strDrinkThumb,
    strInstructions,
  } = detailsRecipe.drinks[0];

  const drink = detailsRecipe.drinks[0];
  const keysDrink = Object.keys(drink);
  const filterDrink = keysDrink
    .filter((key) => key.toLowerCase().includes('ingredient'));
  const filterMeasure = keysDrink.filter((key) => key
    .toLowerCase().includes('measure'));
  const allIngredients = filterDrink
    .map((item, index) => ({
      ingredient: drink[item], measure: drink[filterMeasure[index]],
    })).filter((item) => item.ingredient !== '' && item.ingredient !== null);

  return (
    <div onLoad={ enableButton }>
      <img src={ strDrinkThumb } data-testid="recipe-photo" alt={ strDrink } />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{strCategory}</p>
      <div id="ingredients-div">
        {allIngredients && allIngredients
          .map((item, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <label htmlFor={ item.ingredient }>
                <input
                  type="checkbox"
                  className="check"
                  id={ item.ingredient }
                  key={ item.ingredient }
                  name={ item.ingredient }
                  value={ item.ingredient }
                  checked={ JSON.parse(localStorage.getItem(item.ingredient)) }
                  onChange={ (e) => handleProgress(e) }
                />
                {
                  `${index + 1} - ${item.ingredient}: ${item.measure}`
                }
              </label>
            </div>
          ))}
      </div>
      <p
        data-testid="instructions"
      >
        {strInstructions}

      </p>
      <Link to="/receitas-feitas">

        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ drinkStateButton }
          onClick={ handleClickEnd }
        >
          Finalizar receita

        </button>
      </Link>
    </div>);
}

export default DrinksInProgress;
