// SigninForm.js

import React, { useState,useEffect } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SigninForm = ({handleSignin}) => {

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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


  // Check if userData is present in localStorage, then navigate to dashboard
  const checkUserData = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.isAdmin) {
      navigate('/dashboard');
    }
  };

  // Call checkUserData on component mount
  useEffect(() => {
    checkUserData();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userEmail">
            Email:
          </label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="w-full p-2 border rounded"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            type="button"
            onClick={(e)=>{handleSignin(userEmail,password)}}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <button
            className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
            type="button"
            onClick={() => {
              console.log('Change Password clicked');
            }}
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;

