import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Search.module.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = async () => {
    router.push({
      pathname: "/resultado",
      query: { busca: searchTerm }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Busca por titulo"
          className={styles.input}
          onChange={handleChange}
          value={searchTerm}
        />
        <button className={styles.button} type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default SearchBar;
