import React from 'react';
import Navbar from './components/SharePage/Navbar';
import Hero from './components/SharePage/Hero';
import ShowProducts from './components/Pages/HomePage/ShowProducts';
import ExportedCountries from './components/Pages/HomePage/ExportedCountries';
import Footer from './components/SharePage/Footer';
import RegisterSystem from './components/Pages/HomePage/RegisterSystem';
import { RouterProvider } from 'react-router-dom';
import { routes } from './components/Routes/Routes/Routes';
// import Carousel from './components/SharePage/Carousel';
// import Footer from './components/SharePage/Footer';
// import Hero from './components/SharePage/Hero';
// import Navbar from './components/SharePage/Navbar';
// import RegisterSystem from './components/RegisterSystem';
// import ShowProducts from './components/ShowProducts';
// import ExportedCountries from './components/ExportedCountries';



function App() {
  return (
    <div>
<RouterProvider router={routes}>

</RouterProvider>

      {/* <Navbar />
      <Hero />
      <ShowProducts />
      <RegisterSystem />
      <ExportedCountries />
      <Footer /> */}
    </div>
  );
}

export default App;
