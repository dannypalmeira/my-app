import { supabase } from "../utils/supabase";
import { useState } from "react";
import styles from "../styles/Create.module.css";
import { useRouter } from "next/router";

const AdicionarFilme = () => {
  const initialState = {
    titulo: "",
    imagem: "",
    descricao: "",
    genero: "",
    ano:"",
  };

  const router = useRouter();
  const [filmeData, setFilmeData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");

  const { titulo, imagem, genero, descricao, ano } = filmeData;

  const handleChange = (e) => {
    setFilmeData({ ...filmeData, [e.target.name]: e.target.value });
  };

  const cadastrarFilme = async () => {
    if (!titulo || !genero || !ano || !descricao || !imagem) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    const { data, error } = await supabase
    .from("filmes")
    .insert({
      titulo,
      genero,
      ano,
      descricao,
      imagem,
      })
      .single();

      if(error){
        setErrorMessage("Ocorreu um erro ao cadastrar o filme. Tente novamente.");
      } else {
        alert("Filme criado com sucesso!");
        setFilmeData(initialState);
        router.push("/filmes");
        }
  };

  return (
    <>
      <div className={styles.container}>
      <h1>Cadastre um novo filme</h1>
        <div className={styles.form}>
          <label className={styles.label}>Titulo</label>
          <input
            type="text"
            name="titulo"
            value={titulo}
            onChange={handleChange}
            className={styles.input}
            placeholder="Titulo do filme"
          />
          <label className={styles.label}>Genero</label>
          <input
            type="text"
            name="genero"
            value={genero}
            onChange={handleChange}
            className={styles.input}
            placeholder="Genero"
          />
          <label className={styles.label}>Ano</label>
          <input
            type="text"
            name="ano"
            value={ano}
            onChange={handleChange}
            className={styles.input}
            placeholder="0000"
          />
          <label className={styles.label}>Descrição</label>
          <input
            type="text"
            name="descricao"
            value={descricao}
            onChange={handleChange}
            className={styles.input}
            placeholder="Descrição"
          />
          <label className={styles.label}>Imagem</label>
          <input
            type="text"
            name="imagem"
            value={imagem}
            onChange={handleChange}
            className={styles.input}
            placeholder="imagem"
          />

          <button className={styles.button} onClick={cadastrarFilme}>
            Salvar
          </button>
          {errorMessage && (<p className={styles.error}>{errorMessage}</p>)}
        </div>
      </div>
    </>
  );
};

export default AdicionarFilme;
