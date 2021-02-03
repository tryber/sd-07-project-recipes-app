import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DrinkPage from './Pages/DrinkPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import ExplorarPage from './Pages/ExplorarPage';
import PerfilPage from './Pages/PerfilPage';
import ComidaDetailPage from './Pages/FoodDetailPage';
import BebidaDetailPage from './Pages/DrinkDetailPage';
import ProgressComidaPage from './Pages/ProgressFoodPage';
import ProgressBebidaPage from './Pages/ProgressBebidasPage';
import ExplorarComidas from './Pages/ExploreFoodPage';
import ExplorarBebidas from './Pages/ExploreDrinkPage';
import ComidasIngredientes from './Pages/FoodIngredientsPage';
import BebidasIngredientes from './Pages/DrinksIngredientsPage';
import ComidaArea from './Pages/FoodAreaPage';
import ReceitaFeitas from './Pages/ RecipesMadePage';
import ReceitaFavorita from './Pages/RecipesFavoritesPage';
import NotFound from './Pages/NotFoundPage';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route exact path="/comidas" component={ HomePage } />
      <Route exact path="/bebidas" component={ DrinkPage } />
      <Route exact path="/explorar" component={ ExplorarPage } />
      <Route exact path="/perfil" component={ PerfilPage } />
      <Route exact path="/comidas/:idreceita" component={ ComidaDetailPage } />
      <Route exact path="/bebidas/:idreceita" component={ BebidaDetailPage } />
      <Route
        exact
        path="/comidas/:idreceita/in-progress"
        component={ ProgressComidaPage }
      />
      <Route
        exact
        path="/bebidas/:idreceita/in-progress"
        component={ ProgressBebidaPage }
      />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ComidasIngredientes }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ BebidasIngredientes }
      />
      <Route exact path="/explorar/comidas/area" component={ ComidaArea } />
      <Route exact path="/receitas-feitas" component={ ReceitaFeitas } />
      <Route exact path="/receitas-favoritas" component={ ReceitaFavorita } />
      <Route component={ NotFound } />
    </Switch>
  </BrowserRouter>
);

export default Routes;
