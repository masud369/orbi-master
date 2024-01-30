// ChangePasswordForm.js

import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async () => {
    try {
      // Call the backend API to change the password
      const response = await axios.post('https://orbi-master-api.onrender.com/change-password', {
        userEmail,
        oldPassword,
        newPassword,
      });

      // Handle the response from the API
      console.log(response.data.message); // You can use this message for feedback to the user

      // Optionally, you can call the prop function to notify the parent component
      // handleChangePassword(userEmail, oldPassword, newPassword);
    } catch (error) {
      // Handle errors from the API
      console.error('Error changing password:', error.response ? error.response.data : error.message);
    }
  };


  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
            Old Password:
          </label>
          <input
            className="w-full p-2 border rounded"
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            New Password:
          </label>
          <input
            className="w-full p-2 border rounded"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          type="button"
          onClick={handleSubmit}
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
