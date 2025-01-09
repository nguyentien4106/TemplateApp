// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

function Home() {
  return (
    <div className="home-container">
      <header>
        <nav className="navbar">
          <ul>
            <li><Link to="/about">About</Link></li>
            <li>
              <Link to='/sign-in' className="login-button">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Welcome to our website!</h1>
        <p>This is the home page.</p>
      </main>
    </div>
  );
}

export default Home;