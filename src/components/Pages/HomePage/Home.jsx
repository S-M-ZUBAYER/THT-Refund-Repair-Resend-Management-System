import React from 'react';
import ShowProducts from './ShowProducts';
import RegisterSystem from './RegisterSystem';
import ExportedCountries from './ExportedCountries';

const Home = () => {
  return (
    <div>
      <ShowProducts />
      <RegisterSystem />
      <ExportedCountries />

    </div>
  );
};

export default Home;