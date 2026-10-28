
/**
 * Removes HTML tags from a show summary.
 * Returns a fallback if the summary is missing.
 */
export function stripHtml(html) {
    if (!html) return "Not available";

    const plainText = html.replace(/<[^>]*>/g, "");
    return plainText.replace(/\s+/g, " ").trim();
}

/** Formats a date or returns a fallback if unavailable. */
export function formatDate(date) {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Not available";
    }

    return parsedDate.toLocaleString();
}

/** Safely displays a value when API data is missing. */
export function displayValue(value) {
    if (value === null || value === undefined || value === "") {
        return "Not available";
    }

    return value;
}

/** Searches TVmaze for shows matching the user's search term. */
export async function searchShows(query) {
    const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Unable to load shows. Please try again.");
    }

    const results = await response.json();

    return results.map((result) => result.show);
}