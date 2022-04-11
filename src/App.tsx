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
import ProductsByCategory from './components/ProductsByCategory';
import { ScrollToTop } from './utils/ScrollToTop';
import UsersAdmin from './pages/UsersAdmin';
import Cart from './components/Cart/Cart';
import BannerAdmin from './pages/BannerAdmin';
import AddBannerForm from './components/Banner/AddBannerForm';
import UpdateBannerForm from './components/Banner/UpdateBannerForm';
import HomeDash from './pages/HomeDash';
import ProfilePage from './pages/ProfilePage';
import CheckoutForm from './components/Checkout/CheckoutForm';
import OrderList from './components/Order/OrderList';

function App() {
  return (
    <div className="mx-auto">
      <main>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<WebLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="categories/:id" element={<ProductsByCategory />} />
              <Route path="cart" element={<Cart />} />
              <Route path="cart/checkout" element={<CheckoutForm />} />
              <Route path="profile" element={<ProfilePage />} />
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
              <Route path="dashboard" element={<HomeDash />} />
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
              <Route path="banners">
                <Route index element={<BannerAdmin />} />
                <Route path="add" element={<AddBannerForm />} />
                <Route path=":id/edit" element={<UpdateBannerForm />} />
              </Route>
              <Route path="users">
                <Route index element={<UsersAdmin />} />
              </Route>
              <Route path="orders">
                <Route index element={<OrderList />} />
              </Route>
            </Route>
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </ScrollToTop>
      </main>
      <ToastContainer autoClose={2500} limit={5} />
    </div>
  );
}

export default App;
