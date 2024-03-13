import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import styles from "../styles/Search.module.css";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
  const router = useRouter();
  const [filme, setFilmeData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(`/filmes?select=*&titulo=ilike.${filme}`);
    setFilmeData("");
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <label htmlFor="search">
        <AiOutlineSearch className={styles.icon} />
      </label>
      <input
        type="text"
        id="search"
        name="search"
        value={filme}
        onChange={(e) => setFilmeData(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;