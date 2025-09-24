import '../styles/SearchBar.css'

import Input from "../atoms/Input";

function SearchBar({ query, setQuery }) {
  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <Input
        type="text"
        placeholder="Cerca per titolo, artista o mood..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;