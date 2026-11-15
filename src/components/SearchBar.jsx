import { useState } from "react";
import { Search, LoaderCircle } from "lucide-react";

export default function SearchBar({ onSearch, busy }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value);
  };

  return (
    <form className="search" role="search" onSubmit={handleSubmit}>
      <label htmlFor="city" className="sr-only">
        Buscar ciudad
      </label>
      <input
        id="city"
        className="search__input"
        type="search"
        placeholder="Buscar otra ciudad"
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="search__button"
        type="submit"
        aria-label="Buscar"
        disabled={busy}
      >
        {busy ? <LoaderCircle className="spin" size={18} /> : <Search size={18} />}
      </button>
    </form>
  );
}
