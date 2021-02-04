import React from 'react';
import { useHistory } from 'react-router-dom';

function TelaExplorar() {

  const history = useHistory();

  return (
    <nav>
      <button
        type="button"
        data-testid="explore-food"
        onClick = {() => history.push('/explorar/comidas')}
      >
          Explorar Comidas
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick = {() => history.push('/explorar/bebidas')}
      >
          Explorar Bebidas
      </button>
    </nav>
  );
}

export default TelaExplorar;
