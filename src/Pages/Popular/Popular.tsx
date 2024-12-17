import { FetchPopular } from "./FetchPopular";
import { useEffect } from "react";
import { Search } from "../../Components/Search";
import { Link } from "react-router-dom";
import "./Popular.css";

export const Popular = () => {
  const { photos, fetchData } = FetchPopular();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-center flex-col gap-7 justify-center lg:h-[570px] h-[500px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <h1 className="text-white text-3xl md:text-[60px] font-bold">
          Visual Image
        </h1>
        <p className="text-white text-lg text-center md:text-[20px]">
          Fondos de pantalla HD para decorar tu escritorio y teléfono
        </p>
        <Search className="popular-search" />
      </div>
      <div className="mt-10 flex mb-14 flex-col gap-10">
        <h1 className="text-center font-bold text-3xl">Fondos Populares</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:grid-cols-4">
          {photos.map((photo) => (
            <Link
              className="relative group"
              to={`/photo/${photo.id}`}
              key={photo.id}
              onClick={() => window.scrollTo(0, 0)}
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
