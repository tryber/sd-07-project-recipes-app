import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer, IngredientCard, Loading } from '../../components';
import { fetchingFoods } from '../../services/mandaFoods';
import RecipeContext from '../../context/RecipesContext';
import './FoodIngredients.css';

export default function FoodIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setMeals, isLoading, setIsLoading } = useContext(RecipeContext);
  const { push } = useHistory();
  const twelve = 12;
  const fetchFoodIngredients = async () => {
    setIsLoading(true);
    try {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const results = await fetch(URL).then((response) => response.json());
      console.log(results.meals);
      setIngredients(results.meals);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const redirectToFoodPage = async (ingredientSelect) => {
    const selectedIngredient = await fetchingFoods('Ingrediente', ingredientSelect);
    // console.log(selectedIngredient);
    setMeals(selectedIngredient);
    push('/comidas');
  };

  useEffect(() => {
    fetchFoodIngredients();
  }, []);

  return (
    <div className="food-ingredient-container">
      <Header title="Explorar Ingredientes" />
      <div className="ingredient-card">
        { isLoading ? <Loading />
          : ingredients.filter((_, index) => index < twelve)
            .map((ingredient, index) => (
              <IngredientCard
                key={ index }
                id={ index }
                ingredient={ ingredient }
                redirectToFoodPage={ redirectToFoodPage }
              />
            ))}
      </div>
      <Footer />
    </div>
  );
}
