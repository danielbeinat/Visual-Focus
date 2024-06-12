import { useState, useEffect } from "react";
const { VITE_APP_UNSPLASH_KEY } = import.meta.env;


export const UsePhotoSearch = () => {
  const [data, setData] = useState("");
  const [photos, setPhotos] = useState([]);

  const fetchData = async (query) => {
    const key = VITE_APP_UNSPLASH_KEY;
    const url = `https://api.unsplash.com/search/photos/?client_id=${key}&query=${query}$query&per_page=30`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      setPhotos(result.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (data) {
      fetchData(data);
    }
  }, [data]);

  return {
    data,
    photos,
    setData,
    fetchData,
  };
};