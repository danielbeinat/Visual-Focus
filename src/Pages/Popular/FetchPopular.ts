import { useState } from "react";
const { VITE_APP_UNSPLASH_KEY } = import.meta.env;

export const FetchPopular = () => {
    const [photos, setPhotos] = useState([]);

    const fetchData = async () => {
        const key = VITE_APP_UNSPLASH_KEY;
        const url = `https://api.unsplash.com/search/photos/?client_id=${key}&query=nature&per_page=30`;

        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log(result);
            setPhotos(result.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return {

        photos,
        fetchData
    };
};
