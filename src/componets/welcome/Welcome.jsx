import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import pana from '../../assets/pana.png';

const Welcome = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/form');
  };

  return (
    <>
      <div className="welcome-container">
        <div className="welcome-left">
          <img 
            src={pana} 
            alt="Task Management" 
            className="welcome-image"
          />
        </div>
        <div className="welcome-right">
          <h1 className="welcome-text">
            Manage your Task with <span className="highlight">DayTask</span>
          </h1>
        </div>
      </div>
      <div className="welcome-button-container">
        <button className="welcome-button" onClick={handleNavigation}>
          Let's Go
          <span className="arrow-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
};

export default Welcome;
