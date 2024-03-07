import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setUserInfo} = useContext(UserContext);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(process.env.REACT_APP_API_SERVER);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUserInfo(data);
        navigate('/');
      } else {
        throw new Error(data.message || 'An error occurred during login');
      }
    } catch (error) {
      console.error('Login Failed:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username or Email</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
