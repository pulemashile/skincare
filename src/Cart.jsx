import React, { useEffect, useState } from 'react';
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

const API_URL = 'http://localhost:5000';

export default function Homepage() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const products = [
    {
      id: '1',
      name: 'Ponds',
      price: 30.00,
      imageUrl: water,
      discountPrice: 24.33,
    },
    {
      id: '2',
      name: 'Gentle Magic',
      price: 30.00,
      imageUrl: bright,
      discountPrice: 24.33,
    },
    {
      id: '3',
      name: 'Green Product',
      price: 30.00,
      imageUrl: green,
      discountPrice: 24.33,
    },
    {
      id: '4',
      name: 'Face Product',
      price: 30.00,
      imageUrl: face,
      discountPrice: 24.33,
    }
  ];

  const addToCart = async (product) => {
    try {
      const existingItemIndex = cartItems.findIndex(item => item.productId === product.id);
      
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += 1; // Increase quantity
        setCartItems(updatedCartItems);
        toast.success(`Increased quantity of ${product.name} in cart!`);
      } else {
        const response = await fetch(`${API_URL}/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1, // Initial quantity
          }),
        });
        const newItem = await response.json();
        setCartItems(prev => [...prev, { ...newItem, quantity: 1 }]);
        toast.success(`${newItem.name} added to cart!`);
      }
    } catch (error) {
      console.error('Error adding item to cart: ', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${API_URL}/cart`);
      const items = await response.json();
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items: ', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await fetch(`${API_URL}/cart/${cartItemId}`, {
        method: 'DELETE',
      });
      toast.error('Item removed from cart');
      setCartItems(prev => prev.filter(item => item.id !== cartItemId)); // Update state after deletion
    } catch (error) {
      console.error('Error removing item from cart: ', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <nav className="flex justify-between items-center p-4 bg-white shadow">
        <div className="text-xl font-bold flex items-center">
          <RiFlowerFill className="mr-2" />
          Radience Bloom™
        </div>
        <div className="flex space-x-4 items-center">
          <Link to="/register" className="text-muted-foreground">Register</Link>
          <Link to="/login" className="text-muted-foreground">Login</Link>
          <button onClick={() => setIsCartOpen(true)} className="text-muted-foreground">
            <RiShoppingCartFill />
            {cartItems.length > 0 && (
              <span className="bg-red-500 text-white rounded-full px-2 ml-1 text-sm">
                {cartItems.length}
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

      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Browse our products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-card p-4 rounded-lg shadow">
              <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-muted-foreground">${product.price}</p>
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => addToCart(product)} 
                  className="bg-[#B692C2] text-primary-foreground p-2 rounded-full w-[20rem] flex items-center justify-center">
                  Add to Cart
                  <RiArrowRightCircleFill className="ml-16" />
                </button>
                <button className="bg-[black] text-secondary-foreground p-2 rounded-full text-white">
                  ${product.discountPrice}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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

      <footer className="bg-zinc-800 text-white p-4 text-center">
        <p>&copy; 2024 Skincare Brand. All rights reserved.</p>
      </footer>

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
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-muted-foreground">${item.price} x {item.quantity}</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                      <RiCloseCircleFill />
                    </button>
                  </div>
                ))}
                <div className="mt-4 font-semibold">
                  Total: ${totalPrice.toFixed(2)}
                </div>
              </div>
            )}
            <button 
              onClick={() => setIsCartOpen(false)} 
              className="mt-4 bg-[#B692C2] text-primary-foreground p-2 rounded-full">
              Close
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
