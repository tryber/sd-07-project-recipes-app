import React, { useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function DrinkDetails(props) {
  const {
    fetchMealId,
    isFetching,
    mealDescription: { drinks },
  } = useContext(RecipesContext);

  useEffect(() => {
    const { id } = props.match.params;
    fetchMealId(id);
  }, []);

  const listIgredient = () => {
    const list = [];
    const mealsReceived = drinks[0];
    const zero = 0;

    for (let index = zero; mealsReceived[`strIngredient${index}`] !== null; index += 1) {
      list.push(`${mealsReceived[`strIngredient${index}`]}`);
    }
    return list;
  };

  if (isFetching || drinks === undefined) return <span>Carregando...</span>;

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt="Imagem da receita"
        src={ drinks[0].strDrinkThumb }
      />
      <p data-testid="recipe-title">{drinks[0].strDrink}</p>
      <div>
        <button data-testid="share-btn" type="button">Compartilhar</button>
        <button data-testid="favorite-btn" type="button">Favoritar</button>
        <p data-testid="recipe-category">{drinks[0].strCategory}</p>
        <ol className="list-ingredients">
          {listIgredient().map((content, index) => (
            <li
              key={ index }
              data-testid={ `${index + 1}-ingredient-name-and-measure` }
            >
              {content}
            </li>
          ))}
        </ol>
        <p data-testid="instructions">
          {drinks[0].strInstructions}
        </p>
        <iframe
          data-testid="video"
          title={ drinks[0].strDrink }
          id="ytplayer"
          type="text/html"
          width="640"
          height="360"
          src={ drinks[0].strYoutube }
          frameBorder="0"
        />
      </div>
    </div>
  );
}
