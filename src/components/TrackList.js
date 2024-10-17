// src/TrackList.js
import React from "react";

function TrackList({ tracks }) {
    const formatDuration = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="tracks">
            {tracks && Array.isArray(tracks) && tracks.length > 0 ? (
                tracks.map((trackData, index) => {
                    const track = trackData.track;
                    const playedAt = formatDuration(track.duration_ms);

                    return (
                        <div key={index} className="track">
                            <div className="image-container">
                                <img src={track.album.images[0].url} alt={track.name} />
                                <div className="time-overlay">{playedAt}</div>
                                <div className="text-overlay">
                                    <h2>{track.name}</h2>
                                    <p>{track.artists.map(artist => artist.name).join(", ")}</p>
                                    <p>{track.album.name}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>No tracks available. Please try logging in again.</p>
            )}
        </div>
    );
}

export default TrackList;
