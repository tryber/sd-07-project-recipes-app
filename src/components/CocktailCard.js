import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CocktailCard extends Component {
  render() {
    const { cocktail: {
      strDrinkThumb,
      strDrink,
      idDrink }, index } = this.props;
    return (
      <div>
        <div data-testid={ `${index}-recipe-card` }>{ idDrink }</div>
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
      </div>
    );
  }
}

CocktailCard.propTypes = {
  cocktail: PropTypes.shape({
    idDrink: PropTypes.number.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CocktailCard;
