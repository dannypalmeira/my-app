import { useEffect, useState } from 'react';
import FilmeCard from '@/components/FilmeCard';
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
    <div>
      <h1>Resultado da busca por "{busca}"</h1>
      <FilmeCard data={searchResults} />
      {searched && searchResults.length === 0 && <p>No results found.</p>}
    </div>
  );
};

export default ResultadoPage;
