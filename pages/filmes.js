import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";
import FilmeCard from "../components/FilmeCard";

export default function Filmes ({session}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilmes();
  }, []);

  const fetchFilmes = async () => {
    const user = supabase.auth.user();
    try {
      setLoading(true);
      const { data, error } = await supabase.from("filmes").select("*")

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

  const handleDelete = async (id) => {
    try {
      const user = supabase.auth.user();
      await supabase.from("likes").delete().eq("filme_id", id);
      await supabase.from("filmes").delete().eq("id", id);
      await fetchFilmes();
      alert("Filme deletado com sucesso");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
     <Layout title={"Filmes"}>
            <h1>Catálogo de Filmes</h1>

      <div className={styles.home}>
           <div className="col-sm-6 col-md-4"> 
           {session?.user ? (
            <p className={styles.filmesHeading}>
              Olá {""} <span className={styles.email}>{session.user.email}</span>
            </p>            
           ) : (
            <div>
                <p className={styles.filmesHeading}>Aqui estão os filmes disponíveis e os seus preferidos.</p>
                <FilmeCard data={data} handleDelete={handleDelete} />
              </div>
           )}
          </div>
      </div>
      </Layout>
    </div>
  );
}