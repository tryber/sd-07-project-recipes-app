import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/cards';
import GlobalContext from '../context/GlobalContext';
import { FoodsDrinks } from './style';
import DrinkCategories from '../components/categories/DrinkCategories';

const { Container } = FoodsDrinks;

export default function Drinks() {
  const {
    setTitle,
    setSearchButton,
    setDataDrinks,
    dataDrinks,
  } = useContext(GlobalContext);

  const numberOfCards = 12;

  useEffect(() => {
    setTitle('Bebidas');
    setSearchButton(true);
  }, [setTitle, setSearchButton]);

  useEffect(() => {
    setDataDrinks();
  }, [setDataDrinks]);

  return (
    <Container>
      <Header />
      <DrinkCategories />
      {Cards(numberOfCards, dataDrinks)}
      <Footer />
    </Container>
  );
}
