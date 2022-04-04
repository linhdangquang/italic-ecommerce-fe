import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import WebLayout from './layouts/WebLayout/WebLayout';
import ProductDetail from './pages/ProductDetail';
import ProductsPage from './pages/ProductsPage';
import ProductsAdmin from './pages/ProductsAdmin';
import EditProduct from './components/EditProductForm';
import SignInPage from './pages/SignInPage';
import RouterAdminPrivate from './components/PrivateRouter/RouterAdminPrivate';
import 'react-toastify/dist/ReactToastify.css';
import SignUpPage from './pages/SignUpPage';
import AddProduct from './components/AddProductForm';
import CategoriesAdmin from './pages/CategoriesAdmin';
import AddCategoryForm from './components/AddCategoryForm';
import EditCategoryForm from './components/EditCategoryForm';
import DetailCategory from './components/DetailCategory';

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
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
          <Route
            path="admin"
            element={
              <RouterAdminPrivate>
                <AdminLayout />
              </RouterAdminPrivate>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<h1>DASHBOARD</h1>} />
            <Route path="products">
              <Route index element={<ProductsAdmin />} />
              <Route path="add" element={<AddProduct />} />
              <Route path=":id/edit" element={<EditProduct />} />
            </Route>
            <Route path="categories">
              <Route index element={<CategoriesAdmin />} />
              <Route path="add" element={<AddCategoryForm />} />
              <Route path=":id/edit" element={<EditCategoryForm />} />
              <Route path=":id/view" element={<DetailCategory />} />
            </Route>
          </Route>
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
      <ToastContainer autoClose={2500} limit={5} />
    </div>
  );
}

export default App;
