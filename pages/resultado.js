import { useEffect, useState } from 'react';
import FilmeCard from '../components/ListaFilmes';
import styles from "../styles/Search.module.css";
import { useRouter } from 'next/router';
import { supabase } from "../utils/supabase";

const ResultadoPage = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const { busca } = router.query; 
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (busca) {
        const { data } = await supabase
          .from("filmes")
          .select("*")
          .filter("titulo", "ilike", `%${busca}%`);
        setSearchResults(data);
        setSearched(true);
      }
    };
    fetchSearchResults();
  }, [busca]);

  return (
    <>
       <h1>Resultado da busca por "{busca}"</h1>
              <FilmeCard data={searchResults} />
              <div className={styles.grid}> 
      {searched && searchResults.length === 0 && <p>Nenhum resultado encontrado.</p>}
      </div>
    </>
  );
};

export default ResultadoPage;