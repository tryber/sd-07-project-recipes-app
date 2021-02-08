import React, { useEffect, useContext, useState } from 'react';
import { RecipesContext } from '../../context';
import { Header, Footer, RecipeCard, Category, Loading } from '../../components';
import './MainFood.css';

export default function MainFood() {
  const { setMeals, meals, isLoading, setIsLoading } = useContext(RecipesContext);
  const twelve = 12;
  const five = 5;
  const [categories, setCategories] = useState([]);

  const fetchRandomFoods = async () => {
    setIsLoading(true);
    try {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const foods = await fetch(URL).then((response) => response.json());
      setMeals(foods.meals);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const fetchFoodsCategories = async () => {
    setIsLoading(true);
    try {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const results = await fetch(URL).then((response) => response.json());
      setCategories(results.meals);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const ZERO = 0;
    if (meals.length === ZERO) {
      fetchRandomFoods();
    }
    fetchFoodsCategories();
  }, []);

  return (
    <div className="main-food">
      <Header title="Comidas" />
      <div className="categories-buttons">
        <button
          type="button"
          onClick={ fetchRandomFoods }
          data-testid="All-category-filter"
        >
          ALL
        </button>
        { isLoading ? <Loading />
          : categories && categories.filter((_, index) => index < five)
            .map((category, index) => (
              <Category
                fetchRandomFoods={ fetchRandomFoods }
                key={ index }
                category={ category }
              />
            ))}
      </div>
      <main>
        <div className="cards-container-food">
          { isLoading ? <Loading />
            : meals.filter((_, index) => index < twelve)
              .map((meal, index) => (
                <RecipeCard key={ index } id={ index } meal={ meal } />
              ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
