// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../component styles/Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">Spotify Tracker</div>
            <nav className="nav">
                <Link to="/">Home</Link>
                <Link to="/recommended">Tracks for You</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
}

export default Header;
