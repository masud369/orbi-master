// SignupForm.js

import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('https://orbi-master-api.onrender.com/signup', {
        userEmail,
        password,
      });

      console.log(response.data.message);
      if(response.data.message=="User registered successfully"){
        setUserEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error('Error signing up:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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
        <button
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
          type="button"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
