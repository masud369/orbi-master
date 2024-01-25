// AuthPage.js

import React, { useState } from 'react';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

const AuthPage = ({handleSignin}) => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{isSignup ? 'Signup' : 'Signin'}</h2>
      
      {isSignup ? <SignupForm /> : <SigninForm handleSignin={handleSignin}/>}

      <p className="mt-4">
        {isSignup ? 'Already have an account? ' : 'Don\'t have an account? '}
        <button onClick={toggleForm} className="text-blue-500">
          {isSignup ? 'Signin' : 'Signup'}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
