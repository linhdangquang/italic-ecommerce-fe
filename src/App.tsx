import React from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import AdminLayout from './pages/layouts/AdminLayout';
import WebLayout from './pages/layouts/WebLayout';
import ProductDetail from './pages/ProductDetail';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <div className="mx-auto">
      <main>
        <Routes>
          <Route path="/" element={<WebLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<h1>DASHBOARD</h1>} />
          </Route>
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
