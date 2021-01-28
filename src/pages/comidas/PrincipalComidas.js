import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import { loadRecipes } from '../../redux/action';
import Footer from '../../components/footer';

class PrincipalComidas extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { setlocal } = this.props;
    setlocal('comidas');
  }

  handleClick(valor) {
    const { history } = this.props;
    history.push(`/comidas/${valor}`);
  }

  Meals() {
    const { history, receitas } = this.props;
    let controlealert = false;
    if (receitas.meals || receitas.meals === null) {
      if (receitas.meals === null && !controlealert) {
        controlealert = true;
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (receitas.meals.length === 1 && receitas.redirect) {
        const id = receitas.meals[0].idMeal;
        history.push(`/comidas/${id}`);
      } else {
        return (receitas.meals.map((receita, index) => {
          const limit = 12;
          if (index < limit) {
            return (
              <button
                className="card"
                name={ receita.idMeal }
                type="button"
                onClick={ ({ target }) => this.handleClick(target.name) }
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="card"
                  name={ receita.idMeal }
                  data-testid={ `${index}-card-img` }
                  src={ receita.strMealThumb }
                  alt="imagem da receita"
                />
                <h1
                  className="card"
                  name={ receita.idMeal }
                  data-testid={ `${index}-card-name` }
                >
                  {receita.strMeal}
                </h1>
              </button>
            );
          }
          return null;
        }));
      }
    }
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header title="Comidas" searchOn="on" history={ history } />
        {
          this.Meals()
        }
        <Footer history={ history } />
      </div>
    );
  }
}

PrincipalComidas.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
  setlocal: PropTypes.func.isRequired,
  receitas: PropTypes.objectOf().isRequired,
};

const mapStateToProps = (state) => ({
  receitas: state.fastFood.receitas,
});

const mapDispatchToProps = (dispatch) => ({
  setlocal: (tipo) => dispatch(loadRecipes(tipo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrincipalComidas);
