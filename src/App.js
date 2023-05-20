import { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import { DataContext } from "./contexts/DataContext";
import { SearchContext } from "./contexts/SearchContext";
import AlbumView from "./components/AlbumView";
import ArtistView from "./components/ArtistView";
import "./App.css";

function App() {
  let [message, setMessage] = useState("Search for Musix");
  let [data, setData] = useState([]);
  let searchInput = useRef("");

  const handleSearch = (e, search) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        document.title = `${search} Music`;
        const response = await fetch(
          `https://itunes.apple.com/search?term=${search}`
        );
        const resData = await response.json();
        console.log(resData);
        if (resData.results.length) {
          setData(resData.results);
          setMessage("");
        } else {
          setMessage(`We could find nothing for "${search}"`);
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (search) {
      fetchData();
    }
  };

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
                <DataContext.Provider value={data}>
                  <Gallery />
                </DataContext.Provider>
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
