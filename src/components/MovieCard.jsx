import React from 'react';
import { Link } from 'react-router-dom';


function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <Link to={`/details/${movie.id}`}>View Details</Link>
        </div>
    );
}

export default MovieCard;
