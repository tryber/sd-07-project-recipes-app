import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from './SearchBar';

function SearchButton() {
  const {
    setSearching,
    searching,
  } = useContext(RecipesContext);

  const handleSearchIcon = () => {
    if (searching) return setSearching(false);
    return setSearching(true);
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={ 0 }
        onKeyPress={ () => {} }
        onClick={ handleSearchIcon }
      >
        <img
          src={ searchIcon }
          alt="search-icon"
          data-testid="search-top-btn"
        />
      </div>

      { searching && <SearchBar /> }
    </div>
  );
}

export default SearchButton;
