import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export const Scroll = () => {
  const [showButton, setShowButton] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <motion.button
          onClick={scrollToTop}
          className="fixed flex items-center bottom-5 right-5 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </>
  );
};
