import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <div className="mx-auto">
      <div className="flex items-center justify-center bg-gradient-to-r from-pink-400 to-rose-400">
        <nav>
          <ul className="flex">
            <NavLink
              className="navLink mx-1 py-4 px-4 text-lg  font-semibold text-white hover:bg-white hover:text-black"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="navLink mx-1 py-4 px-4 text-lg font-semibold text-white  hover:bg-white hover:text-black"
              to="/products"
            >
              Products
            </NavLink>
            <NavLink
              className="navLink mx-1 py-4 px-4 text-lg font-semibold text-white  hover:bg-white hover:text-black"
              to="/about"
            >
              About
            </NavLink>
          </ul>
        </nav>
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
