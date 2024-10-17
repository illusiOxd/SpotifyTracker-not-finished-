// src/Header.js
import React from 'react';
import '../component styles/Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">Spotify tracker</div>
            <nav className="nav">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    );
}

export default Header;
