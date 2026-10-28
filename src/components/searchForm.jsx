function SearchForm({ query, onQueryChange, onSearch }) {
    function handleSubmit(event) {
        event.preventDefault();
        onSearch();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="show-search">Search for a TV show:</label>

            <input
                id="show-search"
                type="text"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Enter a show name"
            />

            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;