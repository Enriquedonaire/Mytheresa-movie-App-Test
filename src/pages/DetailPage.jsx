import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";

const DetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [isInWishlist, setIsInWishlist] = useState(false);

    const category = location.state?.category || "default";

    useEffect(() => {
        const fetchDetails = async () => {
            const movieDetails = await api.getItemDetails(id);
            setMovie(movieDetails);

            const wishlist = api.getWishlist();
            const exists = wishlist.some((item) => item.id === movieDetails.id);
            setIsInWishlist(exists);

            const castResponse = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
            );
            const castData = await castResponse.json();
            setCast(castData.cast.slice(0, 8));
        };

        fetchDetails();
    }, [id]);

    const handleAddToWishlist = () => {
        if (!isInWishlist) {
            api.addToWishlist(movie);
            setIsInWishlist(true);
        }
    };

    return (
        <div className={`detail-page ${category.toLowerCase()}`}>
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back
            </button>
            <div className="detail-container">
                <div className="image-area">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title || movie.name}
                    />
                </div>
                <div className="info-area">
                    <h1>{movie.title || movie.name}</h1>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Genres:</strong> {movie.genres?.map((genre) => genre.name).join(", ")}</p>
                    <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                    <p><strong>Overview:</strong> {movie.overview}</p>
                    <button
                        className={`wishlist-button ${isInWishlist ? "disabled" : ""}`}
                        onClick={handleAddToWishlist}
                        disabled={isInWishlist}
                    >
                        {isInWishlist ? "Already in Wishlist" : "Add to Wishlist"}
                    </button>
                </div>
            </div>
            <div className="cast-section">
                <h2>Cast</h2>
                <div className="cast-list">
                    {cast.map((actor) => (
                        actor.profile_path && (
                            <div key={actor.id} className="cast-item">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                    alt={actor.name}
                                />
                                <p>{actor.name}</p>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
