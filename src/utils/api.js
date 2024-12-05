import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
    },
});

const handleError = (error, message) => {
    console.error(message, error);
    return null;
};

const WISHLIST_KEY = 'wishlist';

const api = {
    getCategories: async () => {
        try {
            const response = await apiClient.get('/genre/movie/list');
            const genres = response.data;
            const categories = await Promise.all(
                genres.genres.map(async (genre) => {
                    const res = await apiClient.get('/discover/movie', {
                        params: { with_genres: genre.id },
                    });
                    const movies = res.data;
                    return { name: genre.name, items: movies.results };
                })
            );
            return categories;
        } catch (error) {
            return handleError(error, 'Error fetching categories:');
        }
    },

    getItemDetails: async (id) => {
        try {
            const response = await apiClient.get(`/movie/${id}`);
            return response.data;
        } catch (error) {
            return handleError(error, 'Error fetching item details:');
        }
    },

    addToWishlist: (item) => {
        try {
            const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
            const exists = wishlist.some((wishlistItem) => wishlistItem.id === item.id);
            if (!exists) {
                wishlist.push(item);
                localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
            }
        } catch (error) {
            handleError(error, 'Error adding item to wishlist:');
        }
    },

    getWishlist: () => {
        try {
            const wishlist = JSON.parse(localStorage.getItem("wishlist"));
            return Array.isArray(wishlist) ? wishlist : []; 
        } catch (error) {
            console.error("Error getting wishlist:", error);
            return []; 
        }
    },

    removeFromWishlist: (id) => {
        try {
            const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
            const updatedWishlist = wishlist.filter((item) => item.id !== id);
            localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
        } catch (error) {
            handleError(error, 'Error removing item from wishlist:');
        }
    },
};

export default api;
