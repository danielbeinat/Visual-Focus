import React, { useState } from "react";
import { UsePhotoSearch } from "./usePhotoSearch/UsePhotoSearch";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "lucide-react";

export const Search = ({ className }: { className: string }) => {
  const { setData } = UsePhotoSearch();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = (form.elements.namedItem("search") as HTMLInputElement).value;
    setData(query);
    navigate(`/search/${query}`);
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div
        className={`
        flex items-center bg-white rounded-full overflow-hidden
        transition-all duration-300 ease-in-out
        ${isFocused ? "shadow-lg ring-2 ring-purple-300" : "shadow"}
      `}
      >
        <input
          type="text"
          placeholder="Buscar imágenes..."
          name="search"
          className="
            w-full py-2 px-4 text-gray-700 leading-tight
            focus:outline-none placeholder-gray-400
          "
          required
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="submit"
          className="
            bg-gradient-to-r from-purple-500 to-indigo-500
            text-white rounded-full p-2 m-1
            hover:from-purple-600 hover:to-indigo-600
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
          "
          aria-label="Buscar"
        >
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
