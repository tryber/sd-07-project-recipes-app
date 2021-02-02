import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';

import { titleHeaderNames, useTitleContext } from '../context/TitleContext';

function Profile() {
  const { setHeaderName } = useTitleContext();

  const eraseLocalStorage = () => {
    localStorage.clear();
    setHeaderName(titleHeaderNames.login);
  };

  const profileElements = () => {
    let email = JSON.parse(localStorage.getItem('user'));
    if (email === null) email = 'E-mail não informado!';

    return (
      <div className="profile-buttons">
        <h3
          className="email-perfil"
          data-testid="profile-email"
        >
          {email === 'E-mail não informado!' ? email : email.email}
        </h3>
        <Link
          to="/receitas-feitas"
          onClick={ () => setHeaderName(titleHeaderNames.receitasfeitas) }
        >
          <button
            className="button-list"
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link
          to="/receitas-favoritas"
          onClick={ () => setHeaderName(titleHeaderNames.receitasfavoritas) }
        >
          <button
            className="button-list"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            className="button-list"
            type="button"
            onClick={ () => eraseLocalStorage() }
            data-testid="profile-logout-btn"
          >
            Sair
          </button>
        </Link>
        <Footer />
      </div>
    );
  };

  return (profileElements());
}

export default Profile;
