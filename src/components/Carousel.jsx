import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Carousel = ({ category }) => {
    const navigate = useNavigate();
    const carouselRef = useRef(null);

    const scroll = (direction) => {
        const { current } = carouselRef;
        if (current) {
            current.scrollBy({
                left: direction === "left" ? -300 : 300,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="carousel">
            <h2>{category.name}</h2>
            <div className="carousel-container">
                <button className="arrow left" onClick={() => scroll("left")}>
                    &lt;
                </button>
                <div className="carousel-items" ref={carouselRef}>
                    {category.items.map((item) => (
                        <div
                            key={item.id}
                            className="carousel-item"
                            onClick={() =>
                                navigate(`/details/${item.id}`, { state: { category: category.name } })
                            }
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                alt={item.title}
                            />
                            <p>{item.title}</p>
                        </div>
                    ))}
                </div>
                <button className="arrow right" onClick={() => scroll("right")}>
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Carousel;
