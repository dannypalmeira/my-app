import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Edit.module.css";
import { supabase } from "../../utils/supabase";

const Edit = () => {
  const [filme, setFilme] = useState(null);
  const router = useRouter();

  const { id } = router.query;
  useEffect(() => {
    const getFilme = async () => {
      if (!id) return;

      const { data } = await supabase
        .from("filmes")
        .select("*")
        .filter("id", "eq", id)
        .single();
      setFilme(data);
    };
    getFilme();
  }, [id]);

  const handleOnChange = (e) => {
    setFilme({
      ...filme,
      [e.target.name]: e.target.value,
    });
  };

  const atualizarFilme = async () => {
    const { titulo, imagem, ano, genero, descricao } = filme;
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("filmes")
      .update({
        titulo,
        imagem,
        ano,
        genero,
        descricao,
      })
      .eq("id", id)
      .eq("created_by", user?.id);

    alert("Dados atualizados com sucesso!");

    router.push("/filmes");
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Editar Filme</h1>
        <label className={styles.label}> Título</label>
        <input
          type="text"
          name="titulo"
          value={filme?.titulo}
          onChange={handleOnChange}
          className={styles.updateInput}
        />
        <label className={styles.label}> Genero</label>
        <input
          type="text"
          name="genero"
          value={filme?.genero}
          onChange={handleOnChange}
          className={styles.updateInput}
        />
        <label className={styles.label}> Ano</label>
        <input
          type="text"
          name="ano"
          value={filme?.ano}
          onChange={handleOnChange}
          className={styles.updateInput}
        />
        <label className={styles.label}> Descrição</label>
        <input
          type="text"
          name="descricao"
          value={filme?.descricao}
          onChange={handleOnChange}
          className={styles.updateInput}
        />
        <label className={styles.label}> Imagem</label>
        <input
          type="text"
          name="imagem"
          value={filme?.imagem}
          onChange={handleOnChange}
          className={styles.updateInput}
        />

        <button onClick={atualizarFilme} className={styles.updateButton}>
          Atualizar dados
        </button>
      </div>
    </div>
  );
};

export default Edit;
