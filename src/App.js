import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import AuthPage from "./pages/Journal/AuthPage";
import AddProductForm from "./pages/Dashbord/AddProductForm";
import ChangePasswordForm from "./pages/Journal/ChangePasswordForm";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

const App = () => {
  const [admin, setAdmin] = useState(false);
const toastStyle = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastStyle: { backgroundColor: '#ff0000', color: '#ffffff' },
    bodyStyle: { fontSize: '16px' },
  };
const checkUserData = () => {
    const userData = localStorage.getItem('userData');
      if (userData) {
        console.log(userData);
      setAdmin(true);
    } else {
      // Logic when userData does not exist
      setAdmin(false);
    }
  };

  const handleSignin = async (userEmail, password) => {
    try {
      const response = await axios.post('https://orbi-master-api.onrender.com/signin', {
        userEmail,
        password,
      });

      if (response.data.userData.isAdmin) {
        // Set user data in localStorage
        localStorage.setItem('userData', JSON.stringify(response.data.userData));
        await checkUserData();
      } else {
        // Display toast message if user is not an admin
        toast.error('You are not authorized. Make sure you are an admin.', toastStyle);
      }
    } catch (error) {
      console.error('Error signing in:', error.response ? error.response.data : error.message);
      // Display error message using toast
      toast.error('Error signing in. Please check your credentials.', toastStyle);
    }
  };
  


  return (
    <div className="font-bodyFont">
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route>
              <Route
                path="/"
                element={
                  <Layout/>
                }
              >
                <Route index element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/account" element={<AuthPage handleSignin={handleSignin} />} />
                <Route
                  path="/dashboard"
                  element={admin? <AddProductForm checkUserData={checkUserData}/>:<Cart /> }
                />
                <Route path="/offer" element={<Offer />} />
                <Route
                  path="/product/:_id"
                  element={<ProductDetails />}
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/changePassword" element={<ChangePasswordForm />} />
                <Route path="/paymentgateway" element={<Payment />} />
                
              </Route>
              
            </Route>
          )
        )}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
