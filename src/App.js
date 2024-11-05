// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TrackList from "./components/TrackList";
import RecommendedTracks from "./components/RecommendedTracks";
import Header from "./components/Header";
import "./App.css";
import RecommendedTracksPage from "./pages/RecommendedTracksPage";

const CLIENT_ID = "fa3e30cb0fc64e24baa4aaa2dfc63264";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = new URLSearchParams(hash.substring(1)).get("access_token");
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);

    if (token) {
      fetch("https://api.spotify.com/v1/me/player/recently-played", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
          .then(response => response.json())
          .then(data => {
            setTracks(data.items);
          })
          .catch(error => console.error("Error fetching tracks:", error));
    }
  }, [token]);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
      <Router>
        <div className="App">
          <Header />
          <h1>Spotify Recently Played Tracks</h1>
          {!token ? (
              <a
                  href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-recently-played`}
              >
                Login to Spotify
              </a>
          ) : (
              <button onClick={logout}>Logout</button>
          )}

          <Routes>
            <Route path="/" element={<TrackList tracks={tracks} />} />
            <Route path="/recommended" element={<RecommendedTracks token={token} />} />
            <Route path="/contact" element={<div>Contact us at support@spotifytracker.com</div>} />
          </Routes>
        </div> 
      </Router>
  );
}

export default App;
