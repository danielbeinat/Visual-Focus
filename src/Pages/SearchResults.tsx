import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { UsePhotoSearch } from "../Components/usePhotoSearch/UsePhotoSearch";

interface Photo {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
  user: {
    profile_image: {
      large: string;
    };
    name: string;
  };
}

export const SearchResults = () => {
  const { query } = useParams<{ query: string }>();
  const { photos, fetchData } = UsePhotoSearch();

  useEffect(() => {
    if (query) {
      // Verifica si query no es undefined
      fetchData(query);
    }
  }, [query, fetchData]);

  return (
    <>
      <Navbar />
      <div className="mt-10 flex mb-14 flex-col gap-10">
        <h1 className="text-center font-bold text-3xl">
          Resultados de búsqueda para "{query}"
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {photos.map((photo: Photo) => (
            <Link
              className="relative group"
              to={`/photo/${photo.id}`}
              key={photo.id}
            >
              <img
                src={photo.urls.regular}
                alt={photo.alt_description}
                className="m-2 w-[300px] h-[300px] object-cover rounded"
              />
              <div className="absolute flex bottom-4 left-4 items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <img
                  className="w-8 h-8 rounded-full object-cover border-2 border-black"
                  src={photo.user.profile_image.large}
                  alt=""
                />
                <h1 className="text-white">{photo.user.name}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
