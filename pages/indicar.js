import { useState } from "react";
import styles from "../styles/Create.module.css";
import { useRouter } from "next/router";

const IndicarFilme = () => {
  const [formData, setFormData] = useState({
    nome: "",
    indicacao: "",
  });
  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const response = await fetch('/api/submitForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          alert('Valeu!');
          router.push("/filmes");
        } else {
          throw new Error('Erro ao enviar indicação. Tente novamente.');
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <>
      <div className={styles.container}>
      <h1>Indique um novo filme</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Nome</label>
          <input
            type="text"
            name="nome"
            onChange={handleChange}
            className={styles.input}
            placeholder="Seu nome"
          />
          <label className={styles.label}>Indicação de Filme</label>
          <input
            type="text"
            name="indicacao"
            onChange={handleChange}
            className={styles.input}
            placeholder="Sua indicação"
          />

          <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? "Aguarde..." : "Enviar"}
          </button>
        </form>
      </div>
    </>
    );
};

export default IndicarFilme;
