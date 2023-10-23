import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscribeMutation } from '../features/userApi';

export function Checkout() {

  const query = new URLSearchParams(window.location.search);
  const [message, setMessage] = useState("Processing your order...")
  const [subscribeMutation] = useSubscribeMutation()

  const navigate = useNavigate();

    useEffect(()=>{
      if (query.get('success')) {
      setMessage("Order placed! You will receive an email confirmation. You will be redirected to the login page shortly.")
      const priceId= query.get('plan')
      subscribeMutation(priceId)
        .unwrap()
        .then((res)=>{
          console.log(res);
        })
        .catch((error)=>{
          console.error(error);
        })
    }

    if (query.get('changed')){
      setMessage("Your plan has been changed.")
    }

    if (query.get('cancelled_subs')){
      setMessage("Your subscription has been cancelled. You can use the application till the end of the current billing period. Thank you for using Netflix Clone.")
    }
  
    if (query.get('canceled')) {
      setMessage("Order canceled -- checkout when you're ready." );
    }

  setTimeout(() => {
    navigate('/login')
  }, 5000);
    }, [])  

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
