import React, { useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function NavComp() {
    
  const {userInfo, setUserInfo} = useContext(UserContext); 

  useEffect(()=>{
    fetch('http://localhost:4000/profile', {credentials: 'include'}).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      })
    });
  },[]);


  const logout = () => {
    fetch("http://localhost:4000/logout",
    {
      credentials: 'include', 
      method: 'POST',
    });
    setUserInfo(null);
  };

  const email = userInfo? userInfo.email : false;
  return (
    <main>
      <header>
        <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">My Blog</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {email && (<>
                  <li className="nav-item">
                    <Link className="nav-link" to='/create'>Create Blog</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={logout}>Logout</Link>
                  </li>
                </>)}
                {!email && (<>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>)}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </main>
  );
}

export default NavComp;
