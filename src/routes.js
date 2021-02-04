import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  Food,
  Drink,
  Explore,
  Perfil,
  Login,
  DrinkDetails,
  FoodDetails,
  DoneRecipes,
  FoodProgress,
  DrinkProgress,
  FavoriteRecipes,
} from './pages';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Food } />
      <Route exact path="/bebidas" component={ Drink } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/bebidas/:id" component={ DrinkDetails } />
      <Route path="/comidas/:id/in-progress" component={ FoodProgress } />
      <Route path="/bebidas/:id/in-progress" component={ DrinkProgress } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ Perfil } />
    </Switch>
  </Router>
);

export default Routes;
