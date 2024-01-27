import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import styles from "../styles/Create.module.css";
import { useRouter } from "next/router";

const Create = () => {
  const initialState = {
    titulo: "",
    imagem: "",
    descricao: "",
    ano:"",
  };

  const router = useRouter();
  const [workoutData, setWorkoutData] = useState(initialState);

  const { titulo, imagem, descricao, ano } = workoutData;

  const handleChange = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  };

  const createWorkout = async () => {
    const user = supabase.auth.user();

    const { data, error } = await supabase
      .from("workouts")
      .insert({
        titulo,
        imagem,
        descricao,
        ano,
        user_id: user?.id,
      })
      .single();
    alert("Workout created successfully");
    setWorkoutData(initialState);
    router.push("/");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <p className={styles.title}>Adicione um filme</p>
          <label className={styles.label}>Titulo:</label>
          <input
            type="text"
            name="titulo"
            value={titulo}
            onChange={handleChange}
            className={styles.input}
            placeholder="Titulo do filme"
          />
          <label className={styles.label}>Imagem:</label>
          <input
            type="text"
            name="imagem"
            value={imagem}
            onChange={handleChange}
            className={styles.input}
            placeholder="Imagem"
          />
          <label className={styles.label}>Ano:</label>
          <input
            type="text"
            name="ano"
            value={ano}
            onChange={handleChange}
            className={styles.input}
            placeholder="Ano"
          />
          <label className={styles.label}>Descriçao:</label>
          <input
            type="text"
            name="descricao"
            value={descricao}
            onChange={handleChange}
            className={styles.input}
            placeholder="Descricao"
          />

          <button className={styles.button} onClick={createWorkout}>
            Salvar
          </button>
        </div>
      </div>
    </>
  );
};

export default Create;
