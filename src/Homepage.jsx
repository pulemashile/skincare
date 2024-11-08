import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import girls from './assets/girls.jpg';
import green from './assets/green.jpg';
import face from './assets/face.jpg';
import bright from './assets/bright.jpg';
import water from './assets/water.jpg';
import {
  RiFlowerFill,
  RiShoppingCartFill,
  RiArrowRightCircleFill,
  RiCloseCircleFill,
} from '@remixicon/react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:5000'; // Replace with your Node.js server URL

export default function Homepage() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const products = [
    { id: '1', name: 'Ponds', price: 30.00, imageUrl: water },
    { id: '2', name: 'Gentle Magic', price: 30.00, imageUrl: bright },
    { id: '3', name: 'Green Product', price: 30.00, imageUrl: green },
    { id: '4', name: 'Face Product', price: 30.00, imageUrl: face }
  ];

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${API_URL}/cart`);
      const items = await response.json();
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items: ', error);
    }
  };

  const addToCart = async (product) => {
    try {
      const existingItem = cartItems.find(item => item.productId === product.id);
      if (existingItem) {
        await updateCartItemQuantity(existingItem.id, existingItem.quantity + 1);
      } else {
        const response = await fetch(`${API_URL}/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
          }),
        });
        const newItem = await response.json();
        toast.success(`${newItem.name} added to cart!`);
      }
      fetchCartItems(); // Refresh cart items
    } catch (error) {
      console.error('Error adding item to cart: ', error);
    }
  };

  const updateCartItemQuantity = async (itemId, quantity) => {
    try {
      await fetch(`${API_URL}/cart/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      toast.info('Cart item quantity updated!');
      fetchCartItems(); // Refresh cart items
    } catch (error) {
      console.error('Error updating cart item quantity: ', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await fetch(`${API_URL}/cart/${cartItemId}`, { method: 'DELETE' });
      toast.error('Item removed from cart');
      fetchCartItems(); // Refresh cart items
    } catch (error) {
      console.error('Error removing item from cart: ', error);
    }
  };

  const handleApprove = async (data) => {
    try {
      await axios.post(`${API_URL}/checkout`, {
        orderId: data.orderID,
      });
      toast.success('Payment successful!');
      setCartItems([]); // Clear cart after payment
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      console.error('Error processing payment: ', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <nav className="flex justify-between items-center p-4 bg-white shadow">
        <div className="text-xl font-bold flex items-center">
          <RiFlowerFill className="mr-2" />
          Radiance Bloom™
        </div>
        <div className="flex space-x-4 items-center">
          <Link to="/register" className="text-muted-foreground">Register</Link>
          <Link to="/login" className="text-muted-foreground">Login</Link>
          <button onClick={() => setIsCartOpen(true)} className="text-muted-foreground">
            <RiShoppingCartFill />
            {cartItems.length > 0 && (
              <span className="bg-red-500 text-white rounded-full px-2 ml-1 text-sm">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${girls})` }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="flex items-center justify-center h-full text-white">
          <h1 className="text-4xl font-bold">Radiance Bloom™</h1>
        </div>
      </div>
      <div className="flex items-center gap-6 pt-4 pb-10 mb-8">
        <img src={green} alt="Highlight Image" className="w-[50rem] h-[20rem] object-cover rounded-lg shadow" />
        <p className="text-lg text-muted-foreground ml-10">
          "Radiance Bloom" stands out for its clinically tested formulations, backed by rigorous trials to ensure both safety and effectiveness...
        </p>
      </div>
      <div className="p-8 flex-grow">
        <h2 className="text-2xl font-semibold mb-4">Browse our products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-card p-4 rounded-lg shadow">
              <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-muted-foreground">${product.price}</p>
              <button 
                onClick={() => addToCart(product)} 
                className="bg-[#B692C2] text-primary-foreground p-2 rounded-full w-full flex items-center justify-center mt-4">
                Add to Cart
                <RiArrowRightCircleFill className="ml-2" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div>
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-2" />
                      <div>
                        <h3 className="text-lg">{item.name} (x{item.quantity})</h3>
                        <p className="text-muted-foreground">${item.price}</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                      <RiCloseCircleFill />
                    </button>
                  </div>
                ))}
                <h3 className="font-semibold">Total Price: ${totalPrice.toFixed(2)}</h3>
                <PayPalScriptProvider options={{ "client-id": "AXeRe_K7fdrIyOam1MSWoiHpFwGEKY1I0XNUq4oal6bOMJWfgS8qkWpCGRlaWYOU3LwIrUNJ-5D94v7-" }}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{
                          amount: {
                            value: totalPrice.toFixed(2),
                          },
                        }],
                      });
                    }}
                    onApprove={handleApprove}
                  />
                </PayPalScriptProvider>
              </div>
            )}
            <button onClick={() => setIsCartOpen(false)} className="mt-4 bg-gray-200 p-2 rounded">Close</button>
          </div>
        </div>
      )}
 <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <div className="flex items-center">
          <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
          <span className="text-muted-foreground ml-2">4 reviews</span>
        </div>
        <div className="mt-4">
          <p className="text-muted-foreground">"This product changed my skin!"</p>
        </div>
      </div>
      <footer className="bg-white p-4 shadow mt-auto">
        <div className="text-center">
          <p>&copy; 2024 Radiance Bloom™. All rights reserved.</p>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
}
