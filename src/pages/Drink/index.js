import React, { useContext } from 'react';
import { Header, Footer, Cards } from '../../Components';
import { DrinkContext } from '../../providers/DrinkProvider';

const Drink = () => {
  const { data, categories, categoriesData, allButton } = useContext(DrinkContext);

  const renderCards = () => {
    const maxLength = 12;
    const tweelveCards = data.filter((card, index) => index < maxLength);
    return tweelveCards.map((card, index) => (
      <Cards key={ index } index={ index } context="Bebidas" card={ card } />
    ));
  };

  return (
    <div>
      <Header>Bebidas</Header>
      { categories.map((categoryName) => (
        <button
          id={ categoryName }
          data-testid={ `${categoryName}-category-filter` }
          key={ categoryName }
          type="button"
          onClick={ categoriesData }
        >
          {categoryName}
        </button>)) }
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ allButton }
      >
        All

      </button>
      {renderCards()}
      <Footer />
    </div>
  );
};

export default Drink;
