import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RecipesCard from './RecipesCard';

class RecipesList extends React.Component {
  render() {
    const { mealRecipes, drinkRecipes, search } = this.props;
    const maxNumber = 12;
    const startList = 0;

    if (search === 'drinks') {
      return (
        <div className="recipes-list">
          {drinkRecipes.slice(startList, maxNumber).map((recipe, index) => (
            <Link
              key={ recipe.idDrink }
              data-testid={ `${index}-recipe-card` }
              to={ `/bebidas/${recipe.idDrink}` }
            >
              <RecipesCard
                recipe={ recipe }
                index={ index }
                search="drinks"
              />
            </Link>
          ))}
        </div>
      );
    }

    return (
      <div className="recipes-list">
        {mealRecipes.slice(startList, maxNumber).map((recipe, index) => (
          <Link
            key={ recipe.idMeal }
            data-testid={ `${index}-recipe-card` }
            to={ `/comidas/${recipe.idMeal}` }
          >
            <RecipesCard
              key={ recipe.idMeal }
              recipe={ recipe }
              index={ index }
              search="meals"
            />
          </Link>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ recipes: { mealRecipes, drinkRecipes } }) => (
  { mealRecipes, drinkRecipes }
);

RecipesList.propTypes = {
  search: PropTypes.string.isRequired,
  mealRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  drinkRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(RecipesList);
