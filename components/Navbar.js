import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { supabase } from "../utils/supabase";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";

const Navbar = ({ session }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      fetchUserRole();
    } else {
      setLoading(false);
    }
  }, [session]);

  const fetchUserRole = async () => {
    try {
      const user = supabase.auth.user();
      if (user) {
      const { data, error } = await supabase
        .from("users")
        .select("tipo")
        .eq("user_id", user.id)
        .single();

      if (!error && data) {
        console.log("User role:", data.tipo);
        setUserRole(data.tipo);
      } else {
        console.error("Error fetching user role1:", error);
      }
    }
    } catch (error) {
      console.error("Error fetching user role2:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserRole(null);
    router.push("/");
  };


  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>CineAdmin</p>
      </div>
      <ul className={styles.navContent}>
        <Link href="/filmes">
          <li className={styles.name}>Home</li>
        </Link>
        {!loading && session?.user && (
          <>
            {userRole === "admin" && (
              <Link href="/adicionar">
                <li className={styles.buttons}>Cadastrar um filme</li>
              </Link>
            )}
            {userRole === "usuario" && (
              <>
                <Link href="/indicar">
                  <li className={styles.buttons}>Indique um filme</li>
                </Link>
              </>
            )}
            <li className={styles.buttons} onClick={handleLogout}>
              Logout
            </li>
          </>
        )}
        {!loading && !session?.user && (
          <>
            <Link href="/login">
              <li className={styles.buttons}>Login</li>
            </Link>
            <Link href="/signup">
              <li className={styles.buttons}>Cadastre-se</li>
            </Link>
          </>
        )}
      </ul>
      <SearchBar />
    </div>
  );
};

export default Navbar;
