import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import MenuInferior from '../components/MenuInferior';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import RecipeFoodCard from '../components/RecipeFoodCard';
import CategoryBar from '../components/CategoryBar';
import * as Actions from '../actions/index';

function Foods({ location }) {
  const { setter } = useSelector((state) => state.user);
  const searchBarView = setter;
  const dispatch = useDispatch();

  const randomWord = () => {
    const letters = 'bcfklmprst';
    const nine = 9;
    const randomIndex = Math.round(Math.random() * nine);
    dispatch(Actions.retrievefirstLetterRecipes(letters[randomIndex]));
  };

  useEffect(() => {
    randomWord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title="Comidas" />
      {searchBarView && <SearchBar location={ location.pathname } />}
      <CategoryBar type="foods" />
      <RecipeFoodCard />
      <MenuInferior />
    </div>
  );
}

Foods.propTypes = {
  location: PropTypes.arrayOf({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Foods;
