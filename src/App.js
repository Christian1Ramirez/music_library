import { useEffect, useState, Suspense, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import { SearchContext } from "./contexts/SearchContext";
import AlbumView from "./components/AlbumView";
import ArtistView from "./components/ArtistView";
import "./App.css";
import { createResource } from './helper'
import Spinner from "./components/Spinner";

function App() {
  let [message, setMessage] = useState("Search for Musix");
  let [data, setData] = useState(null);
  let searchInput = useRef("");

  useEffect(() => {
    if (message) {
      const fetchDataAsync = async () => {
        const result = await createResource(message);
        setData(result);
      };
      fetchDataAsync();
    }
  }, [message]);

  const handleSearch = (e, search) => {
    e.preventDefault();
    if (search) {
      document.title = `${search} Music`;
      const dataResource = createResource(search);
      setData(dataResource);
      setMessage("");
    }
  };

  const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      )
    }
  }

  return (
    <div className="App">
      {message}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchContext.Provider
                  value={{
                    term: searchInput,
                    handleSearch,
                  }}
                >
                  <SearchBar />
                </SearchContext.Provider>
                {renderGallery()}
              </>
            }
          />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
