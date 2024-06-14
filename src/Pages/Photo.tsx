import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "../Components/Navbar";
const { VITE_APP_UNSPLASH_KEY } = import.meta.env;

interface Tag {
  title: string;
}

export const Photo = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState<any>(null);

  const downloadImage = async () => {
    try {
      const response = await fetch(photo.urls.full);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${photo.id}.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  useEffect(() => {
    const fetchPhoto = async () => {
      const key = VITE_APP_UNSPLASH_KEY;
      const url = `https://api.unsplash.com/photos/${id}?client_id=${key}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setPhoto(data);
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, [id]);

  if (!photo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col lg:flex-row gap-5 lg:items-start items-center lg:px-20 py-10">
        <div className="flex flex-col gap-2 items-center">
          <img
            className="lg:w-[700px] lg:h-[480px] w-[300px] h-[300px] object-cover rounded"
            key={photo.id}
            src={photo.urls.regular}
            alt={photo.alt_description}
          />
          <h1 className="text-gray-500">{photo.description}</h1>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-7">
            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10 rounded-full object-cover border-2 border-black"
                src={photo.user.profile_image.large}
                alt=""
              />
              <div>
                <h1 className="font-bold">{photo.user.name}</h1>
                <p className="text-sm text-gray-500">
                  {photo.user.total_photos} recursos
                </p>
              </div>
            </div>

            <a
              className="text-sm bg-gray-200 font-bold rounded px-4 py-2 hover:bg-gray-300"
              href={photo.user.links.html}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </a>
          </div>
          <button
            onClick={downloadImage}
            className="bg-green-500 flex items-center gap-2 justify-center text-white text-xl cursor-pointer text-center font-bold hover:bg-green-600 hover:text-white rounded px-4 py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Descargar
          </button>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-black">Archivo:</h1>
              <p className="text-sm text-gray-500 ">
                {photo.width} x {photo.height}{" "}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <h1 className="text-black">Fecha:</h1>
              <p className="text-sm text-gray-500 ">
                {photo.created_at.split("T")[0]}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <h1 className="text-black">Likes:</h1>
              <p className="text-sm text-gray-500 ">{photo.likes}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row mt-5 gap-5 md:pl-10 items-center mb-10">
        <h1 className="text-gray-500">Tags:</h1>
        {photo.tags.slice(0, 7).map((tag: Tag) => (
          <h1
            key={tag.title}
            className="md:text-sm text-xs bg-gray-200 font-bold rounded px-4 py-2"
          >
            {tag.title}
          </h1>
        ))}{" "}
      </div>
    </>
  );
};
