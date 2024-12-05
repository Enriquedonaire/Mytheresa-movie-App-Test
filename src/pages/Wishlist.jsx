import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const storedWishlist = api.getWishlist(); 
        setWishlist(storedWishlist || []); 
    }, []);

    const handleRemove = (id) => {
        api.removeFromWishlist(id);
        setWishlist(api.getWishlist()); 
    };

    return (
        <div className="wishlist">
            <button className="back-button-wishlist" onClick={() => navigate("/")}>
                &larr; Back
            </button>
            <h1>Wishlist</h1>
            {wishlist && wishlist.length > 0 ? ( 
                <div className="wishlist-grid">
                    {wishlist.map((item) => (
                        <div key={item.id} className="wishlist-item">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                alt={`Poster of ${item.title}`}
                            />
                            <p>{item.title}</p>
                            <div className="wishlist-actions">
                                <button onClick={() => navigate(`/details/${item.id}`)}>
                                    View Details
                                </button>
                                <button onClick={() => handleRemove(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="empty-message">Your wishlist is empty.</p>
            )}
        </div>
    );
};

export default Wishlist;
