import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import WebLayout from './layouts/WebLayout/WebLayout';
import ProductDetail from './pages/ProductDetail';
import ProductsPage from './pages/ProductsPage';
import { ProductType } from './types';
import { delProduct, getAllProducts, updateProduct } from './api/products';
import ProductsAdmin from './pages/ProductsAdmin';
import EditProduct from './components/EditProductForm';
import SignInPage from './pages/SignInPage';
import RouterAdminPrivate from './components/PrivateRouter/RouterAdminPrivate';
import { isAuthenticated } from './utils/localstorage';

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
    const deleteSwal = withReactContent(Swal);

    deleteSwal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await delProduct(id);
            deleteSwal.fire('Deleted!', 'Product has been deleted.', 'success');
            // delete in state
            setProducts(products.filter((product) => product._id !== id));
            console.log(id);
          } catch (error) {
            deleteSwal.fire('Error!', 'Not delete product.', 'error');
          }
        }
      });
  };

  const onAddHandler = (product: ProductType) => {
    // set token api
    return true;
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
            <Route path="signin" element={<SignInPage />} />
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
              <Route
                index
                element={
                  <ProductsAdmin products={products} onRemove={removeProduct} />
                }
              />
              <Route path="add" onAdd={onAddHandler} />
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
