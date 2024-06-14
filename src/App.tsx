import { Popular } from "./Pages/Popular/Popular";
import { Photo } from "./Pages/Photo";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./Components/Footer";
import { SearchResults } from "./Pages/SearchResults";
import { Scroll } from "./Components/Scroll";
export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/photo/:id" element={<Photo />} />
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>

      <Scroll />

      <Footer />
    </>
  );
};
