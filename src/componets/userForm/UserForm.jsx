import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserForm.css';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email };
    console.log('User Data:', userData);


    localStorage.setItem('userData', JSON.stringify(userData));
    
    setShowPopup(true);
    setTimeout(() => {
      navigate('/home'); 
    }, 2000); 
  };

  return (
    <div className="form-container">
      {showPopup && (
        <div className="popup">
          <h2>Thank you for submitting your details!</h2>
        </div>
      )}
      
      <h1>Enter Your Details</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
