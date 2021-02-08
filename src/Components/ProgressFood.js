/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import ButtonsShareAndFavFood from './ButtonsShareAndFavFood';
import ProgressIngredients from './ProgressIngredients';
import RecipesContext from '../context/RecipesContext';
import FinishButton from './FinishButton';

function ProgressFood() {
  const {
    setIdParams,
    recipe,
    setRecipe,
    recipeIngredients,
    setRecipeIngredients,
    counter,
    finishRecipe,
    setFinisRecipe,
  } = useContext(RecipesContext);
  const [loading, setLoading] = useState(true);
  const [finished, setFinnished] = useState(false);
  const [fav, setFav] = useState(false);
  const { id } = useParams();
  const zero = 0;
  const nine = 9;
  const fortyNine = 49;
  const twenty = 20;
  useEffect(() => {
    setIdParams(id);
  }, []);

  useEffect(() => {
    if (recipeIngredients.length > zero && counter >= recipeIngredients.length) {
      setFinisRecipe(true);
    }
  }, [counter]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const food = await response.json();
      setRecipe(food.meals[0]);
      setLoading(false);
      const array = Object.values(food.meals[0]).slice(nine, fortyNine);
      const pos = array.indexOf('');
      const ingredients = array.map((ingredient, index) => (
        { [ingredient]: array[index + twenty] }
      ));
      const allingredients = ingredients.slice(zero, pos);
      setRecipeIngredients(allingredients);
    };
    fetchRecipe();
  }, [id]);

  if (finished) {
    return <Redirect to="/receitas-feitas" />;
  }

  if (!loading) {
    const { strMealThumb, strMeal, strCategory, strInstructions } = recipe;
    return (
      <div
        style={ {
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        } }
      >
        <img
          src={ strMealThumb }
          data-testid="recipe-photo"
          alt="recipe"
          style={ { marginTop: '10px', width: '80%', borderRadius: '15px' } }
        />
        <ButtonsShareAndFavFood fav={ fav } setFav={ setFav } recipe={ recipe } />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h5
          style={ { margin: '15px', fontStyle: 'italic' } }
          data-testid="recipe-category"
        >
          { strCategory }
        </h5>
        <ProgressIngredients recipeIngredients={ recipeIngredients } />
        <h5 style={ { margin: '15px 2px 2px 2px', color: 'maroon' } }>Instruções:</h5>
        <p
          data-testid="instructions"
          style={ {
            backgroundColor: '#c4c4c4',
            margin: '2px 10px 30px 10px',
            padding: '3px',
            borderRadius: '0 0 20px 20px',
            width: '100%' } }
        >
          {strInstructions}
        </p>
        <FinishButton
          finishRecipe={ finishRecipe }
          setFinnished={ setFinnished }
          recipe={ recipe }
        />
      </div>
    );
  }
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default ProgressFood;
