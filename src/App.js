// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import ViewCartPage from "./pages/ViewCartPage";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import RegisterPage from "./pages/RegisterPage";
import OrderSummary from "./components/OrderSummary";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/Profile";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn] = useState(false);

  // Add item to cart (uses _id – safe and reliable)
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Decrease quantity or remove item
  const removeFromCart = (itemId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Get quantity of a specific item
  const getQuantity = (itemId) => {
    const item = cartItems.find((i) => i._id === itemId);
    return item ? item.quantity : 0;
  };

  // Total items in cart (for Navbar badge)
  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Total price
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar with live cart count */}
        <Navbar cartCount={totalCartItems} />

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Menu Page – Zombo Style */}
          <Route
            path="/menu"
            element={
              <MenuPage
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                getQuantity={getQuantity}
                cartItems={cartItems}
              />
            }
          />

          {/* View Cart Page – Beautiful & Functional */}
          <Route
            path="/view-cart"
            element={
              <ViewCartPage
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                addToCart={addToCart} // For + button in cart
                calculateTotal={calculateTotal}
                isLoggedIn={isLoggedIn}
              />
            }
          />

          <Route path="/order" element={<OrderPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/ordershistory" element={<OrderSummary />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
