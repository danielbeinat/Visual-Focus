import { UsePhotoSearch } from "./usePhotoSearch/UsePhotoSearch";
import { useNavigate } from "react-router-dom";

export const Search = ({ className }) => {
  const { setData } = UsePhotoSearch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    setData(query);
    navigate(`/search/${query}`);
  };

  return (
    <form onSubmit={handleSearch} className={`input ${className}`}>
      <input
        type="text"
        placeholder="Buscar imágenes..."
        name="search"
        className=""
        required
      />
      <button type="submit" className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className=" w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197M15.803 15.803A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
};
