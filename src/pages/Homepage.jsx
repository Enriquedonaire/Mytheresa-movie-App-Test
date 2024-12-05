import React, { useState, useEffect } from "react";
import HeroBanner from "../components/HeroBanner.jsx";
import Carousel from "../components/Carousel.jsx";
import api from "../utils/api.js";


const Homepage = () => {
    const [categories, setCategories] = useState([]);
    const [featuredMovies, setFeaturedMovies] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await api.getCategories();
            setCategories(data.slice(0, 3)); 
            const allMovies = data.flatMap((category) => category.items); 
            setFeaturedMovies(allMovies.slice(0, 5)); 
        };
        fetchCategories();
    }, []);

    return (
        <div className="homepage">
            {featuredMovies.length > 0 && <HeroBanner movies={featuredMovies} />}
            {categories.map((category, index) => (
                <div key={index} className="category-title">
                <Carousel key={index} category={category} />
                </div>
            ))}
        </div>
    );
};

export default Homepage;
