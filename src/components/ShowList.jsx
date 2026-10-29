
import ShowCard from "./ShowCard";

/** Displays a list of TV show cards. */
function ShowList({ shows }) {
    return (
        <section className="show-list">
            {shows.map((show) => (
                <ShowCard key={show.id} show={show} />
            ))}
        </section>
    );
}

export default ShowList;
