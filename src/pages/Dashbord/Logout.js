import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({checkUserData}) => {
  const navigate = useNavigate();

  const logout = async () => {
    
    localStorage.removeItem('userData');
    navigate("/account");
    await checkUserData();
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Logout Page</h2>
      <button
        onClick={logout}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
