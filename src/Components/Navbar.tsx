// import React from "react";
// import { Link } from "react-router-dom";
// import { Camera, Menu } from "lucide-react";
// import { motion } from "framer-motion";
// import { Search } from "./Search";

// export const Navbar = () => {
//   return (
//     <motion.header
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg"
//     >
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-2">
//             <motion.div
//               whileHover={{ rotate: 360 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Camera className="w-8 h-8 text-white" />
//             </motion.div>
//             <h1 className="text-white text-xl font-bold">Visual Image</h1>
//           </Link>

//           <div className="flex-1 max-w-xl mx-4 hidden md:block">
//             <Search className="w-full" />
//           </div>

//           <div className="flex items-center gap-4">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-white text-purple-600 px-4 py-2 rounded-full font-medium shadow-md hover:bg-purple-100 transition-colors duration-200"
//             >
//               Upload
//             </motion.button>
//             <button
//               className="text-white p-2 rounded-full hover:bg-purple-500 transition-colors duration-200"
//               aria-label="Menu"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </motion.header>
//   );
// };

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Menu, X, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "./Search";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 z-10">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Camera className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-white text-xl font-bold">Visual Image</h1>
          </Link>

          <div className="hidden md:block flex-1 max-w-xl mx-4">
            <Search className="w-full" />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 px-4 py-2 rounded-full font-medium shadow-md hover:bg-purple-100 transition-colors duration-200"
            >
              Upload
            </motion.button>
          </div>

          <button
            className="md:hidden text-white p-2 rounded-full hover:bg-purple-500 transition-colors duration-200 z-10"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-purple-700 px-4 py-6"
          >
            <div className="mb-4">
              <Search className="w-full" />
            </div>
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-white hover:text-purple-200 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/explore"
                className="text-white hover:text-purple-200 transition-colors duration-200"
              >
                Explore
              </Link>
              <Link
                to="/collections"
                className="text-white hover:text-purple-200 transition-colors duration-200"
              >
                Collections
              </Link>
              <button className="flex items-center gap-2 text-white hover:text-purple-200 transition-colors duration-200">
                <Upload className="w-5 h-5" />
                Upload
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
