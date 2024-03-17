import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
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

  const { titulo, imagem, genero, descricao, ano } = filmeData;

  const handleChange = (e) => {
    setFilmeData({ ...filmeData, [e.target.name]: e.target.value });
  };

  const criarNovoFilme = async () => {
    const user = supabase.auth.user();

    const { data, error } = await supabase
      .from("filmes")
      .insert({
        titulo,
        genero,
        ano,
        descricao,
        imagem,
        user_id: user?.id,
      })
      .single();
    alert("Filme criado com sucesso!");
    setFilmeData(initialState);
    router.push("/filmes");
  };

  return (
    

      <div className={styles.home}>
           <div className="col-sm-6 col-md-4"> 
           <>
      <div className={styles.container}>
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
            placeholder="Ano"
          />
          <label className={styles.label}>Descriçao</label>
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

          <button className={styles.button} onClick={criarNovoFilme}>
            Salvar
          </button>
        </div>
      </div>
    </>
          </div>
      </div>
    
  );
};

export default AdicionarFilme;