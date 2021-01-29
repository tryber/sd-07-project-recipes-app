import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { foodFilterByCategory, getFoodRecipes } from '../services';
import { drinksFilteredByCategory, getDrinkRecipes } from '../services/drinkApi';

class CustomCartegory extends Component {
  render() {
    const {
      category,
      title,
      dispatchFoodFilteredByCategory,
      dispatchDrinkFilteredByCategory,
      currentCategoryFood,
      dispatchFoodRecipes,
      dispatchDrinksRecipes,
      currentCategoryDrink,
    } = this.props;
    return (
      <button
        type="button"
        data-testid={ `${category.strCategory}-category-filter` }
        onClick={ () => {
          console.log(category);
          if (currentCategoryFood === category.strCategory
            || currentCategoryDrink === category.strCategory
          ) {
            return title === 'Comidas' ? dispatchFoodRecipes({})
              : dispatchDrinksRecipes({});
          }
          if (title === 'Comidas') dispatchFoodFilteredByCategory(category);
          if (title === 'Bebidas') dispatchDrinkFilteredByCategory(category);
        } }
      >
        {category.strCategory}
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCategoryDrink: state.drinkRecipesReducer.currentCategoryDrink,
  currentCategoryFood: state.foodRecipesReducer.currentCategoryFood,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchDrinksRecipes: (searchHeader) => dispatch(getDrinkRecipes(searchHeader)),
  dispatchFoodRecipes: (searchHeader) => dispatch(getFoodRecipes(searchHeader)),
  dispatchDrinkFilteredByCategory: (category) => {
    dispatch(drinksFilteredByCategory(category));
  },
  dispatchFoodFilteredByCategory: (category) => {
    dispatch(foodFilterByCategory(category));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomCartegory);

CustomCartegory.propTypes = {
  category: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  dispatchFoodFilteredByCategory: PropTypes.func.isRequired,
  dispatchDrinkFilteredByCategory: PropTypes.func.isRequired,
};
