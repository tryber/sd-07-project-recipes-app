import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <div>
        <Link to="/bebidas">
          <img
            src={ drinkIcon }
            data-testid="drinks-bottom-btn"
            alt="Ícone de bebida"
          />
        </Link>
      </div>
      <div>
        <Link to="/explorar">
          <img
            src={ exploreIcon }
            data-testid="explore-bottom-btn"
            alt="Ícone explorar"
          />
        </Link>
      </div>
      <div>
        <Link to="/comidas">
          <img
            src={ mealIcon }
            data-testid="food-bottom-btn"
            alt="Ícone de comida"
          />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
