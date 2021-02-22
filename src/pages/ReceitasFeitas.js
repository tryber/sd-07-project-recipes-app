import React from 'react';
import Header from '../components/Header';
import Completed from '../components/Completed';

function ReceitasFeitas() {
  return (
    <div>
      <Header title="Receitas Feitas" hideSearchIcon="true" />
      <div>
        <Completed />
      </div>
    </div>
  );
}

export default ReceitasFeitas;
