import React, { useState, useEffect } from 'react';

import StyledCard from './styles';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';

const RecipeDoneFavCard = (props) => {
  const [propsState, setpropsState] = useState(props);

  useEffect(() => {
    setpropsState(props);
  }, [props]);

  const { doneOrFavorite, cardInfo, index } = propsState;
  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
    tags,
    doneDate,
  } = cardInfo;
  const START_TAG = 0;
  const END_TAG = 2;
  return (
    <StyledCard data-testid={ `${index}-recipe-card` }>
      <StyledCard.Img
        variant="top"
        src={ image }
        data-testid={ `${index}-horizontal-image` }
      />
      <StyledCard.Body>
        <StyledCard.Text data-testid={ `${index}-horizontal-top-text` }>
          {type === 'comida'
            ? `${area} - ${category}` : alcoholicOrNot}
        </StyledCard.Text>
        {doneOrFavorite === 'done'
        && (<ShareButton
          dataTestId={ `${index}-horizontal-share-btn` }
          recipeId={ id }
          type={ type === 'comida' ? 'comidas' : 'bebidas' }
        />)}
        <StyledCard.Title
          data-testid={ `${index}-horizontal-name` }
        >
          {name}
        </StyledCard.Title>
        {doneOrFavorite === 'done'
        && (
          <StyledCard.Text data-testid={ `${index}-horizontal-done-date` }>
            { `Feita em: ${doneDate}` }
          </StyledCard.Text>)}
      </StyledCard.Body>
      {doneOrFavorite === 'done'
        && (
          <StyledCard.Body>
            { tags
              && tags.slice(START_TAG, END_TAG).map(
                (tag) => (
                  <span
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {`${tag}`}
                  </span>
                ),
              )}
          </StyledCard.Body>
        )}
      {doneOrFavorite === 'favorite'
        && (
          <StyledCard.Body>
            <ShareButton
              dataTestId={ `${index}-horizontal-share-btn` }
              recipeId={ id }
              type={ type === 'comida' ? 'comidas' : 'bebidas' }
            />
            <FavoriteButton
              recipeId={ id }
              dataTestId={ `${index}-horizontal-favorite-btn` }
            />
          </StyledCard.Body>
        )}
    </StyledCard>
  );
};

export default RecipeDoneFavCard;
