import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Header from "./components/Header.jsx";

const App = () => (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/details/:id" element={<DetailPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
    </>
);

export default App;

