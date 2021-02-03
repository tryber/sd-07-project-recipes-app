import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import geral from '../data';
import GlobalContext from './GlobalContext';
import {
  foodByIngredient,
  foodByName,
  foodByLetter,
  getInitialFood,
} from '../services/foodsApi';

import {
  drinkByIngredient,
  drinkByLetter,
  drinkByName,
  getInitialDrink,
} from '../services/drinksApi';

export default function GlobalProvider({ children }) {
  const [title, setTitle] = useState('');
  const [searchButton, setSearchButton] = useState(true);
  const [searchBar, setSearchBar] = useState(false);
  // const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState(geral);
  const [renderButtonExplore, setRenderButtonExplore] = useState('comidas');
  const [randomRecipeDetail, setRandomRecipeDetail] = useState({});
  const [idRandom, setIdRandom] = useState('');
  const [upSearchBar, setUpSearchBar] = useState('');
  const [data, setData] = useState([]);
  const {
    initialState: { email, password },
  } = state;
  const selectedTypeFood = useCallback(async (chooseType) => {
    switch (chooseType) {
    case 'initial':
      return setData(await getInitialFood(''));
    case 'ingredients':
      return setData(await foodByIngredient(upSearchBar));
    case 'name':
      return setData(await foodByName(upSearchBar));
    case 'firstLetter':
      return setData(await foodByLetter(upSearchBar));
    default:
      return data;
    }
  }, []);

  const selectedTypeDrink = useCallback(async (chooseType) => {
    switch (chooseType) {
    case 'initial':
      return setData(await getInitialDrink(''));
    case 'ingredients':
      return setData(await drinkByIngredient(upSearchBar));
    case 'name':
      return setData(await drinkByName(upSearchBar));
    case 'firstLetter':
      return setData(await drinkByLetter(upSearchBar));
    default:
      return data;
    }
  }, []);

  const updateState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const history = useHistory();
  const redirect = (path) => {
    history.push({ pathname: path });
  };
  const callRandomRecipe = useCallback(async () => {
    if (renderButtonExplore === 'comidas') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const dataRandom = await response.json();
      console.log(dataRandom, dataRandom.meals[0].idMeal);
      setRandomRecipeDetail(dataRandom);
      setIdRandom(dataRandom.meals[0].idMeal);
    }
    if (renderButtonExplore === 'bebidas') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const dataRandom = await response.json();
      console.log(dataRandom, dataRandom.drinks[0].idDrink);
      setRandomRecipeDetail(dataRandom);
      setIdRandom(dataRandom.drinks[0].idDrink);
    }
  }, [renderButtonExplore]);

  return (
    <GlobalContext.Provider
      value={ {
        redirect,
        title,
        searchButton,
        setSearchButton,
        searchBar,
        setSearchBar,
        data,
        upSearchBar,
        setUpSearchBar,
        selectedTypeFood,
        selectedTypeDrink,
        dataFoods,
        dataDrinks,
        setTitle,

        foodCategories,
        setFoodCategories: useCallback((value) => {
          const newInitialFoods = state.initialFoods;
          newInitialFoods.foodCategories = value;
          updateState('initialFoods', newInitialFoods);
        }, [state.initialFoods]),

        drinkCategories,
        setDrinkCategories: useCallback((value) => {
          const newInitialDrinks = state.initialDrinks;
          newInitialDrinks.drinkCategories = value;
          updateState('initialDrinks', newInitialDrinks);
        }, [state.initialDrinks]),

        setDataFoods: useCallback(() => {
          fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
            .then((response) => response.json())
            .then(({ meals }) => {
              const filter = () => {
                const filteredResponse = [];
                if (meals !== null) {
                  Object.entries(meals).forEach((meal, index) => {
                    const numberOfCards = 12;
                    if (index < numberOfCards) {
                      const { strMeal, strMealThumb } = meal[1];
                      filteredResponse.push({ name: strMeal, image: strMealThumb });
                    }
                  });
                }
                return filteredResponse;
              };
              const newInitialFoods = state.initialFoods;
              newInitialFoods.dataFoods = filter();
              updateState('initialFoods', newInitialFoods);
            }, []);
        }, [state.initialFoods]),

        setDataDrinks: useCallback(() => {
          fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
            .then((response) => response.json())
            .then(({ drinks }) => {
              const filter = () => {
                const filteredResponse = [];
                if (drinks !== null) {
                  Object.entries(drinks).forEach((drink, index) => {
                    const numberOfCards = 12;
                    if (index < numberOfCards) {
                      const { strDrink, strDrinkThumb } = drink[1];
                      filteredResponse.push({ name: strDrink, image: strDrinkThumb });
                    }
                  });
                }
                return filteredResponse;
              };
              const newInitialDrinks = state.initialDrinks;
              newInitialDrinks.dataDrinks = filter();
              updateState('initialDrinks', newInitialDrinks);
            }, []);
        }, [state.initialDrinks]),

        email,
        password,
        setEmail: (text) => {
          const newInitialEmail = state.initialState;
          newInitialEmail.email = text;
          updateState('email', newInitialEmail);
        },
        setPassword: (text) => {
          const newInititalPassword = state.initialState;
          newInititalPassword.password = text;
          updateState('password', newInititalPassword);
        },
        randomRecipeDetail,
        renderButtonExplore,
        setRenderButtonExplore,
        callRandomRecipe,
        setRandomRecipeDetail,
        idRandom,
      } }
    >
      {children}
    </GlobalContext.Provider>
  );
}
GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
