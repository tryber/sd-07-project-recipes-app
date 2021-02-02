import React from 'react';
import PropTypes from 'prop-types';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
// import setEmailLocalStorage from '../services';

function Profile(props) {
  const goDoneRecipes = () => props.history.push('/receitas-feitas');
  const goFavoriteRecipes = () => props.history.push('/receitas-favoritas');
  const goLogin = () => props.history.push('/');
  return (
    <div>
      <HeaderNoSearch title="Profile" />
      <Footer />
      <div>
        <section
          type="email"
          id="email"
          data-testid="profile-email"
        />
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => goDoneRecipes() }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => goFavoriteRecipes() }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => goLogin() }
        >
          Sair
        </button>
      </div>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Profile;
