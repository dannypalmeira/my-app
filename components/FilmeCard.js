import Link from "next/link";
import styles from "../styles/Card.module.css";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

const FilmeCard = ({ data, handleDelete }) => {
  return (
    <div className={styles.filmeContainer}>
      {data?.map((item) => (
        <div key={item.id} className={styles.container}>
          <img className={styles.img} src={item.imagem}  />
          <h2 className={styles.titulo}>{item.titulo}</h2>
          <p className={styles.reps}>Genero {item.genero}</p>     
          <p className={styles.reps}>Ano {item.ano}</p>
          <p className={`${styles.mb} ${styles.reps}`}>Descrição {item.descricao}</p>
          
          <div className={styles.buttons}>
            <Link href={`/edit/${item.id}`}>
              <a className={styles.edit}>
                <FiEdit />
              </a>
            </Link>
            <button
              onClick={() => handleDelete(item.id)}
              className={styles.delete}
            >
              <BsTrash />
            </button>
          </div>
        </div>
      ))}
      </div>
  );
};

export default FilmeCard;
