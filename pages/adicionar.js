import React from 'react';
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import AdicionarFilme from "../components/AdicionarFilme";

export default function Filmes ({session}) {
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

  const handleDelete = async (id) => {
    try {
      const { data, error } = await supabase
        .from("filmes")
        .delete()
        .eq("id", id)
      fetchFilmes();
      if (error) throw error;
      alert("Filme cancelado");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={styles.container}>
     <Layout title={"Adicionar Novo Filme"}>
            <h1>Adicione um novo filme</h1>

      <div className={styles.home}>
           <div className="col-sm-6 col-md-4"> 
            <div className="row">
                <AdicionarFilme data={data} handleDelete={handleDelete} />
              </div>
          </div>
      </div>
      </Layout>
    </div>
  );
}

