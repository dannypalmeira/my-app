import Link from "next/link";
import { useUser } from "../lib/UserContext";
import styles from "../styles/Card.module.css";
import { BsTrash, BsHeart, BsHeartFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";


const FilmeCard = ({ data, handleDelete }) => {

const { user } = useUser();
const [liked, setLiked] = useState({});
const [userRole, setUserRole] = useState(null);

useEffect(() => {
  fetchUserData();
}, [user]);

const fetchUserData = async () =>{
  try {
    if (user){
      const { data: userData, error} = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();
      if (error){
        throw new Error("Failed to fetch user data");
      }
      setUserRole(userData.role);
      console.log(userRole);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

useEffect(() => {
  fetchLikedMovies();
}, [user]);


const fetchLikedMovies = async () => {
  try {
    const { data: likedMovies, error } = await supabase
    .from("likes")
    .select("filme_id")
    .eq("user_id", user.id)

    if (error) {
      throw new Error("Failed to fetch liked movies");
    }

    const likedMap = likedMovies.reduce((acc, filme) => {
      acc[filme.filme_id] = true;
      return acc;
    }, {});
    setLiked(likedMap);
  } catch (error) {
    console.error("Error fetching liked movies:", error);
  }
};

const handleLike = async (id) => {
  try {
    if (!user) {
      throw new Error('Usuário não identificado');
    }

    const isLiked = liked[id];
    
    if (isLiked) {
      const { error } = await supabase
      .from("likes")
      .delete()
      .eq("filme_id", id)
      .eq("user_id", user.id);

      if (error){
        throw new Error ('Failed to remove like' + error.message);
      }
    } else {
      const { error } = await supabase
      .from("likes")
      .insert([{user_id: user.id, filme_id: id}]);

      if (error) {
        throw new Error("Failed to add like" + error.message);
      }
    }
    
    setLiked ((prevLiked) => ({
      ...prevLiked,
      [id]: !prevLiked[id],
    }));
  } catch(error) {
    console.error("Error sending like status:", error);
  }
  };

  return (
    <div className={styles.filmeContainer}>
      {data?.map((item) => (
        <div key={item.id} className={styles.container}>
          <>
          <img className={styles.img} src={item.imagem}  />
          <h2 className={styles.titulo}>{item.titulo}</h2>
          <p className={styles.reps}>Genero: {item.genero}</p>     
          <p className={styles.reps}>Ano: {item.ano}</p>
          <p className={`${styles.mb} ${styles.reps}`}>Descrição: {item.descricao}</p>
          
          <div className={styles.buttons}>
          {userRole === "user" &&  (
            <>
            <button className={styles.like} onClick={() => handleLike(item.id)}>
            {liked[item.id] ? <BsHeartFill /> : <BsHeart />}
            </button>
            </>
          )}
            {userRole === "admin" &&  (
              <>
              <button className={styles.like} onClick={() => handleLike(item.id)}>
            {liked[item.id] ? <BsHeartFill /> : <BsHeart />}
            </button>
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
            </>
        )}
          </div>
        </>
        </div>
      ))}
      </div>
  );
};

export default FilmeCard;