import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import AdminLayout from './pages/layouts/AdminLayout';
import WebLayout from './pages/layouts/WebLayout';
import ProductDetail from './pages/ProductDetail';
import ProductsPage from './pages/ProductsPage';
import { ProductType } from './types';
import { delProduct, getAllProducts, updateProduct } from './api/products';
import ProductsAdmin from './pages/ProductsAdmin';
import EditProduct from './pages/EditProduct';
import PrivateRouter from './components/PrivateRouter';

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

  const onEditHandler = async (product: ProductType) => {
    const { data } = await updateProduct(product);
    console.log(data);
    setProducts(
      products.map((product) => (product._id === data._id ? data : product))
    );
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
          <Route
            path="admin"
            element={
              <PrivateRouter>
                <AdminLayout />
              </PrivateRouter>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<h1>DASHBOARD</h1>} />
            <Route path="products">
              <Route
                index
                element={
                  <ProductsAdmin products={products} onRemove={removeProduct} />
                }
              />
              <Route
                path=":id/edit"
                element={<EditProduct onEdit={onEditHandler} />}
              />
            </Route>
          </Route>
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
