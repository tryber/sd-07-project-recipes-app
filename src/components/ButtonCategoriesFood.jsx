import React, { useState, useContext, useEffect } from 'react';
import CoffeAndCodeContext from '../context/CoffeeAndCodeContext';
import {
  requestApiFoodListCategories,
  requestApiFoodFilterName,
  requestApiFoodFilterCategories,
} from '../services/requestFood';

function ButtonCategoriesFood() {
  const [categorySelectedPreviously, setCategorySelectedPreviously] = useState('All');

  const {
    categoriesButtonFood,
    setCategoriesButtonFood,
    setCardFood,
  } = useContext(CoffeAndCodeContext);

  const getCategoriesFoodArray = async () => {
    const firstIndex = 0;
    const lastIndex = 6;
    const apiResult = await requestApiFoodListCategories();
    const currentFoodCategories = apiResult.slice(firstIndex, lastIndex)
      .map(({ strCategory }) => strCategory);
    const expectedFoodCategories = ['All', ...currentFoodCategories];
    setCategoriesButtonFood(expectedFoodCategories);
  };

  useEffect(() => {
    if (!categoriesButtonFood.length) getCategoriesFoodArray();
  }, []);

  const selectedCategory = async (category) => {
    if (category === categorySelectedPreviously || category === 'All') {
      const allRecipes = await requestApiFoodFilterName();
      setCardFood(allRecipes);
      setCategorySelectedPreviously('All');
    } else {
      const filteredRecipes = await requestApiFoodFilterCategories(category);
      setCardFood(filteredRecipes);
      setCategorySelectedPreviously(category);
    }
  };

  if (!categoriesButtonFood.length) return <span>Loading...</span>;

  return (
    <div>
      {
        categoriesButtonFood.map((category) => (
          <button
            data-testid={ `${category}-category-filter` }
            type="button"
            key={ category }
            onClick={ () => selectedCategory(category) }
          >
            { category }
          </button>
        ))
      }
    </div>
  );
}

export default ButtonCategoriesFood;
