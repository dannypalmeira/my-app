import React from 'react';
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import WorkoutCard from "../components/FilmeCard";

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
      const { data, error } = await supabase
        .from("filmes")
        .select("*")
        .eq("created_by", user?.id);

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
      const { data, error } = await supabase
        .from("filmes")
        .delete()
        .eq("id", id)
        .eq("created_by", user?.id);
      fetchFilmes();
      if (error) throw error;
      alert("Filme cancelado");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={styles.container}>
     <Layout title={"Filmes"}>
            <h1>Catálogo de Filmes</h1>

      <div className={styles.home}>
           <div>
            <p className={styles.workoutHeading}>
              Olá <span className={styles.email}>{session}</span>
            </p>
            {data?.length === 0 ? (
              <div className={styles.noWorkout}>
                <p>You have no workouts yet</p>
                <Link href="/create">
                  <button className={styles.button}>
                    {" "}
                    Insira um novo filme
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <p className={styles.workoutHeading}>Aqui estão os filmes disponíveis</p>
                <WorkoutCard data={data} handleDelete={handleDelete} />
              </div>
            )}
          </div>
      </div>
      </Layout>
    </div>
  );
}

