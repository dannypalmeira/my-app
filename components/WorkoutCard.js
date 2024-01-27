import Link from "next/link";
import styles from "../styles/WorkoutCard.module.css";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

const WorkoutCard = ({ data, handleDelete }) => {
  return (
    <div className={styles.filmeConteiner}>
      {data?.map((item) => (
        <div key={item.id} className={styles.container}>
          <img className={styles.img} src={item.imagem} />
          <p className={styles.titulo}>
            {" "}
            Titulo: {""}
            {item.titulo}
          </p>
                      
          <p className={styles.reps}>Ano: {item.ano}</p>
          <p className={styles.reps}>Descricao: {item.descricao}</p>
          
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

export default WorkoutCard;
