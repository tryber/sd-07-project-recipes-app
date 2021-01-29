import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import RecipesContext from './Context/Context';
import RequestFoodAPI from '../services/foodApi';
import RequestFoodBayName from '../services/nameFoodApi';
import RequestFoodByLetter from '../services/firstLetterFoodApi';
import RequestFoodCategories from '../services/categoriesFood';

const FoodProvider = ({ children }) => {
  const [tittleHeader, setTittleHeader] = useState('Comidas');
  const [searchBar, setSearchBar] = useState(false);
  const [inputText, setInputText] = useState('');
  const [radioType, setRadioType] = useState('');
  const [data, setData] = useState([]);
  const [categoriesButtom, setCategoriesButtom] = useState([]);

  useEffect(() => {
    async function apiNewData() {
      const newData = await RequestFoodBayName('');
      setData(newData);
    }
    async function requestCategories() {
      const temp = [];
      const maxLengthButtom = 5;
      const excludeRestOfArry = 10;
      const results = await RequestFoodCategories();
      await results.forEach((obj) => {
        const { strCategory } = obj;
        temp.push(strCategory);
      });
      temp.splice(maxLengthButtom, excludeRestOfArry);
      await setCategoriesButtom(temp);
    }
    apiNewData();
    requestCategories();
  }, []);

  const changeSearchBarState = () => {
    if (searchBar === true) setSearchBar(false);
    if (searchBar === false) setSearchBar(true);
  };

  const alertMessage = () => {
    const message = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    alert(message);
  };

  const searchWithFilter = () => {
    async function requestByIngredient() {
      const results = await RequestFoodAPI(inputText);
      if (!results) return alertMessage();
      setData(results);
    }

    async function requestByName() {
      const results = await RequestFoodBayName(inputText);
      if (!results) return alertMessage();
      setData(results);
    }

    async function requestByLetter() {
      const results = await RequestFoodByLetter(inputText);
      if (!results) return alertMessage();
      setData(results);
    }

    if (radioType === 'Ingrediente') {
      requestByIngredient();
    }
    if (radioType === 'Nome') {
      requestByName();
    }
    if (radioType === 'firtLetter') {
      if (inputText.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        requestByLetter();
      }
    }
  };

  const context = {
    tittleHeader,
    setTittleHeader,
    searchBar,
    changeSearchBarState,
    radioType,
    setRadioType,
    searchWithFilter,
    inputText,
    setInputText,
    data,
    categoriesButtom,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
};

FoodProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default FoodProvider;
