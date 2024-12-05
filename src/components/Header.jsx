import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdPlaylistAdd } from "react-icons/md";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`main-header ${isScrolled ? "scrolled" : ""}`}>
            <Link to="/" className="header-text">
            <h1>Mytheresa Movies App</h1>
            </Link>
            <Link to="/wishlist" className="wishlist-icon">
                <MdPlaylistAdd size={24} />
                <span>Wishlist</span>
            </Link>
        </header>
    );
};

export default Header;
