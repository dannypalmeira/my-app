import styles from '../styles/Home.module.css'
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
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
      return <div className={styles.loading}>Carregando Filmes...</div>;
    }
    
    return (
  
    <Layout title={"Home"}>
                    <h1 className={styles.title}>
                        CineAdmin
                    </h1>
                    <div className={styles.grid}>  
                    <FilmeCard data={data} /> 
                    </div>
        </Layout>
      );
}
