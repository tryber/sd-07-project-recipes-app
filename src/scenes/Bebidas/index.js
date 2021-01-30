import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../common/SearchBar';
import { AppContext } from '../../context/AppContext';

import CategoryButton from '../../common/CategoryButton';

import './style.css';

const Bebidas = () => {
  const history = useHistory();
  const { drinksData, drinksCategories } = useContext(AppContext);

  if (drinksData.drinks) {
    const zero = 0;
    const doze = 12;
    if (drinksData.drinks.length === 1) {
      history.push(
        `/bebidas/${drinksData.drinks[0].idDrink}`,
      );
    }
    return (
      <div>
        <SearchBar />
        {drinksCategories.map((item, index) => (
          <CategoryButton
            key={index}
            categoryName={item.strCategory}
            categoryType='drinks'
            />))}
        {drinksData.drinks.slice(zero, doze).map((e, i) => (
          <div
            className="drinkContainer"
            key={ e.idDrink }
            data-testid={ `${i}-recipe-card` }
          >
            <img data-testid={ `${i}-card-img` } src={ e.strDrinkThumb } alt="drink" />
            <h1 data-testid={ `${i}-card-name` }>{e.strDrink}</h1>
          </div>))}
      </div>
    );
  }

  return (
    <>
      <SearchBar />
      <h1>Faça uma pesquisa</h1>
    </>
  );
};

export default Bebidas;
