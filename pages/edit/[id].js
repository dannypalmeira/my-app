import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Edit.module.css";
import { supabase } from "../../utils/supabase";

const Edit = () => {
  const [workout, setWorkout] = useState(null);
  const router = useRouter();

  const { id } = router.query;
  useEffect(() => {
    const getWorkout = async () => {
      if (!id) return;

      const { data } = await supabase
        .from("workouts")
        .select("*")
        .filter("id", "eq", id)
        .single();
      setWorkout(data);
    };
    getWorkout();
  }, [id]);

  const handleOnChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const updateWorkout = async () => {
    const { titulo, imagem, descricao, ano } = workout;
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("workouts")
      .update({
        titulo,
        imagem,
        ano,
        descricao,
      })
      .eq("id", id)
      .eq("user_id", user?.id);

    alert("Dados atualizados com sucesso!");

    router.push("/");
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Editar Filme</h1>
        <label className={styles.label}> Titulo:</label>
        <input
          type="text"
          name="titulo"
          value={workout?.titulo}
          onChange={handleOnChange}
          className={styles.updateInput}
        />
        <label className={styles.label}> Ano:</label>
        <input
          type="text"
          name="ano"
          value={workout?.ano}
          onChange={handleOnChange}
          className={styles.updateInput}
        />
        <label className={styles.label}> Descricao:</label>
        <input
          type="text"
          name="descricao"
          value={workout?.descricao}
          onChange={handleOnChange}
          className={styles.updateInput}
        />

        <button onClick={updateWorkout} className={styles.updateButton}>
          Atualizar dados
        </button>
      </div>
    </div>
  );
};

export default Edit;
