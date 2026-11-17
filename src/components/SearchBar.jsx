import { useState } from "react";
import { AnimateIcon } from "@animate-ui/react/icons";
import { RippleButton, RippleButtonRipples } from "@animate-ui/react/primitives/buttons/ripple";
import { Search } from "./icons/search";
import { LoaderCircle } from "./icons/loader-circle";

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
      <AnimateIcon animateOnHover="find" asChild>
        <RippleButton
          className="search__button"
          type="submit"
          aria-label="Buscar"
          disabled={busy}
          hoverScale={1.06}
        >
          {busy ? <LoaderCircle size={18} animate loop /> : <Search size={18} />}
          <RippleButtonRipples color="var(--sky-top)" />
        </RippleButton>
      </AnimateIcon>
    </form>
  );
}
