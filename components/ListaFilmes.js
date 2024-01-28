import styles from "../styles/Card.module.css";

const FilmeCard = ({ data }) => {
  return (
    <div className={styles.filmeConteiner}>
      {data?.map((item) => (
        <div key={item.id} className={styles.container}>
          <img className={styles.img} src={item.imagem} />
          <h2 className={styles.titulo}>{item.titulo}</h2>
          <p className={styles.reps}>Genero: {item.genero}</p>       
          <p className={styles.reps}>Ano: {item.ano}</p>
          <p className={styles.reps}>Descrição: {item.descricao}</p> 
        </div>
      ))}
    </div>
  );
};

export default FilmeCard;
