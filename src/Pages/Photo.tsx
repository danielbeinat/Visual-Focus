import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "../Components/Navbar";
import {
  FiDownload,
  FiHeart,
  FiUser,
  FiCalendar,
  FiImage,
} from "react-icons/fi";
const { VITE_APP_UNSPLASH_KEY } = import.meta.env;

interface Tag {
  title: string;
}

interface Photo {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
  alt_description: string;
  description: string;
  user: {
    name: string;
    profile_image: {
      large: string;
    };
    total_photos: number;
    links: {
      html: string;
    };
  };
  width: number;
  height: number;
  created_at: string;
  likes: number;
  tags: Tag[];
}

export const Photo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const downloadImage = async () => {
    if (!photo) return;
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <motion.div
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!photo) {
    return <div className="text-center text-2xl mt-10">Photo not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <motion.img
                layoutId={`photo-${photo.id}`}
                className="h-96 w-full object-cover md:w-96"
                src={photo.urls.regular}
                alt={photo.alt_description}
              />
            </div>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <img
                  className="h-12 w-12 rounded-full mr-4 border-2 border-blue-500"
                  src={photo.user.profile_image.large}
                  alt={photo.user.name}
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {photo.user.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {photo.user.total_photos} resources
                  </p>
                </div>
                <a
                  href={photo.user.links.html}
                  className="ml-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
                >
                  <FiUser className="mr-2" />
                  <span>Profile</span>
                </a>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadImage}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg mb-6 transition duration-300 flex items-center justify-center"
              >
                <FiDownload className="mr-2" />
                Download
              </motion.button>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <FiImage className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    {photo.width} x {photo.height}
                  </span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    {new Date(photo.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <FiHeart className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    {photo.likes} likes
                  </span>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                {photo.description || "No description available"}
              </p>
              <div>
                <h3 className="text-lg font-semibold mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {photo.tags.slice(0, 7).map((tag: Tag) => (
                    <span
                      key={tag.title}
                      className="bg-gray-200 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full"
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
