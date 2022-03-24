import React, { useState, useEffect } from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import AdminLayout from './pages/layouts/AdminLayout';
import WebLayout from './pages/layouts/WebLayout';
import ProductDetail from './pages/ProductDetail';
import ProductsPage from './pages/ProductsPage';
import { ProductType } from './types';
import { delProduct, getAllProducts } from './api/products';
import ProductsAdmin from './pages/ProductsAdmin';

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await getAllProducts();
      setProducts(data);
    };
    getProducts();
  }, []);
  const removeProduct = (id: string) => {
    // delete in api
    // delProduct(id);

    // delete in state
    setProducts(products.filter((product) => product._id !== id));
    console.log(id);
  };
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
            <Route
              path="products"
              element={
                <ProductsAdmin products={products} onRemove={removeProduct} />
              }
            />
          </Route>
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
