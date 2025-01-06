import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProductList from './pages/admin/products/ProductList';
import CreateProduct from './pages/admin/products/CreateProduct';
import EditProduct from './pages/admin/products/EditProduct';
import ProductDetails from './pages/ProductDetails';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import { UserCredentials } from './types';
import { AdminRoute, AuthenticatedUserRoute } from './components/Authorization';
import UserProfile from './pages/UserProfile';
import UserList from './pages/admin/users/UserList';
import UserDetails from './components/UserDetails';
import UserDetailsAdmin from './pages/admin/users/UserDetailsAdmin';

function App() {
  const getStoredCredentials = () => {
    let data = localStorage.getItem('credentials');
    if (data) {
      let json = JSON.parse(data);
      return json;
    }
    return null;
  };

  const [userCredentials, setUserCredentials] =
    useState<UserCredentials | null>(getStoredCredentials());

  useEffect(() => {
    let str = JSON.stringify(userCredentials);
    localStorage.setItem('credentials', str);
  }, [userCredentials]);

  return (
    <AppContext.Provider value={{ userCredentials, setUserCredentials }}>
      <>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route
              path="/profile"
              element={
                <AuthenticatedUserRoute>
                  <UserProfile />
                </AuthenticatedUserRoute>
              }
            />

            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <ProductList />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/create"
              element={
                <AdminRoute>
                  <CreateProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/edit/:id"
              element={
                <AdminRoute>
                  <EditProduct />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UserList />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users/details/:id"
              element={
                <AdminRoute>
                  <UserDetailsAdmin />
                </AdminRoute>
              }
            />

            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
    </AppContext.Provider>
  );
}

export default App;
