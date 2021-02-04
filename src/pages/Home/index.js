import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchRecipes, fetchRecipesByCategory } from '../../store/ducks/recipes';
import { RecipeCardList, RecipeCategoryFilter } from '../../components';
import { fetchRecipesByIngredient } from '../../store/ducks/recipes/operations';

const Home = () => {
  const recipes = useSelector((state) => state.recipes.data);
  const isLoading = useSelector((state) => state.recipes.isFetching);
  const filterByCategory = useSelector((state) => state.recipes.filterByCategory);
  const filterByIngredient = useSelector((state) => state.recipes.filterByIngredient);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const START_INDEX = 0;
  const END_INDEX = 12; // 12 cards - 12 not included

  useEffect(() => {
    const getRecipes = (type, category, ingredient) => {
      if (category) {
        dispatch(fetchRecipesByCategory(type, category));
      } else if (ingredient) {
        dispatch(fetchRecipesByIngredient(type, ingredient));
      } else {
        dispatch(fetchRecipes(type));
      }
    };
    getRecipes(pathname, filterByCategory, filterByIngredient);
  }, [dispatch, pathname, filterByCategory, filterByIngredient]);

  return (
    <>
      <h1>
        {`PAGE HOME - open by ${pathname}`}
      </h1>
      {isLoading ? 'Loading...' : ''}
      <RecipeCategoryFilter />
      { recipes
        && <RecipeCardList recipeList={ recipes.slice(START_INDEX, END_INDEX) } /> }
    </>
  );
};

export default Home;
