import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipes, copyButton } from '../actions';
import TitleBar from '../components/TitleBar';
import Loading from '../components/Loading';
import { favoriteDrinkLocalStorage } from '../localStorage/favoriteRecipes';
import { doneDrinkLocalStorage } from '../localStorage/doneRecipes';
import { handleCopy } from '../functions';
import {
  checkProgressDrinkLocalStorage,
  setIngredientDrinkLocalStorage,
  checkedDrinkIngredients } from '../localStorage/inProgressRecipes';

class DrinkInProgress extends Component {
  constructor(props) {
    super(props);
    this.handleState = this.handleState.bind(this);
    this.handleButtonEnabled = this.handleButtonEnabled.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.changeFavorite = this.changeFavorite.bind(this);
    this.createFavoriteLocalStorage = this.createFavoriteLocalStorage.bind(this);
    this.changeDone = this.changeDone.bind(this);
    this.state = {
      drinks: [],
      ingredients: [],
      measurement: [],
      request: true,
      favorite: false,
      button: true,
    };
  }

  componentDidMount() {
    const {
      requestRecipes,
      match: {
        params: { id },
      },
    } = this.props;
    requestRecipes(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    this.createFavoriteLocalStorage('favoriteRecipes');
    this.createFavoriteLocalStorage('doneRecipes');
    checkProgressDrinkLocalStorage(id);
  }

  componentDidUpdate() {
    const { drinksRecipes } = this.props;
    const { request } = this.state;

    if (drinksRecipes.drinks && request) {
      this.handleState();
    }
  }

  handleState() {
    const {
      match: {
        params: { id },
      },
      drinksRecipes,
    } = this.props;
    const filterRecipe = drinksRecipes.drinks.find(
      (recipe) => recipe.idDrink === id,
    );
    const ingredients = Object.entries(filterRecipe)
      .filter(
        (array) => array[0].includes('strIngredient')
          && array[1] !== null
          && array[1] !== '',
      )
      .map((array2) => array2[1]);

    const measurement = Object.entries(filterRecipe)
      .filter(
        (array) => array[0].includes('strMeasure')
          && array[1] !== null
          && array[1] !== '',
      )
      .map((array2) => array2[1]);

    this.setState({
      drinks: filterRecipe,
      ingredients,
      measurement,
      request: false,
    });
  }

  handleButtonEnabled() {
    const doneIngredients = document.querySelectorAll('input:checked');
    const allIngredients = document.getElementsByClassName('form-check-input');
    if (doneIngredients.length === allIngredients.length) {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  handleCheckbox({ target: { id: ingredient } }) {
    const { match: { params: { id } } } = this.props;
    setIngredientDrinkLocalStorage(id, ingredient);
    this.handleButtonEnabled();
  }

  changeFavorite() {
    this.setState((prevState) => ({
      favorite: !prevState.favorite,
    }),
    () => {
      const { drinks, favorite } = this.state;
      favoriteDrinkLocalStorage(drinks, favorite, 'favoriteRecipes');
    });
  }

  changeDone() {
    this.setState((prevState) => ({
      done: !prevState.done,
    }),
    () => {
      const { history } = this.props;
      const { drinks, done } = this.state;
      doneDrinkLocalStorage(drinks, done, 'doneRecipes');
      history.push('/receitas-feitas');
    });
  }

  createFavoriteLocalStorage(keyStorage) {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const read = JSON.parse(localStorage.getItem(keyStorage));

    if (read && read.some((obj) => obj.id === id)) {
      this.setState({
        favorite: true,
      });
    } else if (!read) {
      this.setState(
        {
          favorite: false,
        },
        () => localStorage.setItem(keyStorage, JSON.stringify([])),
      );
    }
  }

  render() {
    const { executeCopy, valueCopied, match: { params: { id } } } = this.props;
    const { drinks, ingredients, favorite, measurement, button } = this.state;
    const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = drinks;

    if (!strDrinkThumb) return <Loading />;
    return (
      <div className="main-container">
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid="recipe-photo"
          className="main-image"
        />
        <TitleBar
          strRecipe={ strDrink }
          strCategory={ strAlcoholic }
          handleCopy={ handleCopy }
          executeCopy={ executeCopy }
          changeFavorite={ this.changeFavorite }
          valueCopied={ valueCopied }
          favorite={ favorite }
        />
        <div className="ingredients-container">
          <h1>Ingredientes</h1>
          <div className="list-container">
            {ingredients
              .map((ingredient, index) => (
                <div
                  className="form-check"
                  data-testid={ `${index}-ingredient-step` }
                  key={ ingredient }
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={ ingredient }
                    onClick={ this.handleCheckbox }
                    checked={ checkedDrinkIngredients(id, ingredient) }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={ ingredient }
                  >
                    {`${ingredient} - ${measurement[index]}`}
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="instructions-container">
          <h1>Instruções</h1>
          <p data-testid="instructions">{strInstructions}</p>
        </div>

        <div className="finish-button-container">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ this.changeDone }
            className="finish-button-recipe"
            disabled={ button }
          >
            Finalizar Receita
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ recipesReducer, recomendationsReducer }) => ({
  drinksRecipes: recipesReducer.recipes,
  valueCopied: recomendationsReducer.copy,
});

const mapDispatchToProps = (dispatch) => ({
  requestRecipes: (endpoint) => dispatch(fetchRecipes(endpoint)),
  executeCopy: (value) => dispatch(copyButton(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkInProgress);

DrinkInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  drinksRecipes: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  requestRecipes: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  executeCopy: PropTypes.func.isRequired,
  valueCopied: PropTypes.string.isRequired,

};
