
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import SearchForm from "./components/searchForm.jsx";
import { searchShows } from "./utils.js";
import "./App.css";

function Gallery() {
  const [query, setQuery] = useState("girls");
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!query.trim()) {
      setError("Please enter a show name.");
      setShows([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const results = await searchShows(query);
      setShows(results.slice(0, 10));
    } catch (err) {
      setError("Unable to load shows. Please try again.");
      setShows([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <main>
      <h1>TVmaze Show Gallery</h1>

      <SearchForm
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
      />

      {loading && <p>Loading shows...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && shows.length === 0 && (
        <p>No shows found. Try another search.</p>
      )}

      <p>Showing {shows.length} shows.</p>

      <ul>
        {shows.map((show) => (
          <li key={show.id}>{show.name}</li>
        ))}
      </ul>

      <p>
        Show data provided by{" "}
        <a href="https://www.tvmaze.com/" target="_blank" rel="noreferrer">
          TVmaze
        </a>
        .
      </p>
    </main>
  );
}

function ShowDetail() {
  return (
    <main>
      <h1>Show Details</h1>
      <p>Individual show information will go here.</p>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/shows/:id" element={<ShowDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

