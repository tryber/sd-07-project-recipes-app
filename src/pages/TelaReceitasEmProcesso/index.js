import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import clipboard from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import getStorage from '../../services/localStorageAPI/getStorage';
import setStorage from '../../services/localStorageAPI/setStorage';
import { getSpecificMealById } from '../../store/ducks/getDetailedMeal/actions';
import { getSpecificDrinkById } from '../../store/ducks/getDetailedDrink/actions';
import * as functions from './functions';

class TelaDeReceitaEmProcesso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,
        17: false,
        18: false,
        19: false,
        20: false,
      },
      isClicked: false,
      isFavorite: false,
    };
    // this.handleRecipeDone = this.handleRecipeDone.bind(this);
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { getDetailedMealDispatch, getDetailedDrinkDispatch } = this.props;
    await getDetailedMealDispatch(id);
    await getDetailedDrinkDispatch(id);
    this.checkStorage();
  }

  componentDidUpdate() {
    const favoritesFromStorage = getStorage('favoriteRecipes');
    const { isFavorite } = this.state;
    const { meal } = this.props;
    if (meal) {
      if (!favoritesFromStorage) {
        setStorage('favoriteRecipes', []);
      } else if (!isFavorite) {
        this.handleFavoriteStart(meal);
      }
    }
  }

  handleFavoriteClick(meal) {
    const favoritesFromStorage = getStorage('favoriteRecipes');
    const { isFavorite } = this.state;
    if (isFavorite) {
      const newLocalStorage = favoritesFromStorage.filter(
        (curr) => curr.id !== meal.idMeal,
      );
      setStorage('favoriteRecipes', newLocalStorage);
      this.setState({ isFavorite: false });
    } else {
      const newLocalStorageObj = {
        id: meal.idMeal,
        type: 'comida',
        area: meal.strArea,
        category: meal.strCategory,
        alcoholicOrNot: '',
        name: meal.strMeal,
        image: meal.strMealThumb,
      };
      favoritesFromStorage.push(newLocalStorageObj);
      setStorage('favoriteRecipes', favoritesFromStorage);
      this.setState({ isFavorite: true });
    }
  }

  handleShareClick() {
    const { match: { params: { id } },
    } = this.props;
    this.setState({ isClicked: true });
    clipboard(`http://localhost:3000/comidas/${id}`);
  }

  handleFavoriteStart(meal) {
    const favoritesFromStorage = getStorage('favoriteRecipes');
    const zero = 0;
    if (favoritesFromStorage.length !== zero) {
      favoritesFromStorage.forEach((item) => {
        if (item.id === meal[0].idMeal) {
          this.setState({ isFavorite: true });
        }
      });
    }
  }

  handleCheck(event, index) {
    const {
      target: { checked },
    } = event;
    const { checkboxes } = this.state;
    if (checked) {
      checkboxes[index] = true;
      const checks = JSON.stringify(checkboxes);
      return this.setState({ checkboxes },
        () => localStorage.setItem('checkboxesM', checks));
    }
    checkboxes[index] = false;
    const checks = JSON.stringify(checkboxes);
    return this.setState({ checkboxes },
      () => localStorage.setItem('checkboxesM', checks));
  }

  checkStorage() {
    const storageChecks = localStorage.getItem('checkboxesM');
    const checks = JSON.parse(storageChecks);
    if (storageChecks) {
      return this.setState({ checkboxes: checks });
    }
  }

  renderDetailsMeal(meal) {
    const ingredientsArray = functions.handleIngredients(meal);
    const measuresArray = functions.handleMeasure(meal);
    const { checkboxes, isClicked, isFavorite } = this.state;
    return (
      <>
        <Container>
          <img
            data-testid="recipe-photo"
            alt="comida"
            src={ meal[0].strMealThumb }
          />
          <h3 data-testid="recipe-title">{meal[0].strMeal}</h3>
          <div
            onClick={ this.handleShareClick }
            onKeyDown={ this.handleShareClick }
            role="button"
            tabIndex={ 0 }
          >
            <img data-testid="share-btn" alt="share-btn" src={ shareIcon } />
          </div>
          <tag>{isClicked ? 'Link copiado!' : null}</tag>
          <div
            onClick={ () => this.handleFavoriteClick(meal[0]) }
            onKeyDown={ () => this.handleFavoriteClick(meal[0]) }
            role="button"
            tabIndex={ 0 }
          >
            {!isFavorite ? functions.renderWhiteHeart() : functions.renderBlackHeart()}
          </div>
          <h4 data-testid="recipe-category">{meal[0].strCategory}</h4>
        </Container>
        <Container>
          <Form>
            <h4>Ingredients</h4>
            {ingredientsArray.map((item, index) => (
              <div key={ item } data-testid={ `${index}-ingredient-step` }>
                <Form.Check
                  type="checkbox"
                  onClick={ (e) => this.handleCheck(e, index) }
                  defaultChecked={ checkboxes[index] }
                />
                <Form.Check.Label>
                  {`${item[1]} - ${
                    measuresArray[index]
                      ? measuresArray[index][1]
                      : 'Like taste'
                  }`}
                </Form.Check.Label>
              </div>
            ))}
            <h4>Instructions</h4>
            <p data-testid="instructions">{meal[0].strInstructions}</p>

            <Button
              variant="secondary"
              block
              size="lg"
              data-testid="finish-recipe-btn"
              onClick={ this.handleRecipeDone }
            >
              Finalizar Receita
            </Button>
          </Form>
        </Container>
      </>
    );
  }

  render() {
    const { meal } = this.props;
    if (meal) {
      return this.renderDetailsMeal(meal);
    }
    return <div>Loading...</div>;
  }
}

TelaDeReceitaEmProcesso.propTypes = {
  meal: PropTypes.arrayOf(PropTypes.Object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getDetailedMealDispatch: PropTypes.func.isRequired,
  getDetailedDrinkDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  meal: state.detalhesDaReceitaComida.meal.meals,
  drinkDetailStore: state.detalhesDaReceitaBebida.drink.drinks,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailedMealDispatch: (id) => dispatch(getSpecificMealById(id)),
  getDetailedDrinkDispatch: (id) => dispatch(getSpecificDrinkById(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TelaDeReceitaEmProcesso);
