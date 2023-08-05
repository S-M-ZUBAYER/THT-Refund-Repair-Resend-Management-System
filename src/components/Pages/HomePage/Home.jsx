import React from 'react';
import ShowProducts from './ShowProducts';
import RegisterSystem from './RegisterSystem';
import ExportedCountries from './ExportedCountries';

const Home = () => {
  return (
    <div>
      <ShowProducts />
      <ExportedCountries />

    </div>
  );
};

export default Home;