import React from 'react';
import Navbar from './components/SharePage/Navbar';
import Hero from './components/SharePage/Hero';
import ShowProducts from './components/Pages/HomePage/ShowProducts';
import ExportedCountries from './components/Pages/HomePage/ExportedCountries';
import Footer from './components/SharePage/Footer';
import RegisterSystem from './components/Pages/HomePage/RegisterSystem';
import { RouterProvider } from 'react-router-dom';
import { routes } from './components/Routes/Routes/Routes';




function App() {
  return (
    <div>
<RouterProvider router={routes}>

</RouterProvider>
    </div>
  );
}

export default App;
