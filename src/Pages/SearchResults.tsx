import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "../Components/Navbar";
import { UsePhotoSearch } from "../Components/usePhotoSearch/UsePhotoSearch";
import { Search, Image } from "lucide-react";

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

const SkeletonLoader = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg w-[300px] h-[300px]"></div>
);

export const SearchResults = () => {
  const { query } = useParams<{ query: string }>();
  const { photos, fetchData, loading } = UsePhotoSearch();

  useEffect(() => {
    if (query) {
      fetchData(query);
    }
  }, [query, fetchData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-8"
        >
          <Search className="w-8 h-8 mr-2 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-800">
            Results for "{query}"
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {loading
            ? Array(8)
                .fill(0)
                .map((_, index) => <SkeletonLoader key={index} />)
            : photos.map((photo: Photo) => (
                <motion.div
                  key={photo.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/photo/${photo.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative aspect-w-1 aspect-h-1">
                      <img
                        src={photo.urls.regular}
                        alt={photo.alt_description}
                        className="object-cover w-[300px] h-[300px]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 flex items-center">
                          <img
                            className="w-8 h-8 rounded-full object-cover border-2 border-white mr-2"
                            src={photo.user.profile_image.large}
                            alt={photo.user.name}
                          />
                          <p className="text-white text-sm font-medium truncate">
                            {photo.user.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </motion.div>

        {photos.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <Image className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No results found
            </h2>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
