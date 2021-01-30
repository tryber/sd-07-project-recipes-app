import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

export default class Perfil extends React.Component {
  constructor() {
    super();
    this.getEmail = this.getEmail.bind(this);
    this.logout = this.logout.bind(this);
    this.redirectFavorite = this.redirectFavorite.bind(this);
    this.redirectDone = this.redirectDone.bind(this);
  }

  getEmail() {
    const getEmail = JSON.parse(localStorage.getItem('user'));
    if (getEmail) {
      return (
        <div>{Object.values(getEmail)}</div>
      );
    }
  }

  logout() {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  }

  redirectDone() {
    const { history } = this.props;
    history.push('/receitas-feitas');
  }

  redirectFavorite() {
    const { history } = this.props;
    history.push('/receitas-favoritas');
  }

  render() {
    return (
      <div>
        <Header title="Perfil" />
        <div data-testid="profile-email">{this.getEmail()}</div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ this.redirectDone }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ this.redirectFavorite }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ this.logout }
        >
          Sair
        </button>
        <Footer />
      </div>
    );
  }
}

Perfil.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
