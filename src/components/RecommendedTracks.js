// src/components/RecommendedTracks.js
import React, { useState, useEffect } from 'react';
import '../component styles/RecommendedTracks.css';

async function fetchWebApi(endpoint, token) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
}

const topTracksIds = [
    '4Iiw8vTnD8w6RQnbyZDKT9', '51X8SlNSoOcI373rAHWmzC', '5ccPWnc8B6dYVkDvACiuYx',
    '1Hs7VY4g7MDOAcBT64ay95', '3Svbk7PnKp2hKqViRCti7S'
];

function RecommendedTracks({ token }) {
    const [recommendedTracks, setRecommendedTracks] = useState([]);
    const [lastPlayedTrackId, setLastPlayedTrackId] = useState(null);

    useEffect(() => {
        if (token) {
            const fetchRecommendations = async () => {
                const response = await fetchWebApi(
                    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`,
                    token
                );
                const recentlyPlayed = await fetchWebApi(
                    'v1/me/player/recently-played?limit=1',
                    token
                );
                const lastPlayedTrack = recentlyPlayed.items[0];
                if (lastPlayedTrack && lastPlayedTrackId !== lastPlayedTrack.track.id) {
                    setLastPlayedTrackId(lastPlayedTrack.track.id);
                    setRecommendedTracks(response.tracks || []);
                }
            };
            fetchRecommendations();
        }
    }, [token, lastPlayedTrackId]);

    return (
        <div className="recommended-tracks">
            <h2>Recommended Tracks</h2>
            <div className="tracks">
                {recommendedTracks.map((track, index) => (
                    <div className="track" key={index}>
                        <div className="image-container">
                            <img src={track.album.images[0].url} alt={track.name} />
                            <div className="time-overlay">
                                {Math.floor(track.duration_ms / 60000)}:
                                {(Math.floor(track.duration_ms / 1000) % 60).toString().padStart(2, '0')}
                            </div>
                        </div>
                        <div className="text-overlay">
                            <h2>{track.name}</h2>
                            <p>by {track.artists.map(artist => artist.name).join(', ')}</p>
                            <p>Album: {track.album.name}</p>
                            <p>Release Date: {track.album.release_date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecommendedTracks;