/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../Components/Header';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import RecipesContext from '../context/RecipesContext';
import './style/DrinkPage.css';

function DrinkPage() {
  const {
    globalRecipes,
    isOnlyOne,
    setFirstTwelveRecipes,
    isFetching,
    setIsFetching,
    firstTwelveRecipes } = useContext(RecipesContext);
  const [filtered, setFiltered] = useState(false);
  const [filter, setFilter] = useState('');
  const [fiveCategories, setFiveCategories] = useState([]);
  const { ingredient } = useParams();
  const twelve = 12;
  const zero = 0;
  const five = 5;

  useEffect(() => {
    if (ingredient) {
      const fetchDrinksByIngredient = async () => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const drinks = await response.json();
        // if (drinks.drinks) {
        setFirstTwelveRecipes(drinks.drinks.slice(zero, twelve));
        setIsFetching(false);
        // }
      };
      fetchDrinksByIngredient();
    } else if (!globalRecipes.drinks && !filtered) {
      const fetchDrinks = async () => {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const drinks = await response.json();
        setFirstTwelveRecipes(drinks.drinks.slice(zero, twelve));
        setIsFetching(false);
      };
      const fetchCategories = async () => {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const resultCategories = await response.json();
        setFiveCategories(resultCategories.drinks.slice(zero, five));
        setIsFetching(false);
      };
      fetchDrinks();
      fetchCategories();
    }
  }, [filtered]);

  const filterByCategory = async (category) => {
    if (!filtered || filter !== category) {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const filteredDrinks = await response.json();
      setFirstTwelveRecipes(filteredDrinks.drinks.slice(zero, twelve));
      setIsFetching(false);
      setFilter(category);
      setFiltered(true);
    } else {
      setFiltered(false);
    }
  };

  const clearFilter = () => {
    setFiltered(false);
  };

  if (isOnlyOne) {
    const id = globalRecipes.drinks[0].idDrink;
    return <Redirect to={ `/bebidas/${id}` } />;
  }
  return (
    <div>
      <Header title="Bebidas" showSearcIcon />
      <div className="filters">
        <Button
          onClick={ clearFilter }
          type="button"
          data-testid="All-category-filter"
        >
          All
        </Button>
        {!isFetching && (
          fiveCategories.map(({ strCategory }) => (
            <Button
              key={ strCategory }
              onClick={ () => filterByCategory(strCategory) }
              data-testid={ `${strCategory}-category-filter` }
              variant="secondary"
            >
              {strCategory}
            </Button>
          ))
        )}
      </div>
      {!isFetching
        ? (
          <div style={ { display: 'flex', flexWrap: 'wrap', width: '100%' } }>
            {firstTwelveRecipes.map(
              (recipe, index) => (
                <Card key={ index } item={ recipe } index={ index } />
              ),
            )}
          </div>
        )
        : null}
      <Footer />
    </div>
  );
}

export default DrinkPage;
