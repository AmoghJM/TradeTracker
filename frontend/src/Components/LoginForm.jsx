import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Contexts/AuthContext';

const LoginForm = ({ closeLoginForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tradetracker-rq6i.onrender.com/login', { email, password });
      if (response.data === 'Login successful') {
        setIsAuthenticated(true);
        setMessage('Login successful');
        closeLoginForm();
      } else {
        setMessage("Login failed");
      }
    } catch (error) {
      setMessage('Error in login');
      console.error('Error in login', error);
    }
  };

  const handleClose = () => {
    closeLoginForm(); 
  };

  return (
    <div style={formContainerStyle} className="d-flex align-items-center justify-content-center">
      <div className="card p-4" style={formStyle}>
        <h2 className="card-title text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group row mb-2">
            <label htmlFor="email" className="col-sm-3 col-form-label">Email:</label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='name@gmail.com'
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-4 col-form-label">Password:</label>
            <div className="col-sm-8">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='********'
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success btn-block mt-3">Login</button>
        </form>
        <button type="button" onClick={handleClose} className="btn btn-secondary btn-block mt-3">Close</button>
        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
};

const formContainerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  width: '100%',
  height: '100%',
  zIndex: 1000
};

const formStyle = {
  width: '400px',
  textAlign: 'center',
  borderRadius: '10px',
};

export default LoginForm;
