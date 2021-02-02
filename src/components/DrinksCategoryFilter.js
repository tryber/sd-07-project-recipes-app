import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/recipe.css';
import { fetchCategories, setCategory } from '../actions';

class DrinksCategoryFilter extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { requestCategories, endPoint } = this.props;
    requestCategories(endPoint);
  }

  handleClick(event) {
    const { selectCategory } = this.props;
    const category = event.target.value;
    selectCategory(category);
  }

  render() {
    const { getCategories } = this.props;
    const DRINK_LENGTH = 5;

    if (getCategories.drinks) {
      const filterArray = getCategories.drinks
        .filter((_drink, index) => index < DRINK_LENGTH);
      return (
        <div className="category-button-container">
          {filterArray.map((drink) => (
            <button
              type="button"
              key={ drink.strCategory }
              value={ drink.strCategory }
              data-testid={ `${drink.strCategory}-category-filter` }
              onClick={ this.handleClick }
            >
              { drink.strCategory }
            </button>
          ))}
          <button
            type="button"
            value="All"
            onClick={ this.handleClick }
            data-testid="All-category-filter"
          >
            All
          </button>
        </div>
      );
    }
    return (
      <div />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestCategories: (endPoint) => dispatch(fetchCategories(endPoint)),
  selectCategory: (category) => dispatch(setCategory(category)),
});

const mapStateToProps = ({ categoriesReducer }) => ({
  getCategories: categoriesReducer.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinksCategoryFilter);

DrinksCategoryFilter.propTypes = {
  endPoint: PropTypes.string.isRequired,
  requestCategories: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  getCategories: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
