import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import RecipesContext from '../context/RecipesContext';

function FoodRecipes() {
  const { searchRender } = useContext(RecipesContext);

  return (
    <div>
      <Header />
      { searchRender ? <SearchInput /> : null}

    </div>
  );
}

export default FoodRecipes;
