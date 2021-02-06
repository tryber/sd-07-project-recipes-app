import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header, Footer } from '../components';

export default function FoodExplore() {
  const { push } = useHistory();
  return (
    <div>
      <Header title="Explorar Comidas" search={ false } />
      <Button
        testid="explore-by-ingredient"
        text="Por Ingredientes"
        func={ () => { push('/explorar/comidas/ingredientes'); } }
      />
      <Button
        testid="explore-by-area"
        text="Por Local de Origem"
        func={ () => { push('/explorar/comidas/area'); } }
      />
      <Button
        testid="explore-surprise"
        text="Me Surpreenda!"
        func={ () => { push('/comidas/random'); } }
      />
      <Footer />
    </div>
  );
}
