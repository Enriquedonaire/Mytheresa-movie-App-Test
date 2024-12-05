import React, { useEffect, useState } from "react";


const HeroBanner = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setPreviousIndex(currentIndex);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [currentIndex, movies.length]);

    return (
        <div className="hero-banner-container">
            {movies.map((movie, index) => (
                <div
                    key={index}
                    className={`hero-banner ${index === currentIndex ? "active" : ""}`}
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    }}
                >
                    {index === currentIndex && (
                        <div className="banner-content">
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default HeroBanner;
