import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { supabase } from "../utils/supabase";
import SearchBar from "./SearchBar";

const Navbar = ({ session }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    fetchUserRole();
  }, []);

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
        setUserRole(data.tipo);
      }
    }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>CineAdmin</p>
      </div>
      <ul className={styles.navContent}>
        <Link href="/">
          <li className={styles.name}>Home</li>
        </Link>
        {session?.user ? (
          <>
            {userRole === "admin" && (
              <Link href="/adicionar">
                <li className={styles.buttons}>Cadastrar um filme</li>
              </Link>
            )}
            <li className={styles.buttons} onClick={() => supabase.auth.signOut()}>
              Logout
            </li>
          </>
        ) : (
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
