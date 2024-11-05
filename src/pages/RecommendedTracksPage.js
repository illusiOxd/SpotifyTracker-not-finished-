import React, { useState, useEffect } from "react";
import RecommendedTracks from "../components/RecommendedTracks";

function RecommendedTracksPage() {
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [token, setToken] = useState("");

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
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setRecommendedTracks(data.items);
        })
        .catch((error) => console.error("Error fetching tracks:", error));
    }
  }, [token]);

  return (
    <div>
      <h1>Recommended Tracks</h1>
      {!token ? (
        <a
          href={`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}&scope=user-read-recently-played`}
        >
          Login to Spotify
        </a>
      ) : (
        <RecommendedTracks tracks={recommendedTracks} />
      )}
    </div>
  );
}

export default RecommendedTracksPage;