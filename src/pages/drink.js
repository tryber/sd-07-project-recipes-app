import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchHeaderBar from '../components/SearchHeaderBar';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import ListCardsDrinkCategory from '../components/ListCardsDrinkCategory';
import ListCardsDrink from '../components/ListCardsDrink';
import { getCategoryDrinks, filterDrinkCategory } from '../services/Api';

function Drink() {
  const [loading, setLoading] = useState(false);
  const [arrayListDrink, setArrayListDrink] = useState([]);
  const [arrayCategory, setArrayCategory] = useState([]);
  const { showBtn, data, setData } = useContext(RecipeContext);
  const FIVE = 5;
  const ZERO = 0;

  useEffect(() => {
    if (!data.drink) setData({ ...data, drink: [] });
    else if (data.drink.length > ZERO) setLoading(true);
  }, [data.drink]);

  useEffect(() => {
    const getListCategories = async () => {
      const listDrinkCategories = await getCategoryDrinks();
      listDrinkCategories.length = FIVE;
      setArrayListDrink(listDrinkCategories);
    };
    getListCategories();
  }, []);

  const getFilterDrinkCategory = async (category) => {
    setArrayCategory(await filterDrinkCategory(category));
  };

  const getAlert = () => {
    window.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  };
  const getLoading = () => {
    if (loading) {
      const arrayDrinks = [...data.drink];
      return ListCardsDrink(arrayDrinks);
    }
    return 'Loading...';
  };

  const showListDrinksCategories = () => arrayListDrink.map((category) => (
    <button
      key={ category.strCategory }
      type="button"
      data-testid={ `${category.strCategory}-category-filter` }
      onClick={ () => getFilterDrinkCategory(category.strCategory) }
    >
      {category.strCategory}
    </button>
  ));

  return (
    <div>
      <Header />
      { showBtn && <SearchHeaderBar /> }

      {(arrayListDrink.length > ZERO) && showListDrinksCategories()}

      {(arrayCategory.length > ZERO) && ListCardsDrinkCategory(arrayCategory)}

      {
        (data.drink === 'erro' || data.drink === null)
          ? getAlert()
          : getLoading()
      }
      <Footer />
    </div>
  );
}

export default Drink;
