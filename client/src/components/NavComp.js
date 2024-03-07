import React, { useEffect, useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function NavComp() {
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', { credentials: 'include' }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    });
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout",
      {
        credentials: 'include',
        method: 'POST',
      }).then(() => {
        setUserInfo(null);
        navigate('/');
      });
  };
  const email = userInfo ? userInfo.email : false;
  const userName = userInfo ? `Hello, ${userInfo.email}` : "Welcome";

  return (
    <main>
      <header>
        <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">My Blog</Link>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {email && (
                  <>
                    {/* Notification Bell & User Greeting next to the Create Blog link */}
                    {/* Uncomment and use the following line if you have FontAwesome installed */}
                    <li className="nav-item">
                      <a className="nav-link">
                        <FontAwesomeIcon icon={faBell} />
                      </a>
                    </li>
                    <li className="nav-item">
                      <span className="nav-link">{userName}</span>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/create'>Create Blog</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={logout}>Logout</Link>
                    </li>
                  </>
                )}
                {!email && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </main>
  );
}

export default NavComp;
