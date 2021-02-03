import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { loadState } from '../services/localStorage';
import { requestApiFoodDetails } from '../services/requestFood';
import { recommendDrinksList } from '../services/requestDrink';

const filteredIngredientsAndMeasures = (
  detailsEntries,
  filteredIngredients,
  filteredMeasures,
) => {
  const ingredientRegex = /strIngredient/i;
  const measureRegex = /strMeasure/i;

  detailsEntries.forEach((currentArray) => {
    if (ingredientRegex.test(currentArray[0]) && currentArray[1].trim() !== '') {
      filteredIngredients.push(currentArray[1]);
    }

    if (measureRegex.test(currentArray[0]) && currentArray[1].trim() !== '') {
      filteredMeasures.push(currentArray[1]);
    }
  });
};

function DetalhesReceitas({ match: { params: { id } } }) {
  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredientsAndMeasure, setIngredientsAndMeasure] = useState([]);
  const [videoLink, setVideoLink] = useState('');
  const [recommendedForThisFood, setRecommendedForThisFood] = useState([]);
  const [startRecipeButton, setStartRecipeButton] = useState('Iniciar Receita');

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim

  const getIngredientsAndMeasure = () => {
    const detailsEntries = Object.entries(foodDetails);
    const filteredIngredients = [];
    const filteredMeasures = [];
    const expectedArray = [];

    filteredIngredientsAndMeasures(detailsEntries, filteredIngredients, filteredMeasures);

    filteredMeasures.forEach((measure, index) => {
      expectedArray.push(`${filteredIngredients[index]} ${measure}`);
    });

    setIngredientsAndMeasure(expectedArray);
  };

  const getVideoLink = () => {
    if (foodDetails.strYoutube) {
      console.log(foodDetails.strYoutube);
      const splitLink = foodDetails.strYoutube.split('=');
      const endOfLink = splitLink[splitLink.length - 1];
      const expectedLink = `https://www.youtube.com/embed/${endOfLink}`;
      setVideoLink(expectedLink);
    }
  };

  const getTheRecommendedDrinks = async () => {
    if (foodDetails) {
      const firstIndex = 0;
      const lastIndex = 6;
      const recommendedDrinksArray = await recommendDrinksList();
      const expectedArray = recommendedDrinksArray.drinks.slice(firstIndex, lastIndex);
      setRecommendedForThisFood(expectedArray);
    }
  };

  const setStateOfStartRecipe = () => {
    if (localStorage.getItem('inProgressRecipes')) {
      const loadStorage = loadState('inProgressRecipes', '');
      if (loadStorage.meals[id] !== undefined) {
        setStartRecipeButton('Continuar Receita');
      }
    }
  };

  useEffect(() => {
    getIngredientsAndMeasure();
    getVideoLink();
    getTheRecommendedDrinks();
    setStateOfStartRecipe();
  }, [foodDetails]);

  const callMainApi = async () => {
    const apiResult = await requestApiFoodDetails(id);
    setFoodDetails(apiResult[0]);
  };

  useEffect(() => {
    callMainApi();
  }, []);

  if (!foodDetails) return <span>Loading...</span>;

  return (
    <div>
      <img
        src={ foodDetails.strMealThumb }
        alt={ foodDetails.strMeal }
        deta-testid="recipe-photo"
      />
      <div>
        <div>
          <h2 data-testid="recipe-title">
            { foodDetails.strMeal }
          </h2>
          <hr />
          <span data-testid="recipe-category">
            { foodDetails.strCategory }
          </span>
        </div>
      </div>
      <div>
        <p>Ingredients</p>
        <div>
          {
            ingredientsAndMeasure.map((element, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ `ingredient${index}` }
              >
                { element }
              </p>
            ))
          }
        </div>
        <p>Instructions</p>
        <div>
          <p data-testid="instructions">
            { foodDetails.strInstructions }
          </p>
        </div>
      </div>
      <iframe
        src={ videoLink }
        data-testid="video"
        title="video"
        width="100%"
        height="360"
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
        fs="1"
      />
      <div>
        <Slider { ...sliderSettings }>
          {
            recommendedForThisFood.map((drink, index) => (
              <div
                key={ drink }
                data-testid={ `${index}-recomendation-card` }
              >
                <div>
                  <img
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrinkThumb }
                  />
                  <h3 data-testid={ `${index}-recomendation-title` }>
                    { drink.strDrink }
                  </h3>
                </div>
              </div>
            ))
          }
        </Slider>
      </div>
      <div>
        <Link to={ `comidas/${id}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            { startRecipeButton }
          </button>
        </Link>
      </div>
    </div>
  );
}

DetalhesReceitas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DetalhesReceitas;
