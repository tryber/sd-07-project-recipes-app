import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import geral from '../data';
import GlobalContext from './GlobalContext';

export default function GlobalProvider({ children }) {
  const [title, setTitle] = useState('');
  const [searchButton, setSearchButton] = useState(true);
  const [searchBar, setSearchBar] = useState(false);
  // const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState(geral);
  const {
    initialState: { email, password },
    initialFoods: { dataFoods },
    initialDrinks: { dataDrinks },
  } = state;

  const updateState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const history = useHistory();

  const redirect = (path) => {
    history.push({ pathname: path });
  };

  return (
    <GlobalContext.Provider
      value={ {
        redirect,
        title,
        searchButton,
        setSearchButton,
        searchBar,
        setSearchBar,
        dataFoods,
        dataDrinks,
        setTitle,
        setDataFoods: (value) => {
          const newInitialFoods = state.initialFoods;
          newInitialFoods.dataFoods = value;
          updateState('initialFoods', newInitialFoods);
        },
        setDataDrinks: (value) => {
          const newInitialDrinks = state.initialDrinks;
          newInitialDrinks.dataDrinks = value;
          updateState('initialDrinks', newInitialDrinks);
        },
        email,
        password,
        setEmail: (text) => {
          const newInitialEmail = state.initialState;
          newInitialEmail.email = text;
          updateState('email', newInitialEmail);
        },
        setPassword: (text) => {
          const newInititalPassword = state.initialState;
          newInititalPassword.password = text;
          updateState('password', newInititalPassword);
        },
      } }
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
