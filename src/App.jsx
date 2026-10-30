
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams, Link } from "react-router";
import SearchForm from "./components/SearchForm.jsx";
import ShowList from "./components/ShowList.jsx";
import { searchShows, stripHtml, displayValue } from "./utils.js";
import "./App.css";

/** Displays the searchable TV show gallery. */
function Gallery() {
  const [query, setQuery] = useState("");
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
        <p>Search for a TV show to get started.</p>
      )}

      <p>Showing {shows.length} shows.</p>

      <ShowList shows={shows} />

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

/** Displays detailed information about one TV show. */
function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchShow() {
      try {
        const response = await fetch(
          `https://api.tvmaze.com/shows/${id}`
        );

        if (!response.ok) {
          throw new Error("Show not found.");
        }

        const result = await response.json();
        setShow(result);

        const castResponse = await fetch(
          `https://api.tvmaze.com/shows/${id}/cast`
        );

        if (!castResponse.ok) {
          throw new Error("Unable to load cast.");
        }

        const castResults = await castResponse.json();
        setCast(castResults.slice(0, 15));
      } catch (err) {
        setError("Unable to load show details. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchShow();
  }, [id]);

  if (loading) {
    return <main><p>Loading show details...</p></main>;
  }

  if (error || !show) {
    return (
      <main>
        <p>{error || "Show not found."}</p>
        <Link to="/">Back to Gallery</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>{show.name}</h1>

      {show.image && (
        <img
          src={show.image.original}
          alt={`Poster for ${show.name}`}
        />
      )}

      <p><strong>Summary:</strong> {stripHtml(show.summary)}</p>
      <p><strong>Status:</strong> {displayValue(show.status)}</p>
      <p><strong>Premiered:</strong> {displayValue(show.premiered)}</p>
      <p><strong>Ended:</strong> {displayValue(show.ended)}</p>
      <p>
        <strong>Genres:</strong>{" "}
        {show.genres.length > 0 ? show.genres.join(", ") : "Not available"}
      </p>
      <p>
        <strong>Rating:</strong>{" "}
        {show.rating.average ?? "Not available"}
      </p>
      <p>
        <strong>Network:</strong>{" "}
        {show.network?.name ?? show.webChannel?.name ?? "Not available"}
      </p>

      <h2>Main Cast</h2>

      {cast.length > 0 ? (
        <ul>
          {cast.map((member) => (
            <li key={member.person.id}>
              <strong>{member.person.name}</strong>
              {" as "}
              {member.character.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Cast information not available.</p>
      )}

      <p>
        <a href={show.url} target="_blank" rel="noreferrer">
          View on TVmaze
        </a>
      </p>

      <Link to="/">Back to Gallery</Link>
    </main>
  );
}

/** Sets up the gallery and show detail routes. */
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
