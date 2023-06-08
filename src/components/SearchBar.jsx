import { useContext } from "react"
import { SearchContext } from "../contexts/SearchContext";

export default function SearchBar() {
    const { term, handleSearch } = useContext(SearchContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(event, term.current.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                ref={term}
                type="text"
                placeholder="Enter a search term here"
                onChange={ e => handleSearch(e, term.current.value) }
            />
            <input type="submit" />
        </form>
    );
}
