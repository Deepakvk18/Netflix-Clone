import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Checkout() {

  const query = new URLSearchParams(window.location.search);
  const [message, setMessage] = useState("Processing your order...")

  const navigate = useNavigate();

  useEffect(() => {
    if (query.get('success')) {
      setMessage("Order placed! You will receive an email confirmation.")
    }
  
    if (query.get('canceled')) {
      setMessage("Order canceled -- checkout when you're ready." );
    }
  }, [])

  setTimeout(() => {
    navigate('/browse')
  }, 5000);  

  return (
    <section className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
        <div className="mb-4">
          <div className="animate-spin rounded-full border-t-4 border-b-4 border-white h-12 w-12"></div>
        </div>
          <p className="text-2xl mb-4">{message}</p>
          <p className="text-lg">Redirecting you to the home page</p>
    </section>
  )
}
