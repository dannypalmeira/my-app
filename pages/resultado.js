
import { useEffect, useState } from 'react';
import FilmeCard from '@/components/FilmeCard';
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router';
import { supabase } from '@/lib/initSupabase';

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
    <div className={styles.container}>
    <Layout title={"Busca"}>      
        <h1>Resultado da busca por "{busca}"</h1>
              <FilmeCard data={searchResults} />
      {searched && searchResults.length === 0 && <p>Nenhum resultado encontrado.</p>}
      </Layout>
   </div>
  );
};

export default ResultadoPage;