import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsTrash, BsHeart, BsHeartFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";

export default function Home({ session }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState({});  
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (!session?.user){
        window.location.href = "/";
    } else {
    fetchFilmes();
    fetchLikedMovies();
    fetchUserRole();
    }
  }, [session]);

  const fetchFilmes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("filmes")
        .select("*");

      if (error) throw error;
      setData(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

const fetchUserRole = async () =>{
    try {
        const user = supabase.auth.user();
        const {data, error} = await supabase
        .from("users")
        .select("tipo")
        .eq("user_id", user.id)
        .single();

        if(!error && user) {
        setUserRole(data.tipo);
        }
    } catch (error) {
        alert(error.message);
    }
  };
  
  const fetchLikedMovies = async () => {
    try {
      const user = supabase.auth.user();
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
      const user = supabase.auth.user();
      if (!user) {
        throw new Error('Usuário não identificado');
      }
  
      const isLiked = liked[id];
      
      if (isLiked) {
        const user = supabase.auth.user();
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

  if (loading) {
    return <div className={styles.loading}>Carregando lista de filmes...</div>;
  }

  const handleDelete = async (id) => {
    try {
      await supabase.from("likes").delete().eq("filme_id", id);
      const { data, error } = await supabase
        .from("filmes")
        .delete()
        .eq("id", id);
      fetchFilmes();
      if (error) throw error;
      alert("Filme cancelado com sucesso.");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>CineAdmin - PosTech</title>
        <meta name="description" content="Projeto criado para a PosTech FIAP em React x NextJS x Supabase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.home}>
        {!session?.user ? (
          <div>
            <p>Bem vindo ao CineAdmin</p>
          </div>
        ) : (
          <div>
            <p className={styles.filmeHeading}>
              Olá <span className={styles.email}>{session.user.email}</span>,
              aqui estão os filmes disponíveis e os seus preferidos.              
            </p>
            <div className={styles.filmeContainer}>
      {data?.map((item) => (
        <div key={item.id} className={styles.cardContainer}>
          <>
          <img className={styles.img} src={item.imagem}  />
          <h2 className={styles.titulo}>{item.titulo}</h2>
          <p className={styles.reps}>Genero: {item.genero}</p>     
          <p className={styles.reps}>Ano: {item.ano}</p>
          <p className={`${styles.mb} ${styles.reps}`}>Descrição: {item.descricao}</p>
          
          <div className={styles.buttons}>
          {userRole === "usuario" &&  (
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
        )
      )}
      </div>
    </div>
  )
  }
  </div>
  </div>
  );
};