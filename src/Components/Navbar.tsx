import React from "react";
import { Link } from "react-router-dom";
import { Camera, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Search } from "./Search";

export const Navbar = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Camera className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-white text-xl font-bold">Visual Image</h1>
          </Link>

          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <Search className="w-full" />
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 px-4 py-2 rounded-full font-medium shadow-md hover:bg-purple-100 transition-colors duration-200"
            >
              Upload
            </motion.button>
            <button
              className="text-white p-2 rounded-full hover:bg-purple-500 transition-colors duration-200"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
