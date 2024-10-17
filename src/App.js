// src/App.js
import React, { useState, useEffect } from "react";
import TrackList from "./components/TrackList";
import "./App.css";
import Header from "./components/Header";

const CLIENT_ID = "fa3e30cb0fc64e24baa4aaa2dfc63264";
const REDIRECT_URI = "http://localhost:3001";
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

        {/* Используем компонент TrackList и передаем ему данные */}
        <TrackList tracks={tracks} />
      </div>
  );
}

export default App;
