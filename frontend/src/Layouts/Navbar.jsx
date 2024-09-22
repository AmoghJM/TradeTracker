import React, { useContext, useState } from 'react';
import RegistrationForm from '../Components/RegistrationForm';
import LoginForm from '../Components/LoginForm';
import { AuthContext } from '../Contexts/AuthContext';
import TradeWarning from './TradeWarning';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [navbarDropped, setNavbarDropped] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const toggleNavbar = () => {
    setNavbarDropped(!navbarDropped);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setShowRegistrationForm(true);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowLoginForm(true);
  };

  const closeRegisterForm = () => {
    setShowRegistrationForm(false);
  };

  const closeLoginForm = () => {
    console.log("Close login form is called")
    setShowLoginForm(false);
    navigate('/LandingPage');
  };

  const handleLogoutClick = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/LandingPage'); 
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success justify-content-center">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Trade Tracker</a>
          <button className="navbar-toggler" type="button" onClick={toggleNavbar} data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/LandingPage">Learn</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/ProfitLoss">Portfolio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/TradingJournal">Trading Journal</a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleLoginClick}>Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleRegisterClick}>Register</a>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={handleLogoutClick}>Logout</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {showRegistrationForm && <RegistrationForm closeRegisterForm={closeRegisterForm} />}
      {showLoginForm && <LoginForm closeLoginForm={closeLoginForm} />}
      <TradeWarning navbarDropped={navbarDropped} />
    </>
  );
}

export default Navbar;
