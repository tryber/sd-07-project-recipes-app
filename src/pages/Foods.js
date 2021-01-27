import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CustomSearchBar, CustomCardFood } from '../components';
import getFoodRecipes from '../services/foodApi';
import { updateFoodIsFetching } from '../redux/actions';

class Foods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchHeader: {
        searchInput: '',
        searchRadio: '',
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleInputChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      ...prevState,
      searchHeader: {
        ...prevState.searchHeader,
        [name]: value,
      },
    }));
  }

  async handleButtonClick() {
    const { dispatchFoodRecipes } = this.props;
    const { searchHeader } = this.state;
    const { searchRadio, searchInput } = searchHeader;
    if (searchRadio === 'f' && searchInput.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    await dispatchFoodRecipes(searchHeader);
  }

  handleRecipes() {
    const { meals, isFetching } = this.props;
    if (!meals.length && !isFetching) return this.renderAlertError();
    if (meals.length === 1) return this.redirectToRecipeDetail();
    return this.renderRecipes();
  }

  redirectToRecipeDetail() {
    const { meals } = this.props;
    return <Redirect to={ `/comidas/${meals[0].idMeal}` } />;
  }

  renderAlertError() {
    const { dispatchUpdateFoodIsFetching } = this.props;
    dispatchUpdateFoodIsFetching();
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  renderRecipes() {
    const { meals } = this.props;
    const LENGTH = 12;
    const INITIAL_LENGTH = 0;
    const MAX_LENGTH = (meals.length > LENGTH) ? LENGTH : meals.length;
    return (
      <div>
        { meals.slice(INITIAL_LENGTH, MAX_LENGTH)
          .map((meal, index) => (
            <CustomCardFood key={ meal.idMeal } index={ index } meal={ meal } />)) }
      </div>
    );
  }

  render() {
    return (
      <div>
        <button type="button" data-testid="search-top-btn">SearchBar</button>
        <CustomSearchBar
          inputChange={ this.handleInputChange }
          buttonClick={ this.handleButtonClick }
        />
        { this.handleRecipes() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.foodRecipesReducer.isFetching,
  meals: state.foodRecipesReducer.meals,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFoodRecipes: (searchHeader) => dispatch(getFoodRecipes(searchHeader)),
  dispatchUpdateFoodIsFetching: () => dispatch(updateFoodIsFetching()),
});

Foods.propTypes = {
  dispatchFoodRecipes: PropTypes.func.isRequired,
  dispatchUpdateFoodIsFetching: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  meals: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
