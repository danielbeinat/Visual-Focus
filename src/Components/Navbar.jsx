import logo from "../assets/logo.svg";
import { Search } from "../Components/Search";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import { useState } from "react";

export const Navbar = () => {
  return (
    <>
      <header className="flex items-center flex-col justify-center gap-4 md:px-10 py-4 bg-black">
        <Link to={"/"} className="flex items-center gap-2 justify-center">
          <img className="md:w-7 md:h-7 w-5 h-5" src={logo} alt="image" />
          <h1 className="text-white md:text-xl">Visual image</h1>
        </Link>

        <Search className="navbar-search" />
      </header>
    </>
  );
};
