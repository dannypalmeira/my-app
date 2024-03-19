import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";
import FilmeCard from "../components/ListaFilmes";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilmes();
  }, []);

  const fetchFilmes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("filmes")
        .select("*")

      if (error) throw error;
      setData(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando lista de filmes...</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>CineAdmin - PosTech</title>
        <meta name="description" content="Projeto criado para a PosTech FIAP em React x NextJS x Supabase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
            <h1 className={styles.title}>Catálogo de Filmes</h1>
            <div className={styles.grid}>  
            <FilmeCard data={data} /> 
            </div>
            
     </div>
   
  );
}