
import { Link } from "react-router";
import { stripHtml, formatDate, displayValue } from "../utils";
import { useState, useEffect } from "react";

/** Displays the basic information for one TV show. */
function ShowCard({ show }) {
    const [cast, setCast] = useState([]);
    const [castLoading, setCastLoading] = useState(true);

    useEffect(() => {
        async function fetchCast() {
            try {
                const response = await fetch(
                    `https://api.tvmaze.com/shows/${show.id}/cast`
                );

                if (!response.ok) {
                    throw new Error("Unable to load cast.");
                }

                const results = await response.json();
                setCast(results.slice(0, 5));
            } catch (error) {
                setCast([]);
            } finally {
                setCastLoading(false);
            }
        }

        fetchCast();
    }, [show.id]);

    return (
        <article className="show-card">
            {show.image && (
                <img
                    src={show.image.medium}
                    alt={`Poster for ${show.name}`}
                />
            )}

            <h2>
                <Link to={`/shows/${show.id}`}>{show.name}</Link>
            </h2>

            <p>
                <strong>Summary:</strong> {stripHtml(show.summary)}
            </p>

            <p>
                <strong>Premiered:</strong> {displayValue(show.premiered)}
            </p>

            <p>
                <strong>Last updated:</strong> {formatDate(show.updated)}
            </p>

            <p>
                <strong>Genres:</strong>{" "}
                {show.genres.length > 0
                    ? show.genres.join(", ")
                    : "Not available"}
            </p>

            <p>
                <strong>Rating:</strong>{" "}
                {show.rating.average ?? "Not available"}
            </p>

            <p>
                <strong>Main Cast:</strong>{" "}
                {castLoading
                    ? "Loading cast..."
                    : cast.length > 0
                        ? cast.map((person) => person.person.name).join(", ")
                        : "Cast not available"}
            </p>

            <p>
                <a href={show.url} target="_blank" rel="noreferrer">
                    View on TVmaze
                </a>
            </p>
        </article>
    );
}

export default ShowCard;
