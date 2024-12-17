import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-3xl font-bold mb-4">Visual Image</h3>
          <p className="text-gray-300 max-w-md mb-8">
            Capturando momentos, inspirando creatividad. Descubre el poder de la
            imagen con Visual Image.
          </p>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-8"></div>
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Visual Image. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
